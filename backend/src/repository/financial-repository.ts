import { ICreateRecord, IFinancialControl } from "../models/financial-control";
import { IFinancialControlRepository } from "./protocol";
import { myDataSource } from "../config/database/data-source";
import { FinancialControl } from "../entity/FinancialControl";

class FinancialRepository implements IFinancialControlRepository {
  async listAllRecordsByUserId(userId: number) {
    const records = await myDataSource
      .getRepository(FinancialControl)
      .findBy({ userId });
    return records;
  }

  async listRecordById(id: number) {
    const record = await myDataSource
      .getRepository(FinancialControl)
      .findOneBy({
        id,
      });
    return record;
  }

  async createRecord(record: ICreateRecord) {
    const createRecord = myDataSource.getRepository(FinancialControl).create({
      userId: record.userId,
      description: record.description,
      transactionType: record.transactionType,
      value: record.value,
      date: record.date,
      category: record.category,
    });
    const results = await myDataSource
      .getRepository(FinancialControl)
      .save(createRecord);
    return results;
  }

  async updateRecord(id: number, updatedRecord: IFinancialControl) {
    const updateRecord = await myDataSource
      .getRepository(FinancialControl)
      .update(id, updatedRecord);
    return updateRecord;
  }

  async deleteRecord(id: number) {
    const deleteRecord = await myDataSource
      .getRepository(FinancialControl)
      .delete(id);
    return deleteRecord;
  }
}

export const financialRepository = new FinancialRepository();
