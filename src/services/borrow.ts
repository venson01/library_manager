import { Book } from "../models/Book";
import { IBorrow, Borrow } from "../models/Borrow";
import { User } from "../models/User";
import { AppError } from "../utils/appError";
import { Request, Response } from "express";

// Service to handle borrowing a book
export const borrowBookService = async (req: Request, res: Response) => {
  const bookId = req.body;
  const userId = req.user?.id;

  try {
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const book = await Book.findById(bookId);
    if (!book) {
      throw new AppError("Book not found", 404);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (book.availableCopies <= 0) {
      throw new AppError("No available copies of this book");
    }

    const borrow = new Borrow({
      bookId: book._id,
      borrowerId: user._id,
      borrowedDate: Date.now(),
    });

    await borrow.save();

    book.availableCopies -= 1;
    await book.save();

    res.success("Book borrowed successfully", 201);
  } catch (error) {
    throw new AppError("Error borrowing book", 500);
  }
};
