import { Request, Response } from "express";
import { ResetPasswordService } from "../services/ResetPasswordService";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";

class ResetPasswordController {
  async handle(req:Request, res:Response) {

    const { email, token, password } = req.body;

    console.log(email, token, password)

    const prismaUsersRepository = new PrismaUsersRepository();

    const resetPasswordService = new ResetPasswordService(prismaUsersRepository);

    const reset = await resetPasswordService.execute({ email, token, password });

    if (reset instanceof Error) {
      return res.status(400).send(reset.message);
    }

    return res.status(200).send({
      message: "Password reseted successful"
    })
  }
}

export { ResetPasswordController };