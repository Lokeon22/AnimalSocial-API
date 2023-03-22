const knex = require("../database/knex");
import { Request, Response } from "express";
import { CreateUserTypes, UpdateUserTypes } from "../models/@types";
import { AppError } from "../utils/AppError";

const { hash, compare } = require("bcrypt");

export class UsersController {
  async create(req: Request, res: Response) {
    const { name, email, password }: CreateUserTypes = req.body;

    if (!name || !email || !password) {
      throw new AppError("Preencha todos os campos");
    }

    const emailExists = await knex("users").where({ email }).first();

    if (emailExists) {
      throw new AppError("Email já cadastrado");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({ name, email, password: hashedPassword });

    return res.json({ message: "Usuario cadastrado com sucesso!" });
  }

  async update(req: Request, res: Response) {
    const { name, email, password, old_password }: UpdateUserTypes = req.body;
    const { id } = req.params;

    const user: UpdateUserTypes = await knex("users").where({ id }).first(); //Usamos o first pois retona uma array e primeiro ja pega o primeiro objeto

    if (!user) {
      throw new AppError("Usuario não encontrado");
    }

    const verifyEmail: UpdateUserTypes = await knex("users")
      .where({ email })
      .first();

    if (verifyEmail && verifyEmail.id !== user.id) {
      throw new AppError("Não possui permissão");
    }

    if ((password && !old_password) || (!password && old_password)) {
      throw new AppError("Informe a senha");
    }

    if (password && old_password) {
      const checkPassword = await compare(old_password, user.password);

      if (!checkPassword) {
        throw new AppError("Senha incorreta");
      }

      user.password = await hash(password, 8); // Atualizando a senha do usuario já criptgrafada
    }

    await knex("users")
      .update({
        name: name ?? user.name,
        email: email ?? user.email,
        password: user.password,
      })
      .where({ id });

    return res.json({ message: "Perfil atualizado" });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await knex("users").where({ id });

    return res.json(user);
  }
}
