import { NextFunction, Request, Response } from "express";
import { createAuthorService, deleteAuthorByIdService, getAuthorByIdService, getAuthorsService, updateAuthorService } from "../services/author";


// Controller to handle creating a new author
export const createAuthor = async (req: Request, res: Response) => {
    const payload = req.body;

    // Logic to create an author using the payload
    const resp = await createAuthorService(payload);
    return res.success("Author created successfully", resp, 201);
}

// Controller to handle getting all authors
export const getAuthors = async (req: Request, res: Response) => {
    
    const authors = await getAuthorsService();

    return res.success("Authors retrieved successfully", authors, 200);
}

// Controller to handle getting an author by ID
export const getAuthorById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "Author ID is required"
        });
    }

    const author = await getAuthorByIdService(id);

    return res.success("Author retrieved successfully", author, 200);
};

// Controller to handle updating an author by ID
export const updateAuthor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

     if (!id) {
        return res.status(400).json({
            message: "Author ID is required"
        });
    }

    const author = await updateAuthorService(id, payload);  
    return res.success("Author updated successfully", author, 200);
}

// Controller to handle deleting an author by ID
export const deleteAuthor = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "Author ID is required"
        });
    }

    await deleteAuthorByIdService(id);

    return res.success("Author deleted successfully", null, 200);
};