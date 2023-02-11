import './App.css';
import Board from './Components/Board'
import Keyboard from './Components/Keyboard';
import { createContext, useState } from 'react'
import { boardDefault } from "./Words"

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letter: 0});

  const correctWord = 'HEART'

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
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 })
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
