import { useState, useEffect } from 'react';

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('/todos')
      .then(response => response.json())
      .then(data => {
        const updatedTodos = data.map(todo => ({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          status: todo.status
        }));
        setTodos(updatedTodos);
      })
      .catch(error => console.log(error));
  }, []);

  const handleDelete = id => {
    fetch(`/todos/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setTodos(todos.filter(todo => todo.id !== id));
        } else {
          throw new Error('Something went wrong while deleting the todo');
        }
      })
      .catch(error => console.log(error));
  };

  const handleUpdate = (id, updatedTodo) => {
    fetch(`/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodo)
    })
      .then(response => {
        if (response.ok) {
          const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
              return { ...todo, ...updatedTodo };
            } else {
              return todo;
            }
          });
          setTodos(updatedTodos);
        } else {
          throw new Error('Something went wrong while updating the todo');
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Todos:</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>Description: {todo.description}</p>
            <p>Status: {todo.status}</p>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <button onClick={() => handleUpdate(todo.id, { status: 'completed' })}>Mark as Completed</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
