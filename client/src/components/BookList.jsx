import React, { useState, useEffect } from 'react';
import { Table, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/books');
      // Sort books by createdAt in descending order (newest first)
      const sortedBooks = response.data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBooks(sortedBooks);
      setError('');
    } catch (err) {
      setError('Failed to fetch books');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" />
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="book-list mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="badge bg-primary">
          {books.length} {books.length === 1 ? 'Book' : 'Books'}
        </span>
      </div>
      
      {books.length === 0 ? (
        <div className="text-center py-5">
          <div className="display-1 text-muted mb-3">📖</div>
          <h4 className="text-muted">No books found</h4>
          <p className="text-muted">Add your first book to get started!</p>
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Added On</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id}>
                  <td className="fw-bold">{index + 1}</td>
                  <td className="fw-medium">{book.title}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {book.author}
                    </span>
                  </td>
                  <td className="text-muted">
                    {new Date(book.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default BookList;