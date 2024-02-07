import { IUser } from "../models/user";
import { prisma } from "./db";
import { IUserControlRepository } from "./protocol";

class UserControlRepository implements IUserControlRepository {
    async createUser(user: IUser) {
        try {
            const createdUser = await prisma.user.create({ data: user });
            return createdUser;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao criar usuário.');
        }
    }

    async getUserById(id: number) {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            return user;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao buscar usuário por ID.');
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            return user;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao buscar usuário por ID.');
        }
    }

    async deleteUserById(id: number) {
        try {
            await prisma.user.delete({ where: { id } });
            return
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao excluir usuário por ID.');
        }
    }

    async updateUser(id: number, user: IUser) {
        try {
            await prisma.user.update({ where: { id }, data: user });
            return;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao atualizar usuário por ID.');
        }
    }

    async updateBalance(id: number, amount: number) {
        try {
            await prisma.user.update({ where: { id }, data: { currentBalance: amount } });
            return;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao atualizar usuário por ID.');
        }
    }
}

export const userControlRepository = new UserControlRepository()