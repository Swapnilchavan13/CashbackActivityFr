import React, { useState } from 'react';
 import '../styles/game.css';

export const Game = () => {
  const [fireStatus, setFireStatus] = useState('burning');
  const [personStatus, setPersonStatus] = useState('stuck');
  const [image, setImage] = useState('https://64.media.tumblr.com/7da92909883a093ae1129095f5235d66/6f98a0a8fa94a3a6-f9/s2048x3072_c0,6649,100000,81117/e5cad959b1794b9ef8dc9f8b41693e307c565bb5.gif');
  const [optionChosen, setOptionChosen] = useState(false);

  const handleOptionClick = async (option) => {
    if (!optionChosen) {
      if (option === 'water') {
        setFireStatus('Saved');
        setPersonStatus('saved');
        setImage('https://i.gifer.com/BmnK.gif');
        setOptionChosen(true);

        try {
          // API call to update the wallet
          const walletResponse = await fetch('http://192.168.0.117:8012/updateWallet/41', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ points: 50 }) // Assuming 50 points for saving the family
          });
          if (!walletResponse.ok) {
            throw new Error('Failed to update wallet');
          }

          // API call to add transaction details
          const transactionResponse = await fetch('http://192.168.0.117:8012/newTransaction/41', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ points: 50, activityID: 3 }) // Assuming activityID is set elsewhere
          });
          if (!transactionResponse.ok) {
            throw new Error('Failed to add transaction details');
          }
          
          alert('Congratulations! You have saved the family and earned 50 CB.');
        } catch (error) {
          console.error('Error:', error);
          alert('Failed to save the family. Please try again later.');
        }
      } else {
        setFireStatus('worsened');
        setPersonStatus('endangered');
        setImage(option === 'petrol' ? 'https://i.pinimg.com/originals/36/33/ef/3633efb468b7d88c68791f4a9353bea4.gif' : 'https://i.gifer.com/Q3Mn.gif');
        setOptionChosen(true);
        alert('Sorry, wrong option selected. The situation has worsened!');
      }
    }
  };

  return (
    <div className="game-container">
      <div>
        <h1>Save The Family</h1>
        <p>Choose the right answer from the options given and earn Cashback points.</p>
        <img src={image} alt="Fire status" className="fire-image" />
      </div>

      <h2 className="person-status">Result: {personStatus}</h2>

      <h3>Choose an option:</h3>
      <div className="option-container">
        <div>
          <button className='gbtn'>OPTION 1</button>
          <br />
        <img className='option-image' src="https://media.istockphoto.com/id/876667416/vector/yellow-fuel-pump-nozzle-and-drop-isolated-gas-filling-station-icon.jpg?s=612x612&w=0&k=20&c=jcx8Et1c-PvR3tULGkfB_p_UrmSVF3KxlJ81EziB4ZY=" alt="Petrol" onClick={() => handleOptionClick('petrol')} />
        </div>
        <div>
        <button className='gbtn'>OPTION 2</button>
          <br />

        <img className='option-image' src="https://png.pngtree.com/png-clipart/20230918/original/pngtree-vector-characters-in-semiflat-colors-showing-firefighters-with-water-hose-vector-png-image_12371837.png" alt="Water" onClick={() => handleOptionClick('water')} />
        </div>
        <div>
        <button className='gbtn'>OPTION 3</button>
          <br />

        <img className='option-image' src="https://img.freepik.com/free-vector/stump-log-cartoon-piece-wood-broken-oak-linden-maple-cedar_105738-1343.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1713398400&semt=ais" alt="Wood" onClick={() => handleOptionClick('wood')} />
        </div>
      </div>
    </div>
  );
};


