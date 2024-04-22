import React, { useState } from "react";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import '../styles/puzzle.css';

export const Puzzle = () => {
    const activityID = 2;
    const [points, setPoints] = useState(100);
    const [completed, setCompleted] = useState(false);
    const [btn, setButton] = useState(false);

    const handleSubmit = () => {
        if (!completed) {
            fetch('http://192.168.0.117:8012/updateWallet/8', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ points })
            })
            .then(response => {
                if (response.ok) {
                    alert("You guessed the word! You Got 100 CB");
                    setCompleted(true);
                    
                    // Add the second API call and alert only if not already completed
                    if (!completed) {
                        fetch('http://192.168.0.117:8012/newTransaction/8', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ points, activityID })
                        })
                        .then(transactionResponse => {
                            if (transactionResponse.ok) {
                                console.log("Transaction completed successfully!");
                            } else {
                                console.error('Failed to update transactionTable');
                            }
                        })
                        .catch(transactionError => {
                            console.error('Error in transaction:', transactionError);
                        });
                    }
                } else {
                    console.error('Failed to update walletTable');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    };

    const handlePuzzleCompletion = () => {
        setButton(true);
    };

    return (
        <>
            {btn ? (
                <>
                    <h2>Congratulations! You solved the puzzle!</h2>
                </>
            ) : (
                <>
                <h2 className="tag">Unpuzzle the pieces!!</h2>
                <p>Move the pieces around to reform the image shown below and earn Cashback points.</p>
                </>
            )}
            
            <img className="mainimg" src="https://w0.peakpx.com/wallpaper/994/867/HD-wallpaper-song-hye-kyo-korean-actress.jpg" />
            <JigsawPuzzle
                imageSrc={"https://w0.peakpx.com/wallpaper/994/867/HD-wallpaper-song-hye-kyo-korean-actress.jpg"}
                rows={2}
                columns={2}
                onSolved={handlePuzzleCompletion}
                className="jigsaw-puzzle"
            />

          {btn ? (
              
                    <button className="btn" onClick={handleSubmit}>Submit</button>
            ) : (
                "Not Correct"
            )}
        </>
    );
};
