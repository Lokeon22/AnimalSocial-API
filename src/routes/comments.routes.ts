const Router = require("express");
import { CommentsController } from "../controller/CommentsController";

const CommentsRoutes = Router();

const commentsController = new CommentsController();

CommentsRoutes.post("/comment", commentsController.create);
CommentsRoutes.get("/comments", commentsController.show);

module.exports = CommentsRoutes;
