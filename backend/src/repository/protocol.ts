import { ICreateRecord, IFinancialControl } from "../models/financial-control";
import { IUser } from "../models/user";

export interface IUserControlRepository {
    createUser: (user: IUser) => Promise<IUser | null>;
    getUserById: (userId: number) => Promise<IUser | null>;
    getUserByEmail: (email: string) => Promise<IUser | null>;
    deleteUserById: (userId: number) => Promise<void>;
    updateUser: (userId: number, user: IUser) => Promise<void>;
    updateBalance: (userId: number, amount: number) => Promise<void>;
}

export interface IFinancialControlRepository {
    listAllRecordsByUserId: (userId: number) => Promise<IFinancialControl[]>;
    listRecordById: (id: number) => Promise<IFinancialControl | null>
    createRecord: (record: ICreateRecord) => Promise<IFinancialControl>;
    updateRecord: (id: number, updatedRecord: IFinancialControl) => Promise<IFinancialControl>;
    deleteRecord: (id: number) => Promise<IFinancialControl>;
}