const db_knex = require("../database/knex");
import { Request, Response } from "express";

export class CommentsController {
  async create(req: Request, res: Response) {
    const { post_id, user_id } = req.query;
    const { name } = req.body;

    await db_knex("comments").insert({
      post_id,
      user_id,
      name,
    });

    return res.json({ message: "Comentario criado" });
  }

  async show(req: Request, res: Response) {
    const comments = await db_knex("comments");

    return res.json(comments);
  }
}
