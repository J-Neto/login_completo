import { hash } from "bcryptjs";
import { UsersRepository } from "../repositories/interfaces/users-repository";

interface ResetPasswordRequest {
  email: string;
  token: string;
  password: string;
}

export class ResetPasswordService {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  async execute(request: ResetPasswordRequest) {

    const { email, token, password } = request;

    const user = await this.usersRepository.findUserWithExistentEmail({email});

    if (!user) {
      return new Error("User not found");
    }

    if (token !== Object(user).passwordResetToken) {
      return new Error("Token invalid");
    }

    const now = new Date();

    if (now > Object(user).passwordResetExpires) {
      return new Error("Token expired, generate a new one");
    }

    const passwordHash = await hash(password, 8);

    return await this.usersRepository.updatePassword({id: Object(user).id, password: passwordHash})
  }
}