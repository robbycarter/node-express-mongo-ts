import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
import { Author } from './authors';

class Book {
    @prop({ required: true, type: () => String })
    public title: string;

    @prop({ ref: 'Author', type: () => mongoose.Types.ObjectId})
    public author: Author;

    @prop({required: true, type: Number})
    public year: number;
}

const BookModel = getModelForClass(Book);
export { Book, BookModel };