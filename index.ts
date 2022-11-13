import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';

// Routers
import { userRouter } from './routes/users';
import { movieRouter } from './routes/movies';


const app = express();
app.use(json());
app.use(userRouter);
app.use(movieRouter);

mongoose.connect(
  process.env.DB_URL as string,
  {}, () => {
    console.log('Connected to MongoDB');
  }
)

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});