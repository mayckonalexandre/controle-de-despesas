import { IUser } from "../models/user";
import { prisma } from "../config/db";
import { IUserControlRepository } from "./protocol";

class UserControlRepository implements IUserControlRepository {
  async createUser(user: IUser) {
    const createdUser = await prisma.user.create({ data: user });
    return createdUser;
  }

  async getUserById(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async deleteUserById(id: number) {
    await prisma.user.delete({ where: { id } });
    return;
  }

  async updateUser(id: number, user: IUser) {
    await prisma.user.update({ where: { id }, data: user });
    return;
  }

  async updateBalance(id: number, amount: number) {
    await prisma.user.update({
      where: { id },
      data: { currentBalance: amount },
    });
    return;
  }
}

export const userControlRepository = new UserControlRepository();
