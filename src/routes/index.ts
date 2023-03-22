import { Router } from "express";

const routes = Router();

const usersRoutes = require("../routes/user.routes");
const postsRoutes = require("../routes/posts.routes");
const commentsRoutes = require("../routes/comments.routes");

routes.use("/", usersRoutes);
routes.use("/", postsRoutes);
routes.use("/", commentsRoutes);

module.exports = routes;
