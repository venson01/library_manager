import { NextFunction, Request, Response } from 'express';
import { createBookService, deleteBookByIdService, getBookByIdService, getBookByNameService, getBooksService, updateBookByIdService } from '../services/book';
import { AppError } from '../utils/appError';

// Controller to handle creating a new book
export const createBook = async (req: Request, res: Response) => {
    const payload = req.body;

    const resp = await createBookService(payload);
    return res.success("Book created successfully", resp, 201);
}

// Controller to handle getting all books
export const getBooks = async (req: Request, res: Response) => {
    const books = await getBooksService();

    return res.success("Books retrieved successfully", books, 200);
}

// Controller to handle getting a book by name
export const getBookByName = async (req: Request, res: Response) => {
    const { title } = req.params;

    if (!title) {
        throw new AppError("Book title is required", 400);
    }

    const book = await getBookByNameService(title);

    res.success("Book retrieved successfully", book, 200);

}

// Controller to handle getting a book by ID
export const getBookById = async (req: Request, res: Response) => {
    const {id} = req.params;

    if (!id) {
        throw new AppError("Book ID is required", 400);
    }

    const book = await getBookByIdService(id);
    res.success("Book retrieved successfully", book, 200);
};

// Controller to handle updating a book by ID
export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    if (!id) {
        throw new AppError("Book ID required", 400);
    }

    const book = await updateBookByIdService(id, payload);
    return res.success("Book updated successfully", book, 200);
}

// Controller to handle deleting a book by ID 
export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        throw new AppError("Book ID is required", 400);
    }

    await deleteBookByIdService(id);

    return res.success("Book deleted successfully", null, 200);
}