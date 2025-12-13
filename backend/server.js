const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin (Uses Application Default Credentials on Cloud Run)
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: "dc-infotechpvt-1"
});

const db = admin.firestore();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for simplicity (or strict restrict to Netlify domain)
        methods: ["GET", "POST"]
    }
});

// Basic Health Check
app.get('/', (req, res) => {
    res.send('GDG Chat Backend is Running! 🚀');
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join a Codelab Room
    socket.on('join_room', async (codelabId) => {
        socket.join(codelabId);
        console.log(`User ${socket.id} joined room: ${codelabId}`);

        // Fetch History from Firestore (Server-side)
        try {
            const messagesRef = db.collection('codelabs').doc(codelabId).collection('chat_messages');
            const snapshot = await messagesRef.orderBy('timestamp', 'desc').limit(50).get();

            const history = [];
            snapshot.forEach(doc => {
                history.push({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().timestamp?.toDate() || new Date() // Convert Timestamp to Date
                });
            });

            // Send history to JUST this user (socket.emit, not io.to)
            // Reverse to show oldest first
            socket.emit('load_history', history.reverse());

        } catch (error) {
            console.error("Error fetching history:", error);
        }
    });

    // Handle New Message
    socket.on('send_message', async (data) => {
        // data: { codelabId, text, image, uid, displayName, photoURL }
        const { codelabId, ...messageContent } = data;

        if (!codelabId) return;

        // 1. Save to Firestore (Server-side, secure)
        try {
            const messageRef = await db.collection('codelabs').doc(codelabId).collection('chat_messages').add({
                ...messageContent,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            });

            const savedMessage = {
                id: messageRef.id,
                ...messageContent,
                timestamp: new Date().toISOString() // Send simplified timestamp to client immediately
            };

            // 2. Broadcast to everyone in the room (Remote Client)
            io.to(codelabId).emit('receive_message', savedMessage);

        } catch (error) {
            console.error("Error saving message:", error);
            socket.emit('error', 'Failed to save message');
        }
    });

    // Handle Typing Indicator (Optional Bonus)
    socket.on('typing', (data) => {
        socket.to(data.codelabId).emit('user_typing', data.displayName);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
