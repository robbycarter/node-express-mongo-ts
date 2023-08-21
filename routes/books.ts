import express, { Request, Response, NextFunction } from "express";
import { Author, AuthorModel } from "../model/authors"
import { Book, BookModel } from "../model/books";

const router = express.Router();

router.get("/books", async (req: Request, res: Response, next: NextFunction) => {
  try {

    const books = await BookModel.find().populate("author");

    books.forEach((book) => {
      book.author.isActive = true
    });

    return res.send(books);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/books", async (req: Request, res: Response, next: NextFunction) => {
  try {

    const {author, title, year} = req.body;

    //check if author exists
    const authorExists = await AuthorModel.findById(author);
    if (!authorExists) {
      return res.status(400).send({message: "Author not found"});
    }

    // checkl if book exists
    const bookExists = await BookModel.findOne({title, author});
    if (bookExists) {
      return res.status(400).send({message: "Book already exists"});
    }

    const book = new BookModel(req.body);
    const result = await book.save();

    // add book to author
    authorExists.books.push(book._id);
    await authorExists.save();

    return res.send(result);

  } catch (err) {
    return res.status(500).send(err);
  }
});

export { router as bookRouter };