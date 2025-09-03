import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Filter from './components/Filter'; // keep filter component

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  // ✅ Auto-remove tasks after 24hrs if completed
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTodos(prevTodos =>
        prevTodos.filter(todo =>
          !todo.completed || (todo.completedAt && now - todo.completedAt < 86400000)
        )
      );
    }, 60000); // check every 60 seconds

    return () => clearInterval(interval);
  }, []);

  // ✅ Apply current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className="App">
      <h1 className="heading">My To-Do List</h1>
      <TodoForm setTodos={setTodos} todos={todos} />
      <Filter filter={filter} setFilter={setFilter} />
      <TodoList todos={filteredTodos} setTodos={setTodos} />
    </div>
  );
}

export default App;
