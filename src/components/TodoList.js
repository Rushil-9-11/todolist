import React, { useState } from 'react';
import './TodoList.css';

function TodoList({ todos, setTodos }) {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  // Toggle completed state and set or clear timestamp
  const toggleComplete = (id) => {
    const now = Date.now();
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? now : null,
            }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const applyEdit = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText('');
  };

  return (
    <div className="todo-list">
      {todos.length === 0 && <p className="empty-message">No tasks yet. Add some!</p>}
      {todos.map(({ id, text, completed }) => (
        <div key={id} className={`todo-item ${completed ? 'completed' : ''}`}>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => toggleComplete(id)}
          />

          {editId === id ? (
            <input
              type="text"
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && applyEdit(id)}
            />
          ) : (
            <span className="task-text">{text}</span>
          )}

          <div className="buttons">
            {editId === id ? (
              <button onClick={() => applyEdit(id)} className="btn save-btn">Save</button>
            ) : (
              <button onClick={() => startEditing(id, text)} className="btn edit-btn">Edit</button>
            )}
            <button onClick={() => deleteTodo(id)} className="btn delete-btn">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
