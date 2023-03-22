const knex = require("../database/knex");
import { Request, Response } from "express";

import { CreatePostsType, CommentsType, GetPostsType } from "../models/@types";

export class PostsController {
  async create(req: Request, res: Response) {
    const { title, description, image }: CreatePostsType = req.body;
    const { user_id } = req.params;

    const [post_id]: number[] = await knex("posts").insert({
      //retornando o ID do post
      title,
      description,
      image,
      user_id,
    });

    res.json({ message: "Post Criado", post_id });
  }

  async show(req: Request, res: Response) {
    const posts: GetPostsType[] = await knex("posts");

    const comments: CommentsType[] = await knex("comments");

    //Aqui estamos fazendo um map na array dos posts e dentro fazemos um commentFilter que verifica que se algum post que ele
    //buscou na const comments tiver o post_id igual ao algum ID dentro de algum post, então adiciona o comment relacionado a esse post
    //e no final ele retorna os posts com ...post para tirar da array e a const comments recebe o conteudo dos comentarios filtrados
    const allPostsComments = posts.map((post) => {
      const commentFilter = comments.filter(
        (comment) => comment.post_id === post.id
      );

      return {
        ...post,
        comments: commentFilter,
      };
    });
    return res.json(allPostsComments);
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;

    await knex("posts").where({ id }).del();

    return res.json({ message: "Post removido" });
  }

  async index(req: Request, res: Response) {
    const { id } = req.query;

    const posts: GetPostsType[] = await knex("posts").where({ id });
    const comments: CommentsType[] = await knex("comments").where(
      "post_id",
      id
    );

    const postsWithComments = posts.map((post) => {
      const postComments = comments.filter(
        (comment) => comment.post_id === post.id
      );

      return {
        ...post,
        comments: postComments,
      };
    });

    return res.json(postsWithComments);
  }
}
