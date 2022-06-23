import { hash } from "bcryptjs";
import { UsersRepository } from "../repositories/interfaces/users-repository";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  async execute(request:RegisterRequest) {

    const { name, email, password} = request;

    if (!name || !email || !password) {
      return new Error("Registration failed")
    }

    if (await this.usersRepository.findUserWithExistentEmail({email})) {
      return new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name, 
      email,
      password: passwordHash
    })
  }
}