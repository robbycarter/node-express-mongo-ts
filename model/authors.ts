import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

@modelOptions({ schemaOptions:{timestamps: true} })
class Author {
  @prop({ required: true, type: String })
  name: string;

  @prop({ required: true, type: String })
  country: string;

  @prop({ ref: 'Book', type: () => mongoose.Types.ObjectId })
  books?: mongoose.Types.ObjectId[];

  @prop({ default: true, type: Boolean })
  isActive?: boolean;
}

const AuthorModel = getModelForClass(Author);
export { Author, AuthorModel };