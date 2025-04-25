import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import '../styles/BoardList.css';

const BoardList = () => {
  const { boards, setBoards, setActiveBoardId } = useContext(AppContext);
  const [newBoardName, setNewBoardName] = useState('');
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [editedName, setEditedName] = useState('');

  const addBoard = () => {
    if (!newBoardName.trim()) return;
    const newBoard = {
      id: Date.now(),
      name: newBoardName,
      columns: [],
    };
    setBoards([...boards, newBoard]);
    setNewBoardName('');
  };

  const deleteBoard = (id) => {
    if (window.confirm('Удалить доску?')) {
      setBoards(boards.filter((b) => b.id !== id));
    }
  };

  const saveEditedBoard = (id) => {
    const updated = boards.map((b) =>
      b.id === id ? { ...b, name: editedName } : b
    );
    setBoards(updated);
    setEditingBoardId(null);
    setEditedName('');
  };

  return (
    <div className="board-list">
      <h2>Доски</h2>
      <div className="new-board">
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="Новая доска"
        />
        <button onClick={addBoard}>Добавить</button>
      </div>
      <ul>
        {boards.map((board) => (
          <div key={board.id} className="board" onClick={() => setActiveBoardId(board.id)}>
            {editingBoardId === board.id ? (
              <>
                <input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <button onClick={() => saveEditedBoard(board.id)}>Сохранить</button>
              </>
            ) : (
              <>
                <span >{board.name}</span>
                <button
                  onClick={() => {
                    setEditingBoardId(board.id);
                    setEditedName(board.name);
                  }}
                >
                  ✏️
                </button>
                <button onClick={() => deleteBoard(board.id)}>🗑️</button>
              </>
            )}
          </div>
        ))}
      </ul>
      
    </div>
  );
};

export default BoardList;
