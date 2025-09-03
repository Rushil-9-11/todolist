import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './TodoList.css';

function TodoList({ todos, setTodos, completeTodo }) {
  const handleDelete = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleComplete = (id) => {
    completeTodo(id);
  };

  return (
    <ul className="todo-list">
      {todos.length === 0 ? (
        <p className="empty-message">No tasks available</p>
      ) : (
        todos.map(todo => {
          const formattedDate = todo.dueDate
            ? new Date(todo.dueDate).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : null;

          return (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleComplete(todo.id)}
                  className="todo-checkbox"
                  aria-label={`Mark ${todo.text} as completed`}
                />
                <span className="task-text">{todo.text}</span>
                {formattedDate && (
                  <span className="due-date-pill">Due: {formattedDate}</span>
                )}
              </div>

              <button
                className="btn delete-btn"
                onClick={() => handleDelete(todo.id)}
                aria-label={`Delete ${todo.text}`}
                title="Delete task"
              >
                <FaTrash size={18} />
              </button>
            </li>
          );
        })
      )}
    </ul>
  );
}

export default TodoList;
