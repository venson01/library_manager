import { IBook, Book } from "../models/Book";
import { IAuthor, Author } from "../models/Author";
import { AppError } from "../utils/appError";

// Service to create a new book
export const createBookService = async (payload: IBook) => {
    const { title, publishedYear, totalCopies, availableCopies, isbn, authorId, status } = payload;

    const existingBook = await Book.findOne({ isbn });

    if (existingBook) {
        throw new AppError(`Book with ISBN: ${isbn} already exist`, 400);
    }

    const authorExists = await Author.findById(authorId);
    if (!authorExists) {
        throw new AppError(`Author with ID: ${authorId} does not exist`, 404);
    }

    const book = await Book.create({...payload});

    return book;
}

// Service to get all books
export const getBooksService = async () => {
    const books = await Book.find().populate("authorId", "name birthYear country").exec();

    return books;
};

// Service to get a book by name
export const getBookByNameService = async (name: string) => {
   

    const book = await Book.find({
        title: { $regex: name, $options: "i" },
    }).populate("authorId", "name birthYear country").exec();

    if (!book) {
        throw new AppError("Book not found", 404);
    }

    return book;
}

// Service to get a book by ID
export const getBookByIdService = async (id: string) => {
    const book = await Book.findById(id).populate("authorId", "name birthYear country").exec();

    if (!book) {
        throw new AppError("Book not found", 404);
    }

    return book;
}

// Service to update a book by ID
export const updateBookByIdService = async (id: string, payload: Partial<IBook>) => {
    const book = await Book.findByIdAndUpdate(id, payload, {new: true});

    if (!book) {
        throw new AppError("Book not found", 404);
    }

    return book;
}

// Service to delete a book by ID
export const deleteBookByIdService = async (id: string) => {
    if (!id) {
        throw new AppError("Book ID is required", 400);
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
        throw new AppError("Book not found", 404);
    }

    return deletedBook;
}