import React, { useState } from 'react';
import DatePicker from 'react-date-picker';

function TodoForm({ todos, setTodos }) {
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit = e => {
    e.preventDefault();

    if (!text.trim()) return;

    // Check if task exists (case-insensitive)
    const existingIndex = todos.findIndex(todo => todo.text.toLowerCase() === text.toLowerCase());

    const newTodo = {
      id: existingIndex >= 0 ? todos[existingIndex].id : Date.now(),
      text,
      completed: false,
      date: date.toDateString(), // Store date as string for easy filtering
    };

    if (existingIndex >= 0) {
      // Replace existing task
      const updatedTodos = [...todos];
      updatedTodos[existingIndex] = newTodo;
      setTodos(updatedTodos);
    } else {
      setTodos([...todos, newTodo]);
    }

    setText('');
    setDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Enter task"
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ width: '60%', padding: '10px', fontSize: '16px' }}
      />
      <DatePicker onChange={setDate} value={date} clearIcon={null} />
      <button type="submit" style={{ marginLeft: '10px', padding: '10px 15px' }}>
        Add/Update Task
      </button>
    </form>
  );
}

export default TodoForm;
