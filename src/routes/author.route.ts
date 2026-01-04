import express from 'express';
import { createAuthor, deleteAuthor, getAuthorById, getAuthors, updateAuthor } from '../controller/author.controller';

// Initializing the router
const router = express.Router();

// Defining routes for author operations
router.post('/', createAuthor);
router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

// Exporting the router to be used in app.ts
export default router;