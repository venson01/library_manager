import express from "express";
import { requireAuth } from "../middlewares/auth";
import { borrowBook } from "../controller/borrow.controller";

// Initializing the router
const router = express.Router();

// Defining route for borrowing a book
router.post('/:userId', requireAuth, borrowBook);

export default router;