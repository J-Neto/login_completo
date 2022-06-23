import { randomBytes} from "crypto";
import { MailAdapter } from "../adapters/mail-adapter";
import { UsersRepository } from "../repositories/interfaces/users-repository";

interface ForgotPasswordRequest {
  email: string;
}

export class ForgotPasswordService {
  constructor(
    private usersRepository: UsersRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request:ForgotPasswordRequest) {

    const { email } = request;

    const user = await this.usersRepository.findUserWithExistentEmail({email});

    if (!user) {
      return new Error("User not found");
    }

    const token = randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await this.usersRepository.sendToken({ id: Object(user).id, token, expiresIn:now })

    try {
      await this.mailAdapter.sendMail({
        subject: "Novo feedback",
        body: [
          `<div style="font-family: sans-serif; font-size: 16px; color: #111";>`,
          // `<p>Tipo do feedback: ${type}</p>`,
          // `<p>Token: ${comment}</p>`,
          `<p>Você esqueceu sua senha? Não tem problema, utilize esse token: ${token}</p>`,
          `</div>`,
        ].join('\n'),
        email: email
      });
    } catch (err) {
      return new Error("Cannot send forgot password email");
    }
    
  }
}