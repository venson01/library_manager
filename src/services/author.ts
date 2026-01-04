import { IAuthor, Author } from "../models/Author";
import { AppError } from "../utils/appError";


// Service to create a new author
export const createAuthorService = async (payload: IAuthor) => {
    const {name, birthYear, country} = payload;

    const existingAuthor = await Author.findOne({ name });

    
    if (existingAuthor) {
    throw new AppError("Author already exists", 400);
    }

    const author = await Author.create({...payload});

    return author;

}

// Service to get all authors
export const getAuthorsService = async () => {
    const authors = await Author.find();
    return authors;
}

// Service to get an author by ID
export const getAuthorByIdService = async (id: string) => {
    const author = await Author.findById(id);

    if  (!author) {
        throw new AppError("Author not found", 404);
    }
    return author;
}

// service to update an author by ID
export const updateAuthorService = async (id: String, payload: Partial<IAuthor>) => {
    const author = await Author.findByIdAndUpdate(id, payload, {new: true});

    if (!author) {
        throw new AppError("Author not found", 404);
    }
    return author;
}

// service to delete an author by ID
export const deleteAuthorByIdService = async (id: string) => {
    if (!id) {
        throw new AppError("Author ID is required", 400);
    }

    const deletedAuthor = await Author.findByIdAndDelete(id);

    if (!deletedAuthor) {
        throw new AppError("Author not found", 404);
    }

    return deletedAuthor;
};