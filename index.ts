import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import mongoose from 'mongoose';


mongoose.connect(process.env['DB_URL']!, {})
mongoose.connection.on('connected', () => { console.log('Connected to MongoDB') })
mongoose.connection.on('error', (err) => { console.log(err) })

// Routers
import { userRouter } from './routes/users';
import { movieRouter } from './routes/movies';
import { authorRouter } from './routes/authors';
import { bookRouter } from './routes/books';
const catchAll = require('./routes/catchAll');

const app = express();
app.use(express.json({ limit: '50mb', type: 'application/json', }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000, }));
app.use(userRouter);
app.use(movieRouter);
app.use(authorRouter);
app.use(bookRouter);
app.use(catchAll)

const port = process.env['port'] || 3000;
app.listen(port, () => {
  console.log(`Server Running on port ${port}!`);
});