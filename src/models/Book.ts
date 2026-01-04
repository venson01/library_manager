import mongoose, { Mongoose, Schema } from 'mongoose';

// Define the Book interface
export interface IBook extends Document {
    title: string;
    publishedYear: number;
    totalCopies: number;
    availableCopies: number;
    isbn: number;
    authorId: mongoose.Types.ObjectId;
    status: string;
}

// Define status enum
export enum StatusEnum {
    AVAILABLE = 'available',
    UNAVAILABLE = 'unavailable',
    BORROWED = 'borrowed'
}

// Define the Book Schema
const BookSchema = new Schema<IBook>(
    {
        title: { type: String, required: true, minLength: 2, maxLength: 200 },
        publishedYear: { type: Number, required: true },
        totalCopies: { type: Number, required: true, min: 0 },
        availableCopies: { type: Number, required: true, min: 0 },
        isbn: { type: Number, required: true },
        authorId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Author', required: true },
        status: { type: String, enum: StatusEnum, default: StatusEnum.AVAILABLE },
    },
    { timestamps: true }
)

// Create and export the Book model
export const Book = mongoose.model<IBook>('Book', BookSchema);