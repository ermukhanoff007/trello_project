import React, { useState } from 'react';
import '../styles/Task.css';

const Task = ({ task, onDelete, onEdit, onToggleComplete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(task.name);
    const [editedDescription, setEditedDescription] = useState(task.description || '');

    const saveEdit = () => {
        onEdit({ ...task, name: editedName, description: editedDescription });
        setIsEditing(false);
      };

    if (!task) return null;

    return (
        <div className={`task ${task.completed ? 'completed' : ''}`}>
            {isEditing ? (
        <>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Описание"
          />
          <button onClick={saveEdit}>Сохранить</button>
        </>
      ) : (
        <>
            <h5>{task.name}</h5>
            {task.description && <p>{task.description}</p>}
            <div className="task-buttons">
            <button onClick={() => setIsEditing(true)}>✏️</button>
            <button onClick={() => onToggleComplete(task.id)}>
                {task.completed ? '↩️' : '✅'}
            </button>
            </div>
        </>
        )}
    </div>
);
};

export default Task;
