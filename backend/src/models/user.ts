import { Decimal } from "@prisma/client/runtime/library";

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    currentBalance: Decimal;
}