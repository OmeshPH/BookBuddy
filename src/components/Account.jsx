import React, { useState, useEffect } from 'react';

function Account() {
  const [user, setUser] = useState(null);
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token
          }
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchCheckedOutBooks = async () => {
      try {
        const response = await fetch('/api/reservations', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token
          }
        });
        const data = await response.json();
        setCheckedOutBooks(data);
      } catch (error) {
        console.error('Error fetching checked-out books:', error);
      }
    };

    fetchUserData();
    fetchCheckedOutBooks();
  }, []);

  return (
    <div>
      <h2>Account</h2>
      {user ? (
        <div>
          <h3>Welcome, {user.firstName} {user.lastName}!</h3>
          <p>Email: {user.email}</p>
          {/* Add other user information as needed */}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}

      <h3>Checked Out Books</h3>
      {checkedOutBooks.length > 0 ? (
        <ul>
          {checkedOutBooks.map(book => (
            <li key={book.id}>
              {book.title} - {book.author}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no checked-out books.</p>
      )}
    </div>
  );
}

export default Account;