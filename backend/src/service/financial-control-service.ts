import { IFinancialControlRepository } from "../repository/protocol";
import { ICreateRecord, IFinancialControl } from "../models/financial-control";
import { TransactionType, userControlService } from "./user-control-service";
import { financialRepository } from "../repository/financial-repository";

class FinancialControlService {
    constructor(private readonly FinancialControlRepository: IFinancialControlRepository) { }

    private errorInRequest(error: any) {
        console.error(error);
        return { statusCode: 500, success: false, message: "Ocorreu um erro ao processar a solicitação." };
    }

    /**
    * Lista todos os registros financeiros de um usuário.
    * @param userId - ID do usuário.
    * @returns Uma resposta contendo os registros financeiros ou uma mensagem de erro.
    */

    async listAllRecordsByUserId(userId: number) {
        try {
            const records = await this.FinancialControlRepository.listAllRecordsByUserId(userId);
            return { statusCode: 200, success: true, records };
        } catch (error) {
            return this.errorInRequest(error);
        }
    }

    /**
   * Obtém um registro financeiro pelo ID.
   * @param id - ID do registro.
   * @returns Uma resposta contendo o registro financeiro ou uma mensagem de erro.
   */

    async listRecordById(id: number) {
        try {
            const record = await this.FinancialControlRepository.listRecordById(id);
            return { statusCode: 200, success: true };
        } catch (error) {
            return this.errorInRequest(error);
        }
    }

    /**
    * Adiciona um novo registro financeiro.
    * @param record - O registro financeiro a ser adicionado.
    * @returns Uma resposta contendo o registro adicionado ou uma mensagem de erro.
    */

    async createRecord(record: ICreateRecord) {
        try {
            const addedRecord = await this.FinancialControlRepository.createRecord(record);
            await userControlService.updateBalance(addedRecord.userId, Number(addedRecord.value), addedRecord.transactionType as TransactionType)
            return { statusCode: 200, success: true, addedRecord };
        } catch (error) {
            return this.errorInRequest(error);
        }
    }

    /**
    * Atualiza um registro financeiro pelo ID.
    * @param id - ID do registro a ser atualizado.
    * @param updatedRecord - O registro atualizado.
    * @returns Uma resposta indicando sucesso ou uma mensagem de erro.
    */

    async updateRecord(id: number, updatedRecord: IFinancialControl) {
        try {
            const record = await this.FinancialControlRepository.listRecordById(id);
            if (record) {
                await this.FinancialControlRepository.updateRecord(id, updatedRecord);
                await userControlService.updateBalance(record.userId, Number(record.value), record.transactionType as TransactionType)
                return { statusCode: 200, success: true, message: 'Registro atualizado.' };
            }
            return { statusCode: 400, success: false, message: 'Registro não encontrado.' };
        } catch (error) {
            return this.errorInRequest(error);
        }
    }

    /**
     * Deleta um registro financeiro pelo ID.
     * @param id - ID do registro a ser deletado.
     * @returns Uma resposta indicando sucesso ou uma mensagem de erro.
     */

    async deleteRecord(id: number) {
        try {
            const record = await this.FinancialControlRepository.listRecordById(id)
            if (record) {
                await this.FinancialControlRepository.deleteRecord(id);
                await userControlService.updateBalance(record.userId, Number(record.value), record.transactionType === 'Input' ? 'Output' : 'Input')
                return { statusCode: 200, success: true, message: 'Registro deletado.' };
            }
            return { statusCode: 400, success: false, message: 'Nenhum Registro encontrado.' };
        } catch (error) {
            return this.errorInRequest(error);
        }
    }
}

export const financialControlService = new FinancialControlService(financialRepository);