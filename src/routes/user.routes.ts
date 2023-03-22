import { Router } from "express";
import { UsersController } from "../controller/UsersController";

const UsersRoutes = Router();

const usersController = new UsersController();

UsersRoutes.post("/create", usersController.create);
UsersRoutes.put("/profile/:id", usersController.update);
UsersRoutes.get("/user/:id", usersController.show);

module.exports = UsersRoutes;
