import { IUserControlRepository } from "../repository/protocol";
import { userControlRepository } from "../repository/user-repository";

export type TransactionType = 'Input' | 'Output';

class UserControlService {
    constructor(private readonly UserControlRepository: IUserControlRepository) { }

    /**
    * Função para atualizar o saldo do usuário
    * @param userId - ID do usuário.
    * @param amount - Valor.
    * @param transactionType - Tipo da transação. ('Input', 'Output')
    * @returns Uma resposta contendo os registros financeiros ou uma mensagem de erro.
    */

    async updateBalance(userId: number, amount: number, transactionType: TransactionType) {
        try {
            const user = await this.UserControlRepository.getUserById(userId);
            if (user) {
                let updatedBalance: number;

                if (transactionType === 'Input') {
                    updatedBalance = Number(user.currentBalance) + amount;
                } else if (transactionType === 'Output') {
                    updatedBalance = Number(user.currentBalance) - amount;
                } else {
                    throw new Error('Tipo de transação inválido.');
                }

                await this.UserControlRepository.updateBalance(userId, updatedBalance);
                return true;
            } else {
                throw new Error('Usuário não encontrado.');
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export const userControlService = new UserControlService(userControlRepository)