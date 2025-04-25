import React, { useState } from 'react';
import TaskCard from './TaskCard';
import '../styles/Column.css';

const Column = ({ column, board, updateBoardColumns }) => {
    const [newTaskName, setNewTaskName] = useState('');
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState(column.name);
    
const addTask = () => {
    if (!newTaskName.trim()) return;
        const newTask = {
            id: Date.now(),
            title: newTaskName,
            completed: false,
    };
    const updatedColumns = board.columns.map((col) =>
        col.id === column.id ? { ...col, tasks: [...col.tasks, newTask] } : col
    );
    updateBoardColumns(updatedColumns);
    setNewTaskName('');
  };

const deleteColumn = () => {
    if (window.confirm('Удалить колонку?')) {
        updateBoardColumns(board.columns.filter((col) => col.id !== column.id));
    }
};

const saveNewName = () => {
    const updatedColumns = board.columns.map((col) =>
        col.id === column.id ? { ...col, name: newName } : col
    );
    updateBoardColumns(updatedColumns);
    setEditing(false);
};

return (
    <div className="column">
        {editing ? (
        <>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} />
            <button onClick={saveNewName}>Сохранить</button>
        </>
) : (
            <h3>
            {column.name}
            <button onClick={() => setEditing(true)}>✏️</button>
            <button onClick={deleteColumn}>🗑️</button>
        </h3>
        )}

    {column.tasks.map((task) => (
        <TaskCard
            key={task.id}
            task={task}
            column={column}
            board={board}
            updateBoardColumns={updateBoardColumns}
        />
        ))}

        <div className="new-task">
            <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="Новая задача"
        />
        <button onClick={addTask}>Добавить</button>
        </div>
    </div>
);
};

export default Column;
