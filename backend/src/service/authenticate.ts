import jwt from 'jsonwebtoken';
import { IUserControlRepository } from '../repository/protocol';
import bcrypt from 'bcrypt';

export class Authenticate {
    constructor(private readonly userRepository: IUserControlRepository) { };
    async authenticate(email: string, password: string) {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            if (!user) return { statusCode: 404, success: false, message: 'Usuário não cadastrado!' };
            if (!await bcrypt.compare(password, user.password)) return { statusCode: 401, success: false, message: 'Credenciais inválidas!' };
            return { statusCode: 200, success: true, token: jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, { expiresIn: '1d' }) }
        } catch (error) {
            console.log('Erro ao autenticar o usuário: ', error)
            return { statusCode: 500, success: false, message: "Ocorreu um erro ao processar a solicitação." };
        }
    }
}