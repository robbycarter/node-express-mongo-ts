import express, { Request, Response, NextFunction } from "express";
import Movie, { IMovieBase, IPageMovie, IMovieModel, } from "../model/movies";

const router = express.Router();


router.get("/movies", async (req: Request, res: Response, next: NextFunction) => {
  try {

    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const sort = req.query.sort ? req.query.sort as string : "title";
    const select = req.query.select ? req.query.select as string : "";

    const movies = await Movie.paginate({}, { page, limit, sort, select });
    res.send(movies);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/movies/title", async (req: Request, res: Response, next: NextFunction) => {

  if (!req.query.title) {
    return res.status(400).send({ message: "title is required in query" });
  }

  try {
    const movies = await Movie.find().byTitle(req.query.title.toString()).limit(20);
    res.send(movies);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/movies/year", async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.year) {
    return res.status(400).send({ message: "year is required in query" });
  }

  try {
    const movies = await Movie.find().byYear(parseInt(req.query.year.toString())).limit(20);
    res.send(movies);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export { router as movieRouter };