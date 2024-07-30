import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();   


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response   
 = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email,   
 password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token);   
 // Assuming token is in 'token' field
        navigate('/account');
      } else {
        console.error('Login failed:', response.statusText);
        // Optionally display an error message to the user
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Optionally display an error message to the user
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input   
 type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button   
 type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;   
