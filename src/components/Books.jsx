import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from './AuthService';   


const Books = ({ api }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const   
 currentUser = AuthService.getCurrentUser();

  const handleCheckout = async (bookId) => {
    try {
      const response = await fetch(`${api}/books/${bookId}/checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AuthService.getToken()}`
        }
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      // Optimistic update (optional)
      const updatedBooks = books.map(book => {
        if (book.id === bookId) {
          return { ...book, available: false };
        }
        return book;
      });
      setBooks(updatedBooks);

      // Navigate to BookDetails for visual confirmation (optional)
      navigate(`/books/${bookId}`);
    } catch (error) {
      console.error('Checkout error:', error);
      // Handle error, e.g., display error message to user
    }
  };

  useEffect(() => {
    const getBooks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${api}/books`);
        const jsonResponse = await response.json();
        const allBooks = jsonResponse.books;
        setBooks(allBooks);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getBooks();
  }, []);

  return (
    <>
      <h1>Books</h1>
      <div id="all-books">
        {isLoading ? (
          <p>Loading books...</p>
        ) : error ? (
          <p>Error fetching books: {error.message}</p>
        ) : (
          books.map((book) => (
            <div className="singleBook" key={book.id}>
              <p>{book.title}</p>
              <img src={book.coverimage} height="100px" />
              {currentUser && book.available && (
                <button onClick={() => handleCheckout(book.id)}>Checkout</button>
              )}
              <button onClick={() => navigate(`/books/${book.id}`)}>Details</button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Books;