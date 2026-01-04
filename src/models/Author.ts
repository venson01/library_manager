import mongoose, { Mongoose, Schema } from 'mongoose';

// Define the Author interface
export interface IAuthor extends Document {
    name: string;
    birthYear: number;
    country: string;
}

// Define the Author schema
const AuthorSchema = new Schema<IAuthor>(
    {
        name: { type: String, required: true, minLength: 3, maxlength: 100 },
        birthYear: { type: Number, required: true },
        country: { type: String, required: true, minLength: 2, maxLength: 100 }
    },
    { timestamps: true }
)

// Create and export the Author model
export const Author = mongoose.model<IAuthor>('Author', AuthorSchema);