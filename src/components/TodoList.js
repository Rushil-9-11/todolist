import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TodoList({ todos, setTodos }) {
  // Group todos by date
  const groupedTodos = todos.reduce((groups, todo) => {
    const date = todo.date || 'No Date';
    if (!groups[date]) groups[date] = [];
    groups[date].push(todo);
    return groups;
  }, {});

  // Handle drag end
  const onDragEnd = result => {
    if (!result.destination) return;

    const date = result.source.droppableId;
    const items = Array.from(groupedTodos[date]);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);

    // Rebuild todos with reordered items for that date
    const newTodos = [...todos.filter(todo => todo.date !== date), ...items];
    setTodos(newTodos);
  };

  const toggleComplete = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.keys(groupedTodos).map(date => (
        <div key={date} style={{ marginBottom: '30px' }}>
          <h3>{date}</h3>
          <Droppable droppableId={date}>
            {provided => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ listStyle: 'none', padding: 0 }}
              >
                {groupedTodos[date].map(({ id, text, completed }, index) => (
                  <Draggable key={id} draggableId={id.toString()} index={index}>
                    {provided => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: '10px',
                          marginBottom: '8px',
                          backgroundColor: completed ? '#d3d3d3' : '#f0f0f0',
                          color: completed ? '#888' : '#000',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          ...provided.draggableProps.style,
                        }}
                      >
                        <label style={{ flexGrow: 1, cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={completed}
                            onChange={() => toggleComplete(id)}
                            style={{ marginRight: '10px' }}
                          />
                          <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                            {text}
                          </span>
                        </label>
                        <button onClick={() => deleteTodo(id)}>Delete</button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      ))}
    </DragDropContext>
  );
}

export default TodoList;
