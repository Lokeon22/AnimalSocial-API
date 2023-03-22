import { Router } from "express";
import { PostsController } from "../controller/PostsController";

const PostsRoutes = Router();

const postsController = new PostsController();

PostsRoutes.get("/post", postsController.index);
PostsRoutes.post("/post/:user_id", postsController.create);
PostsRoutes.get("/posts", postsController.show);
PostsRoutes.delete("/post/:id", postsController.remove);

module.exports = PostsRoutes;
