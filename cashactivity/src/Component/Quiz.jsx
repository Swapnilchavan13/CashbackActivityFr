import React, { useState } from 'react';
import '../styles/quiz.css'; // Import CSS file for styling

export const Quiz = () => {
    const activityID = 1; // Corrected variable name
    const [points, setPoints] = useState(125);
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
        },
        // Additional questions
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Rome"],
            correctAnswer: "Paris"
        },
        {
            question: "What is the largest mammal on Earth?",
            options: ["Elephant", "Blue whale", "Giraffe", "Lion"],
            correctAnswer: "Blue whale"
        }
    ];

    const handleAnswer = async () => {
        if (!answered) {
            setAnswered(true);
            let totalPoints = 0;
            questions.forEach((q, index) => {
                if (selectedOptions[index] === q.correctAnswer) {
                    totalPoints += 25; // Increase points by 25 for each correct answer
                }
            });
            setPoints(totalPoints); // Set total points
            
            // Update wallet and transaction if all answers are correct
            if (totalPoints>0) {
                alert(`Wooohoo!!! ${totalPoints} CB Added`);
                try {
                    const response = await fetch('http://192.168.0.117:8012/updateWallet/8', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ points: totalPoints }) // Sending updated points
                    });
                    if (response.ok) {
                        console.log('Wallet updated successfully');
                        
                        // Add transaction details
                        const responseTransaction = await fetch('http://192.168.0.117:8012/newTransaction/8', {
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
            <h1 className="quiz-title">General Trivia!</h1>
            <p>Select the correct answer from the options given and earn Cashback points.</p>
            {questions.map((q, index) => (
            <div className='maindiv'>
                <div key={index} className="question-container">
                    <button className='qbtn'>QUESTION {index+1}</button>
                    <p className="question">{q.question}</p>
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
