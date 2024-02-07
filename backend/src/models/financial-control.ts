import { Decimal } from "@prisma/client/runtime/library";

export interface IFinancialControl {
    id: number;
    userId: number;
    description: string;
    transactionType: string;
    value: Decimal;
    date: string;
    category: string;
}

export interface ICreateRecord {
    userId: number;
    description: string;
    transactionType: string;
    value: Decimal;
    date: string;
    category: string;
}