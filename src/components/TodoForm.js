import React, { useState, useRef } from 'react';
import DatePicker from 'react-date-picker';
import { FaRegCalendarAlt } from 'react-icons/fa';
import 'react-date-picker/dist/DatePicker.css';
import './TodoForm.css';

function TodoForm({ addTodo }) {
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const datePickerRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = input.trim();
    if (!trimmedText) return;

    const newTodo = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
      dueDate,  // ES6 shorthand
    };

    addTodo(newTodo);
    setInput('');
    setDueDate(new Date());
  };

  // Manually open calendar popup from hidden DatePicker
  const openCalendar = () => {
    if (datePickerRef.current) {
      datePickerRef.current.openCalendar();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Add a new task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="todo-input"
        aria-label="Task description"
      />

      {/* Hidden DatePicker input */}
      <DatePicker
        onChange={setDueDate}
        value={dueDate}
        clearIcon={null}
        calendarIcon={null}
        ref={datePickerRef}
        className="hidden-date-picker"
        calendarClassName="todo-calendar" // Optional: for styling the calendar popup
        aria-label="Select due date"
      />

      {/* Calendar icon triggers the calendar popup */}
      <button
        type="button"
        className="calendar-btn"
        onClick={openCalendar}
        aria-label="Choose due date"
      >
        <FaRegCalendarAlt size={24} />
      </button>

      <button type="submit" className="add-btn">Add</button>
    </form>
  );
}

export default TodoForm;
