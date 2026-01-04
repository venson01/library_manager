import { borrowBookService } from "../services/borrow";
import { NextFunction, Request, Response } from "express";

// Controller to handle borrowing a book
export const borrowBook = async (req: Request, res: Response) => {
  const borrow = await borrowBookService(req, res);

  // Log the borrowing action
  const userName = (req.user as any)?.name ?? "unknown";
  console.log("Borrow book request received from user:", userName);

  // Return success response
  return res.success("Book borrowed successfully", borrow, 201);
};
