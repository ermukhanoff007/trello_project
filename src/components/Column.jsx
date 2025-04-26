import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/Column.css';

const Column = ({ column, board, updateBoardColumns }) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(column.name);

  const addTask = () => {
    if (!newTaskName.trim()) return;
    const newTask = {
      id: Date.now().toString(), // IDs should be strings for react-beautiful-dnd
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
        <div className="edit-column">
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          <button onClick={saveNewName}>Сохранить</button>
        </div>
      ) : (
        <h3>
          {column.name}
          <button onClick={() => setEditing(true)}>✏️</button>
          <button onClick={deleteColumn}>🗑️</button>
        </h3>
      )}


      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
        
            {column.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    className="draggable-task"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard
                      task={task}
                      column={column}
                      board={board}
                      updateBoardColumns={updateBoardColumns}
                    />
                  </div>
                )}
              </Draggable>
            ))}

            
            {provided.placeholder}
          </div>
        )}
      </Droppable>

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
