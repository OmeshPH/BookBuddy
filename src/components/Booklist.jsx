import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);   


  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/books');   

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      {isLoading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p>Error fetching books: {error.message}</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;