import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);   

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);   


  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return (
    <div>
      <h2>Book Details</h2>
      {isLoading ? (
        <p>Loading book details...</p>
      ) : error ? (
        <p>Error fetching book details: {error.message}</p>
      ) : book ? (
        <div>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Description: {book.description}</p>
          <img src={book.imageUrl} alt={book.title} />
          {/* Additional details based on API response */}
          {book.available && <p>Availability: {book.available ? 'In Stock' : 'Out of Stock'}</p>}
        </div>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
}

export default BookDetails;