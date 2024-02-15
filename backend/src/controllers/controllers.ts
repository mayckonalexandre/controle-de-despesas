import { Request, Response } from "express";
import { financialControlService } from "../service/financial-control-service";
import z, { string } from 'zod';
import { Prisma } from "@prisma/client";
import { Authenticate } from "../service/authenticate";
import { userControlRepository } from "../repository/user-repository";

class Controllers {
    async authenticate(req: Request, res: Response) {
        const schema = z.object({
          email: z.string().email().trim(),
          password: z.string().trim(),
        });
        const { email, password } = schema.parse(req.body);
        const response = await new Authenticate(
          userControlRepository
        ).authenticate(email, password);
        return res.status(response.statusCode).json(response);
    }

    async listAllRecordsByUserId(req: Request, res: Response) {
        const schema = z.object({
            userId: z.number()
        });
        const { userId } = schema.parse(req.body);
        const response = await financialControlService.listAllRecordsByUserId(
          userId
        );
        return res.status(response.statusCode).json(response);
    }

    async createRecord(req: Request, res: Response) {
        const schema = z.object({
          userId: z.number(),
          description: z.string().trim(),
          transactionType: z
            .enum(["Input", "Output"])
            .transform((value) => value.toString()),
          value: z.number().transform((value) => new Prisma.Decimal(value)),
          date: z.string().trim(),
          category: z
            .enum([
              "Aluguel",
              "Hipoteca",
              "Contas de Energia",
              "Contas de Água",
              "Internet/TV/Telefone",
              "Transporte",
              "Alimentação",
              "Lazer",
              "Educação",
              "Saúde",
              "Compras",
              "Impostos",
              "Investimentos",
              "Outras Despesas Fixas",
              "Despesas Variadas",
              "Salário",
              "Renda Extra",
              "Investimentos",
              "Presentes",
              "Outras Receitas",
            ])
            .transform((value) => value.toString()),
        });
        const record = schema.parse(req.body);
        const response = await financialControlService.createRecord(record);
        return res.status(response.statusCode).json(response);
    }

    async deleteRecordById(req: Request, res: Response) {
        const schema = z.object({
            id: z.number()
        });
        const { id } = schema.parse(req.body);
        const response = await financialControlService.deleteRecord(id);
        return res.status(response.statusCode).json(response);
    }
}

export const controllers = new Controllers();