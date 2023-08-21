import express, { Request, Response, NextFunction } from "express";
import { Author, AuthorModel } from "../model/authors";

const router = express.Router();

router.get("/authors", async (req: Request, res: Response, next: NextFunction) => {
  try {

    const authors = await AuthorModel.find();

    return res.send(authors);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/authors", async (req: Request, res: Response, next: NextFunction) => {
  try {

    const author = new AuthorModel(req.body);
    const result = await author.save();

    return res.send(result);

  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/authors/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {

    const author = await AuthorModel.findById(req.params.id).populate("books");

    return res.send(author);
  } catch (err) {
    return res.status(500).send(err);
  }
});

export { router as authorRouter };