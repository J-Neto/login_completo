import { Request, Response } from "express";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { RegisterService } from "../services/RegisterService";

class RegisterController {
  async handle(req:Request, res:Response) {

    const {name, email, password} = req.body;

    const prismaUsersRepository = new PrismaUsersRepository();

    const registerService = new RegisterService(prismaUsersRepository);

    const user = await registerService.execute({
      name,
      email,
      password
    })

    if (user instanceof Error) {
      return res.status(400).send(user.message);
    }

    return res.status(201).send(
      {
        message: "Registered with successful"
      }
    )
  }
}

export { RegisterController };