import React, { useState } from 'react';

export const Puzzle = () => {
    const activityID = 2; // Corrected variable name
    const [points, setPoints] = useState(30); // Changed setpoints to setPoints for consistency
    const [solved, setSolved] = useState(false);
    const [solution, setSolution] = useState('HELLO'); // Set the correct solution here
    const [currentAttempt, setCurrentAttempt] = useState(''); // Initialize the attempt with an empty string
    const [description, setDescription] = useState("Let them know you've picked up the phone"); // Set the description here

    const handleInput = (event) => {
        if (!solved) {
            const { value } = event.target;
            setCurrentAttempt(value.toUpperCase()); // Convert input to uppercase
        }
    };

    const handleSubmit = async () => {
        if (!solved) {
            const isCorrect = currentAttempt === solution;
            if (isCorrect) {
                alert("You guessed the word! You Got 30 CB");
                try {
                    const response = await fetch('http://192.168.0.117:8012/updateWallet/9', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ points })
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
                        console.error('Failed to update walletTable');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                alert("Sorry, try again!");
            }
            setSolved(true);
        } else {
            console.log("You've already guessed the word!");
        }
    };

    const handleReset = () => {
        setCurrentAttempt('');
        setSolved(false);
    };

    return (
        <div className="puzzle-container">
            <h1 className="puzzle-title">Guess the Word</h1>
            <p className="description">{description}</p>
            <div className="word-container">
                <input
                    type="text"
                    value={currentAttempt}
                    onChange={handleInput}
                    className="word-input"
                    maxLength={solution.length}
                    readOnly={solved}
                />
            </div>
            <div className="button-container">
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
                <button className="reset-button" onClick={handleReset}>Reset</button>
            </div>
            {/* <p className="points">points: {points}</p> */}
        </div>
    );
};
