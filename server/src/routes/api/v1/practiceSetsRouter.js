import express from "express";
import objection from "objection";
const { ValidationError } = objection;
import { Set } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";

const practiceSetsRouter = new express.Router();

practiceSetsRouter.delete("/:id", async (req, res) => {
  try {
    const setId = req.params.id;
    await Set.query().deleteById(setId);
    res.status(204).json({ message: "Set successfully deleted" });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

practiceSetsRouter.patch("/:id", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { content } = formInput;
  const setId = req.params.id;

  try {
    const editedSet = await Set.query().patchAndFetchById(setId, { content });
    return res.status(200).json({ set: editedSet });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default practiceSetsRouter;
