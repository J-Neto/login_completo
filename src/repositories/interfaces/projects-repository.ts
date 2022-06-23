import { Task } from "@prisma/client";

export interface ProjectCreateData {
  title: string;
  description: string;
  userId?: string;
  tasks: Object;
}

export interface ProjectFind {
  id: string;
}

export interface ProjectDelete {
  id: string;
}

export interface ProjectUpdate {
  id: string;
  title: string;
  description: string;
  userId?: string;
  tasks: [Object];
}

export interface ProjectsRepository {
  create: (data: ProjectCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: ProjectFind) => Promise<Object | null>;
  delete: (data: ProjectDelete) => Promise<void>;
  update: (data: ProjectUpdate) => Promise<void>;
}