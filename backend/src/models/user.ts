export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  currentBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  currentBalance: number;
}