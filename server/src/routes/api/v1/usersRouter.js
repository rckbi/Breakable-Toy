import express from "express";
import passport from "passport";
import objection from "objection";
const { ValidationError } = objection;

import { User } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const formInput = cleanUserInput(req.body);
  const { userName, email, password, passwordConfirmation } = formInput;

  try {
    const persistedUser = await User.query().insertAndFetch({ userName, email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.query().findById(id);
    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default usersRouter;
