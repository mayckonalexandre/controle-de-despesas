export interface IFinancialControl {
  id: number;
  userId: number;
  description: string;
  transactionType: string;
  value: number;
  date: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateRecord {
  userId: number;
  description: string;
  transactionType: string;
  value: number;
  date: string;
  category: string;
}
