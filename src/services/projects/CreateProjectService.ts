import { ProjectsRepository } from "../../repositories/interfaces/projects-repository";

// Interface do createProject
interface CreateProjectRequest {
  title: string;
  description: string;
  userId?: string;
  tasks: Object;
}

// Service
export class CreateProjectService {
  
  // Recebendo o repositório da Project no construtor
  constructor(
    private ProjectsRepository: ProjectsRepository,
  ) {}

  // Executando o service
  async execute(request: CreateProjectRequest) {
    
    // Dados do service
    const { title, description, userId, tasks } = request;

    console.log(title, description, userId, tasks)

    // Criando a Project ...
    const project = await this.ProjectsRepository.create({
      title, 
      description, 
      userId,
      tasks,
    })

    return project;
  }
}