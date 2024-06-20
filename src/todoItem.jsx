import React, { useState } from 'react';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(todo.description);
  const [completed, setCompleted] = useState(todo.completed);

  const handleUpdate = () => {
    updateTodo(todo.id, { description, completed });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.description}
          </span>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => {
              setCompleted(!completed);
              updateTodo(todo.id, { ...todo, completed: !completed });
            }}
          />
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
