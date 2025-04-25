import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Column from './Column';
import '../styles/Board.css';

const Board = ({ board }) => {
const { boards, setBoards } = useContext(AppContext);
const [newColumnName, setNewColumnName] = useState('');
const [editingColumnId, setEditingColumnId] = useState(null);
const [editedColumnName, setEditedColumnName] = useState('');

const updateBoard = (updatedColumns) => {
    const updatedBoard = { ...board, columns: updatedColumns };
    const updatedBoards = boards.map(b => b.id === board.id ? updatedBoard : b);
    setBoards(updatedBoards);
  };

const addColumn = () => {
    if (!newColumnName.trim()) return;
    const newColumn = {
        id: Date.now(),
        name: newColumnName,
        tasks: [],
    };
    updateBoard([...board.columns, newColumn]);
    setNewColumnName('');
};

const deleteColumn = (columnId) => {
    if (window.confirm('Delete?')) {
        const updated = board.columns.filter(c => c.id !== columnId);
        updateBoard(updated);
    }
  };

const saveEdit = (columnId) => {
    const updated = board.columns.map(col =>
        col.id === columnId ? { ...col, name: editedColumnName } : col
    );
    updateBoard(updated);
    setEditingColumnId(null);
};

    return (
    <div className="board">
        <h3>Доска: {board.name}</h3>
        <div className="columns">
        {board.columns.map((column) => (
            <div key={column.id} className="co">
            
                <Column column={column} board={board} updateBoardColumns={updateBoard}/>
            </div>
        ))}
        <div className="add-column">
            <input
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                placeholder="Name of column "
        />
            <button onClick={addColumn}>Add Column</button>
            </div>
        </div>
    </div>
);
};

export default Board;
