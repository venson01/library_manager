import mongoose, { Mongoose, Schema } from 'mongoose';

// Define the Borrow interface
export interface IBorrow extends Document{
    borrowerId: mongoose.Types.ObjectId;
    bookId: mongoose.Types.ObjectId;
    borrowerName: string;
    status: string;
    borrowedAt: Date;
    returnedAt: Date;

}
// Define status enum
export enum BorrowStatusEnum {
    BORROWED = 'borrowed',
    RETURNED = 'returned'
}

// Define the Borrow schema
const BorrowSchema = new mongoose.Schema(
    {
        borrowerId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
        bookId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Book' },
        borrowerName: { type: String, required: true, minLength: 2},
        status: { type: String, enum: BorrowStatusEnum, default: BorrowStatusEnum.BORROWED },
        borrowedAt: { type: Date, default: Date.now },
        returnedAt: { type: Date }
    },
)
// Create and export the Borrow model
export const Borrow = mongoose.model<IBorrow>("Borrow", BorrowSchema);