import React, { useState } from 'react';


function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = (event) => {
    event.preventDefault();
    
    const user = { username, email, password };

    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        
      })
      .catch(error => {
        console.error(error);
        setErrorMessage('Registration failed. Please try again.');
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister} className="register-form">
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
