import { ICreateRecord, IFinancialControl } from "../models/financial-control";
import { IUser, IUserCreate } from "../models/user";
import { DeleteResult, UpdateResult } from "typeorm";

export interface IUserControlRepository {
  createUser: (user: IUserCreate) => Promise<IUser | null>;
  getUserById: (userId: number) => Promise<IUser | null>;
  getUserByEmail: (email: string) => Promise<IUser | null>;
  //deleteUserById: (userId: number) => Promise<void>;
  //updateUser: (userId: number, user: IUser) => Promise<void>;
  updateBalance: (userId: number, amount: number) => Promise<void>;
}

export interface IFinancialControlRepository {
  listAllRecordsByUserId: (userId: number) => Promise<IFinancialControl[]>;
  listRecordById: (id: number) => Promise<IFinancialControl | null>;
  createRecord: (record: ICreateRecord) => Promise<IFinancialControl>;
  updateRecord: (
    id: number,
    updatedRecord: IFinancialControl
  ) => Promise<UpdateResult>;
  deleteRecord: (id: number) => Promise<DeleteResult>;
}
