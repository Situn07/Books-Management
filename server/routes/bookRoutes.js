import express from 'express';
import Book from '../models/Book.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all books (public)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('user', 'email');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new book (protected)
router.post('/', protect, async (req, res) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: 'Please provide title and author' });
    }

    const book = new Book({
      title,
      author,
      user: req.userId
    });

    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;