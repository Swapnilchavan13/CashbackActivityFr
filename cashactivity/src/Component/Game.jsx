import React, { useState } from 'react';
import '../styles/game.css';

export const Game = () => {
  const [activityId, setAid] = useState(3)
  const [points, setPoints] = useState(50);
  const [guess, setGuess] = useState('');

  const randomNumber = Math.floor(Math.random() * 2) + 1;

  const handleGuess = async () => {
    const parsedGuess = parseInt(guess);
    if (!isNaN(parsedGuess)) {
      if (parsedGuess === randomNumber) {
        alert('Congratulations! You guessed the correct number! You Got 50 CB');
        try {
          // Update the wallet
          const responseWallet = await fetch('http://192.168.0.117:8012/updateWallet/8', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ points}) // Sending updated points
          });
          if (!responseWallet.ok) {
            console.error('Failed to update walletTable / transactionTable');
          }
  
          // Add transaction details
          const responseTransaction = await fetch('http://192.168.0.117:8012/newTransaction/8', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ points, activityID: activityId }) // Assuming activityId is set elsewhere
          });
          if (!responseTransaction.ok) {
            console.error('Failed to update transactionTable');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        alert(`Sorry, the correct number was ${randomNumber}. Try again!`);
      }
    } else {
      alert('Please enter a valid number between 1 and 2.');
    }
    setGuess('');
  };
  

  return (
    <div className="game-container">
      <h1 className="game-title">Guess the Number Game</h1>
      <div className="input-container">
        <p>Guess a number between 1 and 2:</p>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleGuess}>Guess</button>
      </div>
      {/* <p className="points">points: {points}</p> */}
    </div>
  );
};
