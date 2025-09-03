import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Filter from './components/Filter';
import { FaSun, FaMoon } from 'react-icons/fa';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  // Filter todos based on selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true; // 'all'
  });

  // Toggle Light/Dark mode and apply class to body
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  // Add new todo with duplicate check
  const addTodo = (newTodo) => {
    setTodos(prevTodos => {
      const isDuplicate = prevTodos.some(todo => todo.text === newTodo.text);
      if (isDuplicate) {
        // Replace existing task with the new one
        return prevTodos.map(todo =>
          todo.text === newTodo.text ? { ...todo, ...newTodo } : todo
        );
      }
      return [...prevTodos, newTodo];
    });
  };

  // Auto-delete completed tasks after 24 hours
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTodos(prevTodos =>
        prevTodos.filter(todo =>
          !(todo.completed && todo.completedAt && now - todo.completedAt > 86400000)
        )
      );
    }, 60000); // check every minute

    return () => clearInterval(interval);
  }, []);

  // Mark task as completed (adds completedAt timestamp)
  const completeTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: true, completedAt: Date.now() }
          : todo
      )
    );
  };

  return (
    <div className="App">
      <h1>My To-Do List</h1>

      <button
        onClick={toggleDarkMode}
        aria-label={`Switch to ${darkMode ? 'Light' : 'Dark'} Mode`}
        className="mode-toggle-btn"
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      <TodoForm addTodo={addTodo} />

      <Filter filter={filter} setFilter={setFilter} />

      <TodoList
        todos={filteredTodos}
        setTodos={setTodos}
        completeTodo={completeTodo}
      />
    </div>
  );
}

export default App;
