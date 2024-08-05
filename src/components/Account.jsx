import React, { useState, useEffect } from 'react';

const Account = ({ token, api }) => {
  const [newUser, setNewUser] = useState(null);
  const [checkedOut, setCheckedOut] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async   () => {
      if (!token) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${api}/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const   
 jsonResponse = await response.json();
        setNewUser(jsonResponse);
        setCheckedOut(jsonResponse.checkedOutBooks || []); // Assuming checkedOutBooks in user data
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, api]);

  const handleReturn = async (id) => {
    try {
      const response = await fetch(`${api}/books/${id}/return`, { // Assuming a /return endpoint
        method: "POST", // Assuming POST request for return
        headers: {
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to return book');
      }

      setCheckedOut(checkedOut.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error returning book:', error);
      // Handle error, e.g., display error message to user
    }
  };

  return (
    <>
      {
        token ?
          <>
            {isLoading ? (
              <p>Loading user data...</p>
            ) : error ? (
              <p>Error fetching user data: {error.message}</p>
            ) : (
              <div id="account-details">
                <h1>Your account info</h1>
                <p><b>Email:</b> {newUser.email}</p>
                <div>
                  {checkedOut.length === 0 ? (
                    <h2>You do not have any books checked out!</h2>
                  ) : (
                    <h2>These are the books you currently have checked out</h2>
                  )}
                  {
                    checkedOut.map((book) => (
                      <div key={book.id} className="checkedoutBooks">
                        <h4>{book.title}</h4>
                        <img src={book.coverimage} height='150px' alt={book.title} />
                        <br />
                        <button onClick={() => handleReturn(book.id)}>Return Book</button>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </>
        :
          <h1>You must login first!</h1>
      }
    </>
  );
};

export default Account;