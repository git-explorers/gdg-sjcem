import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, doc, setDoc, addDoc, deleteDoc, onSnapshot, query, orderBy, limit, writeBatch, getDocs, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import io from 'socket.io-client'; // Import Socket.io

// ☁️ Production Backend URL (Google Cloud Run)
const BACKEND_URL = import.meta.env.VITE_CHAT_SERVER_URL || "https://gdg-chat-backend-1042751012948.us-central1.run.app";

const LiveSessionPanel = ({ codelabId, sessionId }) => {
    const { currentUser } = useAuth();
    const [votes, setVotes] = useState([]);
    const [counts, setCounts] = useState({ yes: 0, no: 0, help: 0 });
    const [myVote, setMyVote] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('connecting'); // connecting, connected, error

    // Chat State
    const [activeTab, setActiveTab] = useState('chat');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [attachedImage, setAttachedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');
    const chatEndRef = useRef(null);

    // Socket Ref
    const socketRef = useRef(null);

    useEffect(() => {
        if (!codelabId) return;

        // --- 1. Firestore Listener for VOTES (Stats) ---
        // Keeping this on Firestore for now as it's less bandwidth intensive than chat stream
        const qVotes = query(collection(db, "codelabs", codelabId, "live_votes"), orderBy("timestamp", "desc"));
        const unsubVotes = onSnapshot(qVotes, (snapshot) => {
            const newVotes = [];
            const newCounts = { yes: 0, no: 0, help: 0 };
            let myCurrentVote = null;

            snapshot.forEach((doc) => {
                const data = doc.data();
                newVotes.push({ id: doc.id, ...data });
                if (data.status && newCounts[data.status] !== undefined) {
                    newCounts[data.status]++;
                }
                if (doc.id === sessionId) {
                    myCurrentVote = data.status;
                }
            });

            setVotes(newVotes);
            setCounts(newCounts);
            setMyVote(myCurrentVote);
        }, (err) => {
            console.error("Votes Listener Error:", err);
            // Don't set global error here to avoid blocking chat if only stats fail
        });


        // --- 2. Socket.io Connection for CHAT (The Fix) ---
        setConnectionStatus('connecting'); // Indicate chat connection attempt
        // Connect to the Google Cloud Backend
        socketRef.current = io(BACKEND_URL);

        socketRef.current.on('connect', () => {
            console.log("✅ Custom Backend Connected");
            setConnectionStatus('connected');
            setError(''); // Clear errors

            // Join the specific codelab room
            socketRef.current.emit('join_room', codelabId);
            console.log(`📥 Joined room: ${codelabId}`);
        });

        socketRef.current.on('connect_error', (err) => {
            console.error("Socket Connection Error:", err);
            setConnectionStatus('error');
            setError(`Chat Server Disconnected. (backend offline?)`);
        });

        socketRef.current.on('load_history', (history) => {
            console.log(`📜 Loaded ${history.length} messages from history`);
            setMessages(history);
            setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        });

        socketRef.current.on('receive_message', (message) => {
            console.log('📨 Received message:', message);
            setMessages((prev) => {
                const updated = [...prev, message];
                console.log(`💬 Total messages now: ${updated.length}`);
                return updated;
            });
            setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        });


        // Cleanup
        return () => {
            unsubVotes();
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, [codelabId, currentUser, sessionId]);

    // Auto-join on session enter & Cleanup on exit
    useEffect(() => {
        if (!currentUser || !codelabId || !sessionId) return;

        const presenceRef = doc(db, "codelabs", codelabId, "live_votes", sessionId);

        const joinSession = async () => {
            try {
                // Register presence using sessionId
                await setDoc(presenceRef, {
                    uid: currentUser.uid, // Store real UID for reference
                    name: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    timestamp: new Date()
                }, { merge: true });
            } catch (e) {
                console.error("Error joining session:", e);
            }
        };

        joinSession();

        // Cleanup on unmount or tab close
        const handleDisconnect = () => {
            deleteDoc(presenceRef).catch(err => console.error("Cleanup error", err));
        };

        window.addEventListener('beforeunload', handleDisconnect);

        return () => {
            handleDisconnect();
            window.removeEventListener('beforeunload', handleDisconnect);
        };
    }, [codelabId, currentUser, sessionId]);

    const handleVote = async (status) => {
        if (!currentUser) return;
        try {
            // Vote using sessionId
            await setDoc(doc(db, "codelabs", codelabId, "live_votes", sessionId), {
                uid: currentUser.uid,
                name: currentUser.displayName,
                status: status,
                photoURL: currentUser.photoURL,
                timestamp: new Date()
            }, { merge: true });
        } catch (e) {
            console.error("Error sending vote:", e);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const data = new FormData();
        data.append('image', file);

        try {
            // Reusing the key from ProjectSubmission (ImgBB)
            const response = await fetch('https://api.imgbb.com/1/upload?key=3bc6dafa7ecd7c01a118fad187d32ca5', {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            if (result.success) {
                setAttachedImage(result.data.url);
            } else {
                alert('Details upload failed.');
            }
        } catch (error) {
            console.error('Error uploading:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if ((!newMessage.trim() && !attachedImage) || !currentUser) return;

        setIsSending(true);
        setError('');

        const messageData = {
            codelabId: codelabId, // Room ID
            text: newMessage,
            image: attachedImage,
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            // Timestamp added by server
        };

        // Emit to Backend
        if (socketRef.current && socketRef.current.connected) {
            console.log('📤 Sending message:', messageData);
            socketRef.current.emit('send_message', messageData);
            setNewMessage('');
            setAttachedImage(null);
            setIsSending(false);
        } else {
            console.error('❌ Cannot send: Socket not connected');
            setError("Cannot send: Backend disconnected.");
            setIsSending(false);
        }
    };

    const handleResetSession = async () => {
        if (!window.confirm("Are you sure you want to clear the session? This will delete all chat history and votes for everyone.")) return;

        try {
            const batch = writeBatch(db);

            // Delete Votes
            const votesSnap = await getDocs(collection(db, "codelabs", codelabId, "live_votes"));
            votesSnap.forEach((doc) => {
                batch.delete(doc.ref);
            });

            // Delete Chat Messages
            const chatSnap = await getDocs(collection(db, "codelabs", codelabId, "chat_messages"));
            chatSnap.forEach((doc) => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            console.log("Session reset successfully");
        } catch (e) {
            console.error("Error resetting session:", e);
        }
    };

    return (
        <div className="gc-right-sidebar">
            {/* Persistent Header */}
            <div className="live-header" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Live Session 🔴</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', color: '#5f6368', fontWeight: 'bold' }}>
                            {votes.length} Joined
                        </span>
                        <button
                            onClick={handleResetSession}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '14px',
                                padding: '4px',
                                color: '#5f6368'
                            }}
                            title="Reset Session (Clear All)"
                        >
                            🔄
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="panel-tabs">
                <button
                    className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
                    onClick={() => setActiveTab('chat')}
                >
                    Chat 💬
                </button>
                <button
                    className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
                    onClick={() => setActiveTab('stats')}
                >
                    Stats 📊
                </button>
            </div>

            {/* Content Switcher */}
            {activeTab === 'stats' ? (
                <div className="stats-view animate-fade-in">
                    <div className="vote-actions">
                        <button
                            className={`vote-btn yes ${myVote === 'yes' ? 'active' : ''}`}
                            onClick={() => handleVote('yes')}
                        >
                            <span className="emoji">👍</span>
                            <span className="label">Yes</span>
                        </button>
                        <button
                            className={`vote-btn no ${myVote === 'no' ? 'active' : ''}`}
                            onClick={() => handleVote('no')}
                        >
                            <span className="emoji">👎</span>
                            <span className="label">No</span>
                        </button>
                    </div>

                    <button
                        className={`help-btn ${myVote === 'help' ? 'active' : ''}`}
                        onClick={() => handleVote('help')}
                    >
                        ✋ I need help!
                    </button>

                    <div className="session-status" style={{
                        textAlign: 'center',
                        padding: '12px',
                        marginBottom: '16px',
                        borderRadius: '8px',
                        backgroundColor: (counts.yes >= (counts.no + counts.help)) ? '#e6f4ea' : '#fce8e6',
                        color: (counts.yes >= (counts.no + counts.help)) ? '#137333' : '#c5221f',
                        fontWeight: 'bold',
                        border: '1px solid',
                        borderColor: (counts.yes >= (counts.no + counts.help)) ? '#ceead6' : '#fad2cf'
                    }}>
                        {(votes.length === 0) ? "Waiting for votes..." :
                            (counts.yes >= (counts.no + counts.help)) ? "🟢 Smooth Sailing" : "🔴 Slow Down / Help Needed"}
                    </div>

                    <div className="live-stats">
                        <div className="stat-card">
                            <div className="count green">{counts.yes}</div>
                            <div className="label">Following</div>
                        </div>
                        <div className="stat-card">
                            <div className="count red">{counts.no}</div>
                            <div className="label">Stuck</div>
                        </div>
                        <div className="stat-card">
                            <div className="count orange">{counts.help}</div>
                            <div className="label">Help Needed</div>
                        </div>
                    </div>

                    {counts.help > 0 && (
                        <div className="help-queue">
                            <h4>Help Queue ✋</h4>
                            <div className="queue-list">
                                {votes.filter(v => v.status === 'help').map((user) => (
                                    <motion.div
                                        key={user.id}
                                        className="queue-item"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <img src={user.photoURL || "https://lh3.googleusercontent.com/a/default-user"} alt={user.name} />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span>{user.name}</span>
                                            {user.currentStep && <span style={{ fontSize: '10px', color: '#5f6368' }}>Step {user.currentStep}</span>}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {counts.no > 0 && (
                        <div className="help-queue" style={{ marginTop: '24px' }}>
                            <h4 style={{ color: '#d93025' }}>Stuck Users 👎</h4>
                            <div className="queue-list">
                                {votes.filter(v => v.status === 'no').map((user) => (
                                    <motion.div
                                        key={user.id}
                                        className="queue-item"
                                        style={{ backgroundColor: '#fce8e6', color: '#d93025' }}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <img src={user.photoURL || "https://lh3.googleusercontent.com/a/default-user"} alt={user.name} />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span>{user.name}</span>
                                            {user.currentStep && <span style={{ fontSize: '10px', opacity: 0.8 }}>Step {user.currentStep}</span>}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="chat-view animate-fade-in">
                    {error && (
                        <div style={{ padding: '8px', backgroundColor: '#fce8e6', color: '#c5221f', fontSize: '12px', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}
                    <div className="chat-messages">
                        {messages.length === 0 && (
                            <div className="empty-chat">
                                <p>👋 <strong>You are the first one here!</strong></p>
                                <p style={{ fontSize: '0.9em', marginTop: '8px' }}>
                                    To test the real-time chat:<br />
                                    1. 📄 Open this page in a <strong>New Incognito Window</strong>.<br />
                                    2. 💬 Send a message from there.<br />
                                    3. ✨ See it appear here instantly!
                                </p>
                            </div>
                        )}
                        {messages.map((msg) => (
                            <div key={msg.id} className={`chat-bubble ${msg.uid === currentUser?.uid ? 'mine' : 'theirs'}`}>
                                {msg.uid !== currentUser?.uid && (
                                    <div className="chat-user-header">
                                        <img src={msg.photoURL || "https://lh3.googleusercontent.com/a/default-user"} alt="User" />
                                        <span>{msg.displayName}</span>
                                    </div>
                                )}
                                {msg.image && (
                                    <div className="chat-image">
                                        <img src={msg.image} alt="Attachment" onClick={() => window.open(msg.image, '_blank')} />
                                    </div>
                                )}
                                {msg.text && <p className="chat-text">{msg.text}</p>}
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <form className="chat-input-area" onSubmit={handleSendMessage}>
                        {attachedImage && (
                            <div className="image-preview">
                                <img src={attachedImage} alt="Preview" />
                                <button type="button" onClick={() => setAttachedImage(null)}>×</button>
                            </div>
                        )}
                        <div className="input-row">
                            <label className="image-upload-btn">
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                />
                                {isUploading ? '...' : '📷'}
                            </label>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button type="submit" disabled={(!newMessage.trim() && !attachedImage) || isUploading}>
                                ➤
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LiveSessionPanel;
