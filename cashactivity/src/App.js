import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from './Component/Navbar';
import { Puzzle } from './Component/Puzzle';
import { Game } from './Component/Game';
import { Quiz } from './Component/Quiz';

function App() {
  return (
    <div className="App">

     <BrowserRouter>
     <Navbar />
      <Routes>
          <Route path="quiz" element={<Quiz />} />
          <Route path="game" element={<Game />} />
          <Route path="puzzle" element={<Puzzle />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
