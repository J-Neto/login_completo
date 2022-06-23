import { UsersRepository } from "../repositories/interfaces/users-repository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"

const authConfig = require("../config/auth")

interface AuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateService {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  async execute(request: AuthenticateRequest) {

    const { email, password } = request;

    if (!email || !password) {
      return new Error ("Authentication failed");
    }

    const user = await this.usersRepository.findUserWithExistentEmail({email})

    if (!user) {
      return new Error("User not found")
    }

    // If password inserted is equal to user password
    if (!await compare(password, Object(user).password)) {
      return new Error("invalid email/password")
    }

    const token = sign(
      {email: Object(user).email},
      authConfig.secret,
      {
        subject: Object(user).id,
        expiresIn: 86400
      }
    )
    return token;
  }
}
