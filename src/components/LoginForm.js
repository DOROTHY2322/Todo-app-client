import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usernameOrEmail, password })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Invalid username/email or password');
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username or Email:
          <input type="text" value={usernameOrEmail} onChange={(event) => setUsernameOrEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <Link to="/register">Create one</Link></p>

      {data && (
        <div>
          <h2>Data:</h2>
          <p>{data}</p>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
