import { DataSource } from "typeorm";
import { User } from "../../entity/User";
import { FinancialControl } from "../../entity/FinancialControl";

export const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "teste123",
  database: "finance_control",
  entities: [User, FinancialControl],
  logging: false,
  synchronize: true,
});
