import React, { useState, useEffect } from 'react';
import './Quiz.css';
import confetti from 'canvas-confetti';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

const Quiz = ({ data }) => {
    const [started, setStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10); // 10 seconds per question

    const { title, description, questions } = data;
    const currentQuestion = questions[currentQuestionIndex];

    const [userName, setUserName] = useState('');
    const [nameSubmitted, setNameSubmitted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [submittingScore, setSubmittingScore] = useState(false);
    const [scoreSubmitted, setScoreSubmitted] = useState(false);

    const quizCollectionRef = collection(db, 'techsprint_quiz_beta_1');

    // Fetch Leaderboard
    useEffect(() => {
        // Increased limit to 50 as requested to see "all" (or significantly more)
        const q = query(quizCollectionRef, orderBy('score', 'desc'), orderBy('timeTaken', 'asc'), limit(50));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setLeaderboard(data);
        }, (error) => {
            console.error("Leaderboard fetch error:", error);
        });

        return () => unsubscribe();
    }, []);

    // Timer Logic
    useEffect(() => {
        let timer;
        if (started && !isAnswered && !showResult && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && !isAnswered) {
            // Time's up! Treat as incorrect/skipped
            handleOptionClick(null, true);
        }
        return () => clearInterval(timer);
    }, [started, isAnswered, showResult, timeLeft]);

    const handleStart = () => {
        if (!userName.trim()) {
            alert("Please enter your name first!");
            return;
        }
        setNameSubmitted(true);
        setStarted(true);
        setStartTime(Date.now());
        setTimeLeft(10); // Reset timer for first question
    };

    const handleOptionClick = (option, isTimeout = false) => {
        if (isAnswered) return;

        setSelectedOption(option);
        setIsAnswered(true);

        if (!isTimeout && option === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
            if (currentQuestionIndex === questions.length - 1) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }

        // Auto advance after short delay
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedOption(null);
                setIsAnswered(false);
                setTimeLeft(10); // Reset timer for next question
            } else {
                setEndTime(Date.now());
                setShowResult(true);
            }
        }, 1200);
    };

    const handleRestart = () => {
        setStarted(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowResult(false);
        setStartTime(null);
        setEndTime(null);
        setScoreSubmitted(false);
        setTimeLeft(10);
        // Keep name for convenience
    };

    const submitScore = async () => {
        if (submittingScore || scoreSubmitted) return;
        setSubmittingScore(true);

        // Calculate total time taken relative to questions * 10 or just use wall clock?
        // Using wall clock is fine, but since we have a timer, users might wait. 
        // Let's stick to wall clock for "timeTaken" leaderboard metric as before.
        const timeTaken = (endTime - startTime) / 1000;

        try {
            await addDoc(quizCollectionRef, {
                name: userName,
                score: score,
                timeTaken: timeTaken,
                createdAt: serverTimestamp()
            });
            setScoreSubmitted(true);
        } catch (error) {
            console.error("Error adding score: ", error);
            alert("Failed to submit score. Try again!");
        } finally {
            setSubmittingScore(false);
        }
    };

    if (!started) {
        return (
            <div className="quiz-section" data-aos="fade-up">
                <div className="quiz-header">
                    <h3>{title}</h3>
                    <p className="quiz-description">{description}</p>

                    <div className="name-input-container">
                        <label className="quiz-input-label">Enter your name to start:</label>
                        <input
                            type="text"
                            className="quiz-input"
                            placeholder="Your Name (e.g. John Doe)"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <button onClick={handleStart} className="quiz-start-btn">Start Quiz 🚀</button>

                    {/* Mini Leaderboard Preview */}
                    <div className="leaderboard-container">
                        <div className="leaderboard-header">
                            <span>Rank</span>
                            <span>Name</span>
                            <span>Score</span>
                            <span>Time</span>
                        </div>
                        <div className="leaderboard-list">
                            {leaderboard.length === 0 ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No scores yet. Be the first!</div>
                            ) : (
                                leaderboard.map((entry, index) => (
                                    <div key={entry.id} className={`leaderboard-item rank-${index + 1}`}>
                                        <div className="rank-col">
                                            <span className="rank-badge">{index + 1}</span>
                                        </div>
                                        <div className="name-col">{entry.name}</div>
                                        <div className="score-col">{entry.score}/{questions.length}</div>
                                        <div className="time-col time-val">{entry.timeTaken?.toFixed(1)}s</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    if (showResult) {
        const percentage = (score / questions.length) * 100;
        let message = "";
        let emoji = "🤔";

        if (percentage === 100) {
            message = "Perfect Score! You are a TechSprint Expert! 🏆";
            emoji = "🤩";
        } else if (percentage >= 80) {
            message = "Great job! You know your stuff! 🔥";
            emoji = "😎";
        } else if (percentage >= 50) {
            message = "Not bad! But you might want to read the rules again. 😉";
            emoji = "🙂";
        } else {
            message = "Oops! Time to check the event details thoroughly! 📚";
            emoji = "😅";
        }

        const atomicTimeTaken = ((endTime - startTime) / 1000).toFixed(1);

        return (
            <div className="quiz-section" data-aos="zoom-in">
                <div className="quiz-score-card">
                    <span className="score-emoji">{emoji}</span>
                    <h3 className="score-title">Quiz Completed!</h3>
                    <span className="score-value">{score} / {questions.length}</span>
                    <p className="score-message">{message}</p>
                    <p style={{ marginBottom: '1rem', color: '#5f6368' }}>Total Time: <strong>{atomicTimeTaken}s</strong></p>

                    {!scoreSubmitted ? (
                        <button
                            onClick={submitScore}
                            className="submit-score-btn"
                            disabled={submittingScore}
                        >
                            {submittingScore ? 'Submitting...' : 'Submit Score to Leaderboard 🏆'}
                        </button>
                    ) : (
                        <div style={{ color: '#34a853', fontWeight: 'bold', margin: '1rem 0' }}>
                            ✅ Score Submitted! Check the leaderboard below.
                        </div>
                    )}

                    <button onClick={handleRestart} className="restart-btn" style={{ marginTop: '1rem' }}>Play Again 🔄</button>
                </div>

                {/* Leaderboard */}
                <div className="leaderboard-container">
                    <div className="leaderboard-header">
                        <span>Rank</span>
                        <span>Name</span>
                        <span>Score</span>
                        <span>Time</span>
                    </div>
                    <div className="leaderboard-list">
                        {leaderboard.map((entry, index) => (
                            <div key={entry.id} className={`leaderboard-item rank-${index + 1} ${entry.name === userName && entry.score === score ? 'highlight' : ''}`}>
                                <div className="rank-col">
                                    <span className="rank-badge">{index + 1}</span>
                                </div>
                                <div className="name-col">{entry.name}</div>
                                <div className="score-col">{entry.score}/{questions.length}</div>
                                <div className="time-col time-val">{entry.timeTaken?.toFixed(1)}s</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        );
    }

    return (
        <div className="quiz-section" data-aos="fade-up">
            <div className="quiz-question-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div className="question-progress">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </div>
                    <div className={`timer-badge ${timeLeft <= 3 ? 'danger' : ''}`}>
                        ⏱️ {timeLeft}s
                    </div>
                </div>

                <h4 className="question-text">{currentQuestion.question}</h4>

                <div className="quiz-options">
                    {currentQuestion.options.map((option, index) => {
                        let btnClass = "quiz-option-btn";
                        if (isAnswered) {
                            if (option === currentQuestion.correctAnswer) {
                                btnClass += " correct";
                            } else if (option === selectedOption) {
                                btnClass += " incorrect";
                            }
                        }

                        return (
                            <button
                                key={index}
                                className={btnClass}
                                onClick={() => handleOptionClick(option)}
                                disabled={isAnswered}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
