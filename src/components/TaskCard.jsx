import React, { useState } from 'react';
import '../styles/TaskCard.css';
import Task from './Task'

const TaskCard = ({ task, column, board, updateBoardColumns }) => {
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    const toggleComplete = () => {
        const updatedTasks = column.tasks.map((t) =>
            t.id === task.id ? { ...t, completed: !t.completed } : t
    );
        const updatedColumns = board.columns.map((col) =>
            col.id === column.id ? { ...col, tasks: updatedTasks } : col
    );
    updateBoardColumns(updatedColumns);
};

const deleteTask = () => {
    const updatedTasks = column.tasks.filter((t) => t.id !== task.id);
    const updatedColumns = board.columns.map((col) =>
        col.id === column.id ? { ...col, tasks: updatedTasks } : col
    );
        updateBoardColumns(updatedColumns);
};

const saveNewTitle = () => {
    const updatedTasks = column.tasks.map((t) =>
        t.id === task.id ? { ...t, title: newTitle } : t
    );
    const updatedColumns = board.columns.map((col) =>
        col.id === column.id ? { ...col, tasks: updatedTasks } : col
    );
    updateBoardColumns(updatedColumns);
    setEditing(false);
};

return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
        {editing ? (
        <>
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <button onClick={saveNewTitle}>Сохранить</button>
        </>
) : (
        <>
            
            <p >{task.title}</p>
            <div className="task-actions">
                <button onClick={() => setEditing(true)}>✏️</button>
                <button onClick={deleteTask}>🗑️</button>
            </div>
            <Task
            key={task.id}
            task={task}
            onEdit={(updatedTask) => {
                const updatedTasks = column.tasks.map((t) =>
                t.id === task.id ? updatedTask : t
                );
                const updatedColumns = board.columns.map((col) =>
                col.id === column.id ? { ...col, tasks: updatedTasks } : col
                );
                updateBoardColumns(updatedColumns);
            }}
            onToggleComplete={toggleComplete}
            />
        </>
    )}
    </div>
  );
};

export default TaskCard;
