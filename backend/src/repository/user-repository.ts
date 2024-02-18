import { IUserCreate } from "../models/user";
import { IUserControlRepository } from "./protocol";
import { myDataSource } from "../config/database/data-source";
import { User } from "../entity/User";

class UserControlRepository implements IUserControlRepository {
  async createUser(user: IUserCreate) {
    const createdUser = myDataSource.getRepository(User).create(user);
    return createdUser;
  }

  async getUserById(id: number) {
    const user = await myDataSource.getRepository(User).findOneBy({ id });
    return user;
  }
  
  async getUserByEmail(email: string) {
    const user = await myDataSource.getRepository(User).findOneBy({ email });
    return user;
  }
  //
  //async deleteUserById(id: number) {
  //  await prisma.user.delete({ where: { id } });
  //  return;
  //}
  //
  //async updateUser(id: number, user: IUser) {
  //  await prisma.user.update({ where: { id }, data: user });
  //  return;
  //}
  //
  async updateBalance(id: number, amount: number) {
    await myDataSource.getRepository(User).update(id, {
      currentBalance: amount
    });
    return;
  }
}

export const userControlRepository = new UserControlRepository();
