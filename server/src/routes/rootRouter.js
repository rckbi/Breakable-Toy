import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import practicesRouter from "./api/v1/practicesRouter.js";
import practiceSetsRouter from "./api/v1/practiceSetsRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/practices", practicesRouter);
rootRouter.use("/api/v1/sets", practiceSetsRouter);

export default rootRouter;
