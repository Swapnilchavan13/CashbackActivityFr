import React from 'react';
import { Link } from "react-router-dom";
import '../styles/navbar.css';

export const Navbar = () => {
  return (
    <div className="navbar"> {/* Use className instead of style */}
      <Link to="quiz">
        <h2>Quiz</h2>
      </Link>
      <Link to="/game">
        <h2>Game</h2>
      </Link>
      <Link to="puzzle">
        <h2>Puzzle</h2>
      </Link>
    </div>
  )
}
