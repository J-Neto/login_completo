import { Request, Response } from "express";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "../services/AuthenticateService";

class AuthenticateController {
  async handle(req:Request, res:Response) {

    const { email, password } = req.body;

    const prismaUsersRepository = new PrismaUsersRepository();

    const authenticateService = new AuthenticateService(prismaUsersRepository);

    const user = await authenticateService.execute({
      email,
      password
    })

    if (user instanceof Error) {
      return res.status(400).send(user.message);
    }

    return res.status(200).send(
      {
        data: user
      }
    )

  }
}

export { AuthenticateController };