import jwt from "jsonwebtoken";
import { IUserControlRepository } from "../repository/protocol";
import bcrypt from "bcrypt";
import { ErrorCustom } from "../middleware/error";

export class Authenticate {
  constructor(private readonly userRepository: IUserControlRepository) {}
  async authenticate(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new ErrorCustom("Credenciais inválidas!", 401, false);

    return {
      statusCode: 200,
      success: true,
      token: jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, {
        expiresIn: "1d",
      }),
    };
  }
}