import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import '../styles/BoardList.css';

const BoardList = ({ setActiveBoard }) => {
const { boards, setBoards } = useContext(AppContext);
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
        <ul>
        {boards.map((board) => (
            <li key={board.id}>
            {editingBoardId === board.id ? (
                <>
                    <input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                />
                    <button onClick={() => saveEditedBoard(board.id)}>Сохранить</button>
                    </>
            ) : (   <>
                <span onClick={() => setActiveBoard(board)}>{board.name}</span>
                <button onClick={() => {
                    setEditingBoardId(board.id);
                    setEditedName(board.name);
                }}>✏️</button>
                <button onClick={() => deleteBoard(board.id)}>🗑️</button>
                </>
            )}
            </li>
        ))}
        </ul>
        <div>
            <input
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                placeholder="Новая доска"
        />
        <button onClick={addBoard}>Добавить</button>
        </div>
    </div>
  );
};

export default BoardList;
