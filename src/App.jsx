import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';
import BoardList from './components/BoardList';
import Board from './components/Board.jsx'; 
import '../src/styles/App.css';

function App() {
  const { activeBoardId, boards } = useContext(AppContext);

  const board = boards.find((b) => b.id === activeBoardId);

  return (
    <div className="App">
      {board ? <Board board={board} /> : <BoardList />}
    </div>
  );
}

export default App;

