import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { TaskCreateData, TasksRepository, TaskFind, TaskDelete, TaskUpdate } from "../interfaces/tasks-repository";

export class PrismaTaskRepository implements TasksRepository {

  async create( { title, completed, userId, projectId }: TaskCreateData ) {
    await prisma.task.create({
      data: {
        title,
        completed,
        userId,
        projectId,
      }
    })
  };

  async get() {
    const Task = await prisma.task.findMany();
    return Task;
  }

  async find({ id }: TaskFind) {
    const Task = await prisma.task.findUnique(
      {
        where: {
          id
        }
      }
    );
    return Task;
  }

  async delete({ id }: TaskDelete) {
    await prisma.task.delete({
      where: {
        id,
      }
    });
  }

  async update({ id, title, completed, userId, projectId }: TaskUpdate) {
    await prisma.task.update({
      where: {
        id
      },
      data: {
        title,
        completed,
        userId,
        projectId,
      }
    })
  };
}