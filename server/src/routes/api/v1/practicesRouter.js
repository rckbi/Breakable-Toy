import express from "express";
import objection from "objection";
import { Practice } from "../../../models/index.js";
const { ValidationError } = objection;
import SetSerializer from "../../../serializers/SetSerializer.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import practiceSetsRouter from "./practiceSetsRouter.js";

const practicesRouter = new express.Router();

practicesRouter.get("/", async (req, res) => {
  try {
    const practices = await Practice.query();
    return res.status(200).json({ practices: practices });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

practicesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const practice = await Practice.query().findById(id);
    const sets = await practice.$relatedQuery("sets");
    const serializedSets = await Promise.all(
      sets.map(async (set) => await SetSerializer.getSummary(set))
    );
    meme.reviews = serializedSets;
    return res.status(200).json({ practice: practice });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

practicesRouter.post("/", async (req, res) => {
  try {
    const { body } = req;
    const data = {
      ...body,
      userId: req.user.id,
    };

    const practice = await Practice.query().insertAndFetch(data);
    return res.status(201).json({ practice });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

practicesRouter.use("/:practiceId/sets", practiceSetsRouter);

export default practicesRouter;
