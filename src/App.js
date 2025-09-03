import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Filter from './components/Filter'; // If you want to keep filter UI
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  // Filtering todos based on filter state
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true; // 'all'
  });

  // Toggle Dark Mode
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className={darkMode ? 'App dark-mode' : 'App light-mode'}>
      <h1>My To-Do List</h1>

      <button onClick={toggleDarkMode} style={{ marginBottom: '20px' }}>
        Switch to {darkMode ? 'Light' : 'Dark'} Mode
      </button>

      <TodoForm todos={todos} setTodos={setTodos} />
      <Filter filter={filter} setFilter={setFilter} />
      <TodoList todos={filteredTodos} setTodos={setTodos} />
    </div>
  );
}

export default App;
