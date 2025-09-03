import React from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <span
        onClick={() => toggleComplete(todo.id)}
        style={{ cursor: 'pointer' }}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '10px' }}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
