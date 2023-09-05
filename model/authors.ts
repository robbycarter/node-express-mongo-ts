import { prop, getModelForClass, modelOptions, ReturnModelType, DocumentType, pre, post, Ref } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
import { BookModel,Book } from './books';

//Pre hooks
@pre<Author>('save', function() {
  this.name = this.name.toLowerCase();
  this.country = this.country.toLowerCase();
})

//Post hooks
@post<Author>('save', function() {
  console.log('Author saved successfully');
})

@modelOptions({ schemaOptions:{timestamps: true} })
class Author {
  @prop({ required: true, type: String })
  name: string;

  @prop({ required: true, type: String })
  country: string;

  @prop({ ref: 'Book', type: () => mongoose.Types.ObjectId })
  books?: Ref<Book>[];

  @prop({ default: true, type: Boolean })
  isActive?: boolean;

  @prop({ type: () => Boolean, default: false })
  isDeleted?: boolean;

  @prop({ type: () => Date, default: Date.now })
  dateDeleted?: Date;

  //Virtuals
  public get bookCode(): string {
    return `B${this.name.toString()}-${this.country.toString()}`
  }

  public set bookCode(code: string) {
    this.bookCode = code;
  }

  // Statics
  public static async findByCountry(this: ReturnModelType<typeof Author>, country: string) {
    return await this.find({ country });    
  }

  // Methods
  public async findBooks(this: DocumentType<Author>) {
    return await BookModel.find({ author: this._id });
  }

}

const AuthorModel = getModelForClass(Author);
export { Author, AuthorModel };