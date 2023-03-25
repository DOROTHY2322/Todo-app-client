import React, { useState, useEffect } from 'react';


function NewTodos() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/todos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        return response.json();
      })
      .then((data) => {
        // handle successful response
        console.log('Todos fetched successfully', data);
        setTodos(data);
      })
      .catch((error) => {
        // handle error
        console.error(error);
        setErrorMessage('Failed to fetch todos');
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, priority }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create todo');
        }
        return response.json();
      })
      .then((data) => {
        // handle successful response
        console.log('Todo created successfully', data);
        setTitle('');
        setDescription('');
        setPriority('');
        setTodos([...todos, data]);
      })
      .catch((error) => {
        // handle error
        console.error(error);
        setErrorMessage('Failed to create todo');
      });
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} />
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select id="priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <button type="submit">Create Todo</button>
        </div>
      </form>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Priority: {todo.priority}</p>
          </li>
        ))}
      </ul>
      {errorMessage && (
        <div className="error-popup">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default NewTodos;
