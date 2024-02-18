import {
  IFinancialControlRepository,
  IUserControlRepository,
} from "../repository/protocol";
import { ICreateRecord, IFinancialControl } from "../models/financial-control";
import { TransactionType, userControlService } from "./user-control-service";
import { financialRepository } from "../repository/financial-repository";
import { ErrorCustom } from "../middleware/error";
import { userControlRepository } from "../repository/user-repository";

class FinancialControlService {
  constructor(
    private readonly FinancialControlRepository: IFinancialControlRepository,
    private readonly UserControlRepository: IUserControlRepository
  ) {}

  /**
   * Lista todos os registros financeiros de um usuário.
   * @param userId - ID do usuário.
   * @returns Uma resposta contendo os registros financeiros ou uma mensagem de erro.
   */

  async listAllRecordsByUserId(userId: number) {
    const records =
      await this.FinancialControlRepository.listAllRecordsByUserId(userId);
    return { statusCode: 200, success: true, records };
  }

  /**
   * Obtém um registro financeiro pelo ID.
   * @param id - ID do registro.
   * @returns Uma resposta contendo o registro financeiro ou uma mensagem de erro.
   */

  async listRecordById(id: number) {
    const record = await this.FinancialControlRepository.listRecordById(id);
    return { statusCode: 200, success: true, record };
  }

  /**
   * Adiciona um novo registro financeiro.
   * @param record - O registro financeiro a ser adicionado.
   * @returns Uma resposta contendo o registro adicionado ou uma mensagem de erro.
   */

  async createRecord(record: ICreateRecord) {
    const user = await this.UserControlRepository.getUserById(record.userId);

    if (!user) throw new ErrorCustom("Usuário não encontrado.", 400, false);

    const addedRecord = await this.FinancialControlRepository.createRecord(
      record
    );

    await userControlService.updateBalance(
      addedRecord.userId,
      Number(addedRecord.value),
      addedRecord.transactionType as TransactionType
    );

    return { statusCode: 201, success: true, addedRecord };
  }

  /**
   * Atualiza um registro financeiro pelo ID.
   * @param id - ID do registro a ser atualizado.
   * @param updatedRecord - O registro atualizado.
   * @returns Uma resposta indicando sucesso ou uma mensagem de erro.
   */

  async updateRecord(id: number, updatedRecord: IFinancialControl) {
    const record = await this.FinancialControlRepository.listRecordById(id);

    if (!record) throw new ErrorCustom("Registro não encontrado.", 400, false);

    await this.FinancialControlRepository.updateRecord(id, updatedRecord);

    await userControlService.updateBalance(
      record.userId,
      Number(record.value),
      record.transactionType as TransactionType
    );

    return {
      statusCode: 200,
      success: true,
      message: "Registro atualizado.",
    };
  }

  /**
   * Deleta um registro financeiro pelo ID.
   * @param id - ID do registro a ser deletado.
   * @returns Uma resposta indicando sucesso ou uma mensagem de erro.
   */

  async deleteRecord(id: number) {
    const record = await this.FinancialControlRepository.listRecordById(id);

    if (!record) throw new ErrorCustom("Registro não encontrado.", 400, false);

    await this.FinancialControlRepository.deleteRecord(id);

    await userControlService.updateBalance(
      record.userId,
      Number(record.value),
      record.transactionType === "Input" ? "Output" : "Input"
    );

    return {
      statusCode: 200,
      success: true,
      message: "Registro deletado.",
    };
  }
}

export const financialControlService = new FinancialControlService(
  financialRepository, 
  userControlRepository
);
