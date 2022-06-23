import { Request, Response } from "express";
import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { ForgotPasswordService } from "../services/ForgotPasswordService";

class ForgotPasswordController {
  async handle(req:Request, res:Response) {

    const { email } = req.body;

    const prismaUsersRepository = new PrismaUsersRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const forgotPasswordService = new ForgotPasswordService(prismaUsersRepository, nodemailerMailAdapter);

    const send = await forgotPasswordService.execute({email});

    if (send instanceof Error) {
      return res.status(400).send({ error: "Error on forgot password, try again"});
    }
    
    return res.status(200).send({
      message: "Token sent"
    });
  }
}

export { ForgotPasswordController };