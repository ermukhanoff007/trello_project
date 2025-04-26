import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import '../styles/Board.css';

const Board = ({ board }) => {
  const { boards, setBoards, setActiveBoardId } = useContext(AppContext);
  const [newColumnName, setNewColumnName] = useState('');

  const updateBoard = (updatedColumns) => {
    const updatedBoard = { ...board, columns: updatedColumns };
    const updatedBoards = boards.map(b => b.id === board.id ? updatedBoard : b);
    setBoards(updatedBoards);
  };

  const addColumn = () => {
    if (!newColumnName.trim()) return;
    const newColumn = {
      id: Date.now().toString(), // important: use string for droppableId
      name: newColumnName,
      tasks: [],
    };
    updateBoard([...board.columns, newColumn]);
    setNewColumnName('');
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = board.columns.find(col => col.id.toString() === source.droppableId);
    const destCol = board.columns.find(col => col.id.toString() === destination.droppableId);

    if (!sourceCol || !destCol) return;

    const sourceTasks = Array.from(sourceCol.tasks);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceCol.id === destCol.id) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const updatedColumns = board.columns.map(col =>
        col.id === sourceCol.id ? { ...col, tasks: sourceTasks } : col
      );
      updateBoard(updatedColumns);
    } else {
      const destTasks = Array.from(destCol.tasks);
      destTasks.splice(destination.index, 0, movedTask);

      const updatedColumns = board.columns.map(col => {
        if (col.id === sourceCol.id) return { ...col, tasks: sourceTasks };
        if (col.id === destCol.id) return { ...col, tasks: destTasks };
        return col;
      });

      updateBoard(updatedColumns);
    }
  };

  return (
    <div className="board">
      <div className="board-name">
        <h3>Доска: {board.name}</h3>
        <button onClick={() => setActiveBoardId(null)}>↩️</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          {board.columns.map((column) => (
            <div key={column.id} className="co">
              <Column
                column={column}
                board={board}
                updateBoardColumns={updateBoard}
              />
            </div>
          ))}

          <div className="add-column">
            <input
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="Имя колонки"
            />
            <button onClick={addColumn}>Добавить колонну</button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
