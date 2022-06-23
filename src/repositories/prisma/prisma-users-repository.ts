import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { findUserWithExistentEmail, SendToken, UpdatePassword, UserCreate, UserFind, UsersRepository } from "../interfaces/users-repository";

export class PrismaUsersRepository implements UsersRepository {

  async create({ name, email, password }:UserCreate) {
    await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });
  }

  async find({ id }: UserFind) {
    const user = await prisma.user.findUnique(
      {
        where: {
          id,
        }
      }
    )

    return user;
  }

  async findUserWithExistentEmail({ email }: findUserWithExistentEmail){
    const User = await prisma.user.findFirst(
      {
        where: {
          email,
        }
      }
    );
    return User;
  }

  async sendToken({ id, token, expiresIn}: SendToken) {
    await prisma.user.update(
      {
        where: {
          id
        },
        data: {
          passwordResetToken: token,
          passwordResetExpires: expiresIn
        }
      }
    );
  }

  async updatePassword({ id, password }: UpdatePassword) {
    await prisma.user.update(
      {
        where: {
          id
        },
        data: {
          password,
        }
      }
    )
  }

}