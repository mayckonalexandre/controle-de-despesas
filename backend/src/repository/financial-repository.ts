import { ICreateRecord, IFinancialControl } from "../models/financial-control";
import { prisma } from "./db";
import { IFinancialControlRepository } from "./protocol";

class FinancialRepository implements IFinancialControlRepository {
    async listAllRecordsByUserId(userId: number) {
        try {
            const records = await prisma.financialControl.findMany({ where: { userId } })
            return records
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao listar registros. ${userId}`);
        }
    }

    async listRecordById(id: number) {
        try {
            const record = await prisma.financialControl.findUnique({ where: { id } })
            return record
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao lista registro. ${id}`);
        }
    }

    async createRecord(record: ICreateRecord) {
        try {
            const createRecord = await prisma.financialControl.create({
                data: {
                    userId: record.userId,
                    description: record.description,
                    transactionType: record.transactionType,
                    value: record.value,
                    date: record.date,
                    category: record.category

                }
            })
            return createRecord
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao criar registro. ${record}`);
        }
    }

    async updateRecord(id: number, updatedRecord: IFinancialControl) {
        try {
            const updateRecord = await prisma.financialControl.update({ where: { id }, data: updatedRecord })
            return updateRecord
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao atualizar registro. ${id}`);
        }
    }

    async deleteRecord(id: number) {
        try {
            const updateRecord = await prisma.financialControl.delete({ where: { id } })
            return updateRecord
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao deletar registro. ${id}`);
        }
    }
}

export const financialRepository = new FinancialRepository()