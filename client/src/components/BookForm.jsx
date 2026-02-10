import React, { useState } from 'react';
import { Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !author.trim()) {
      setError('Please fill in both title and author');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to add books');
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const response = await axios.post('https://books-management-twkp.onrender.com/api/books', {
        title,
        author
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccess('Book added successfully!');
      setTitle('');
      setAuthor('');

      // Callback to refresh book list
      if (onBookAdded) {
        onBookAdded(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="form-container">
      <Card.Body>
        <Card.Title>Add New Book</Card.Title>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Book Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <Button 
  variant="primary" 
  type="submit" 
  className="w-100 py-2 mt-2"
  disabled={loading}
>
  {loading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2"></span>
      Adding Book...
    </>
  ) : (
    '📖 Add Book'
  )}
</Button>
        </form>
      </Card.Body>
    </Card>
  );
};

export default BookForm;
