import React, { useState } from 'react';
import '../styles/quiz.css'; // Import CSS file for styling

export const Quiz = () => {
    const activityID = 1; // Corrected variable name
    const [points, setPoints] = useState(75);
    const [answered, setAnswered] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});
    const questions = [
        {
            question: "What is the capital of Japan?",
            options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
            correctAnswer: "Tokyo"
        },
        {
            question: "What is the currency of India?",
            options: ["Rupee", "Yen", "Dollar", "Euro"],
            correctAnswer: "Rupee"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars"
        }
    ];

    const handleAnswer = async () => {
        if (!answered) {
            setAnswered(true);
            let totalPoints = 0;
            let allCorrect = true; // Flag to track if all answers are correct
            questions.forEach((q, index) => {
                if (selectedOptions[index] === q.correctAnswer) {
                    totalPoints += 25; // Increase points by 25 for each correct answer
                } else {
                    allCorrect = false; // If any answer is incorrect, set the flag to false
                }
            });
            // Alert if not all answers are correct
            if (!allCorrect) {
                alert("Not all answers are correct. Please review your answers.");
            } else {
                // Cap total points at 75
                totalPoints = Math.min(totalPoints, 75);
                setPoints(totalPoints);
                if (totalPoints === 75) {

                    alert("Wooohoo!!! 75 CB Added")
                    try {
                        const response = await fetch('http://192.168.0.117:8012/updateWallet/9', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ points }) // Sending updated points
                        });
                        if (response.ok) {
                            console.log('Wallet updated successfully');
                            
                            // Add transaction details
                            const responseTransaction = await fetch('http://192.168.0.117:8012/newTransaction/9', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ points, activityID }) // Corrected variable name
                            });
                            if (!responseTransaction.ok) {
                                console.error('Failed to update transactionTable');
                            }
                        } else {
                            console.error('Failed to update walletTable / transactionTable');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
            }
        } else {
            // Alert the user if they try to answer again after submission
            alert("You've already submitted your answers!");
        }
    };
    
    const handleOptionSelect = (index, option) => {
        if (!answered) {
            setSelectedOptions({ ...selectedOptions, [index]: option });
        }
    };

    return (
        <div className="quiz-container">
            <h1 className="quiz-title">Quiz</h1>
            {questions.map((q, index) => (
            <div className='maindiv'>
                <div key={index} className="question-container">
                    <h2 className="question">{q.question}</h2>
                    <div className="button-container">
                        {q.options.map((option, optionIndex) => (
                            <button
                                key={optionIndex}
                                className={selectedOptions[index] === option ? "answer-button selected" : "answer-button"}
                                onClick={() => handleOptionSelect(index, option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            ))}
          
            

            {answered ? null : (
                <button className="submit-button" onClick={handleAnswer}>Submit</button>
            )}
            {/* {answered && (
                <p className="points">Total points: {points}</p>
            )} */}
        </div>
    );
};
