import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { ProjectCreateData, ProjectsRepository, ProjectFind, ProjectDelete, ProjectUpdate } from "../interfaces/projects-repository";

export class PrismaProjectsRepository implements ProjectsRepository {

  async create( { title, description, userId, tasks }: ProjectCreateData ) {
    await prisma.project.create({
      data: {
        title,
        description,
        userId,
        tasks,
      }
    })
  };

  async get() {
    const Projects = await prisma.project.findMany();
    return Projects;
  }

  async find({ id }: ProjectFind) {
    const Project = await prisma.project.findUnique(
      {
        where: {
          id
        }
      }
    );
    return Project;
  }

  async delete({ id }: ProjectDelete) {
    await prisma.project.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, title, description, userId }: ProjectUpdate) {
    await prisma.project.update({
      where: {
        id
      },
      data: {
        title,
        description,
        userId
      }
    })
  };
}