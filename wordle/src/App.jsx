import './App.css';
import Board from './Components/Board'
import Keyboard from './Components/Keyboard';
import { createContext, useState, useEffect } from 'react'
import { boardDefault, generateWordSet } from "./Words"

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letter: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([])

  const correctWord = 'adore';

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet)
    })
  },[])

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
      const newBoard = [...board];
      newBoard[currAttempt.attempt][currAttempt.letter] = key
      setBoard(newBoard)
      setCurrAttempt({attempt: currAttempt.attempt, letter: currAttempt.letter + 1});
  }

  const onDeleteLetter = () => {
    if (currAttempt.letter === 0) return;
      const newBoard = [...board]
      newBoard[currAttempt.attempt][currAttempt.letter -1 ] = ''
      setBoard(newBoard)
      setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      alert("Word not found");
    }
    if (currWord === correctWord) {
      alert('Corect! Game Ended')
    }
  }
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{ 
        board,
        correctWord, 
        setBoard, 
        currAttempt, 
        disabledLetters,
        setDisabledLetters, 
        setCurrAttempt, 
        onSelectLetter, 
        onDeleteLetter, 
        onEnter }}>
        <div className='game'>
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
