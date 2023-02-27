import express from "express";
import objection from "objection";
const { ValidationError } = objection;
import cleanUserInput from "../../../services/cleanUserInput.js";
import { Set } from "../../../models/index.js";

const practiceSetsRouter = new express.Router({ mergeParams: true });

practiceSetsRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { content } = formInput;
  const { practiceId } = req.params;
  const userId = req.user.id;

  try {
    const newSet = await Set.query().insertAndFetch({ content, practiceId, userId });
    return res.status(201).json({ practice: newSet });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default practiceSetsRouter;
