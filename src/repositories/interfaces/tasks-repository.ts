export interface TaskCreateData {
  title: string;
  completed: boolean;
  userId: string;
  projectId: string;
}

export interface TaskFind {
  id: string;
}

export interface TaskDelete {
  id: string;
}

export interface TaskUpdate {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  projectId: string;
}

export interface TasksRepository {
  create: (data: TaskCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: TaskFind) => Promise<Object | null>;
  delete: (data: TaskDelete) => Promise<void>;
  update: (data: TaskUpdate) => Promise<void>;
}