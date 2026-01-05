import express from 'express';
import { createBook, deleteBook, getBookById, getBookByName, getBooks, updateBook } from '../controller/book.controller';
import { requireAuth, requiredLibrarian } from '../middlewares/auth';



// Initializing the router
const router = express.Router();

// Defining routes for book operations
router.post('/', requireAuth, requiredLibrarian, createBook);
router.get('/', getBooks);
router.get('/:title', getBookByName);
router.get('/book/:id', getBookById);
router.put('/:id', requireAuth, requiredLibrarian, updateBook);
router.delete('/:id', requireAuth, requiredLibrarian, deleteBook);


// Exporting the router to be used in app.ts
export default router;