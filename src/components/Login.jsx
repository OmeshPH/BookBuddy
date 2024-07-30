import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const   
 [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const   
 [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');   


    // Basic input validation
    if (!email || !password) {
      setErrorMessage('Email and password are required');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }

    const isLogin = !!email && !!password && !firstname && !lastname;
    const endpoint = isLogin ? '/api/users/login' : '/api/users/register';
    const body = isLogin
      ? JSON.stringify({ email, password })
      : JSON.stringify({ email, password, firstname, lastname });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
        setErrorMessage(errorData.message || 'An error occurred');
        return;
      }

      const data = await response.json();
      console.log('Login/Registration successful:', data);
      localStorage.setItem('token', data.token); // Store token
      navigate('/account');
    } catch (error) {
      console.error('Error logging in or registering:', error);
      setErrorMessage('An unexpected error occurred');
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <h2>Login/Register</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password"   
 value={password} onChange={(e) => setPassword(e.target.value)} />
        {!isLogin && (
          <>
            <input   
 type="text" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            <input type="text" placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
          </>
        )}
        <button type="submit">Login/Register</button>   

      </form>
    </div>
  );
}

export default Login;