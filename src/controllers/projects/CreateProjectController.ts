import { Request, Response } from "express";
import { PrismaProjectsRepository } from "../../repositories/prisma/prisma-projects-repository";
import { CreateProjectService } from "../../services/projects/CreateProjectService";

class CreateProjectController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { title, description, userId, tasks } = req.body;

    // Repositório do modelo Project do Prisma
    const prismaProjectsRepository = new PrismaProjectsRepository();

    // Service da Project
    const createProjectService = new CreateProjectService(prismaProjectsRepository);

    // Executando o service
    await createProjectService.execute({
      title, 
      description, 
      userId,
      tasks
    })

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Project criada com sucesso!",
      }
    );
  }
}

export { CreateProjectController };