import express, { Request, Response, NextFunction } from "express";
import User, { IUser, IUserModel } from "../model/user";

const router = express.Router();

router.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.createWithFullName(
      req.body.fullName,
      req.body.email,
      req.body.password
    );
    res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export { router as userRouter };