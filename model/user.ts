import { model, Schema, Types, Model, Document, Query, HydratedDocument } from 'mongoose';

// User Type
export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// User Interface methods
interface IUserMethods {
  getFullName(): string;
}

// User Model interfeace with static extends methods
export interface IUserModel extends Model<IUser, {}, IUserMethods> {
  createWithFullName(fullName: string, email: string, password: string): Promise<HydratedDocument<IUser, IUserMethods>>;
}

// define User Schema with methods
const schema = new Schema<IUser, IUserModel, IUserMethods>({
  first_name: {
    type: String,
    required: true,
    index: true
  },
  last_name: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  password: {
    type: String,
    required: true
  }
});

// Schema statics
schema.statics.createWithFullName = function (fullName: string, email: string, password: string): Promise<HydratedDocument<IUser, IUserMethods>> {
  const [first_name, last_name] = fullName.split(' ');
  return this.create({ first_name, last_name, email, password });
}

// Schema methods
schema.methods.getFullName = function (): string {
  return `${this.first_name} ${this.last_name}`;
}

const User = model<IUser, IUserModel>('User', schema);

export default User;

