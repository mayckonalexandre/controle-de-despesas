import { ICreateRecord, IFinancialControl } from "../models/financial-control";
import { prisma } from "../config/db";
import { IFinancialControlRepository } from "./protocol";

class FinancialRepository implements IFinancialControlRepository {
  async listAllRecordsByUserId(userId: number) {
    const records = await prisma.financialControl.findMany({
      where: { userId },
    });
    return records;
  }

  async listRecordById(id: number) {
    const record = await prisma.financialControl.findUnique({
      where: { id },
    });
    return record;
  }

  async createRecord(record: ICreateRecord) {
    const createRecord = await prisma.financialControl.create({
      data: {
        userId: record.userId,
        description: record.description,
        transactionType: record.transactionType,
        value: record.value,
        date: record.date,
        category: record.category,
      },
    });
    return createRecord;
  }

  async updateRecord(id: number, updatedRecord: IFinancialControl) {
    const updateRecord = await prisma.financialControl.update({
      where: { id },
      data: updatedRecord,
    });
    return updateRecord;
  }

  async deleteRecord(id: number) {
    const updateRecord = await prisma.financialControl.delete({
      where: { id },
    });
    return updateRecord;
  }
}

export const financialRepository = new FinancialRepository();
