import { userControlRepository } from "../repository/user-repository";
import { Authenticate } from "../service/authenticate";

describe("Authenticate", () => {
  const authenticate = new Authenticate(userControlRepository);

  test("Autenticação bem-sucedida", async () => {
    const validUser = { email: "teste@gmail.com", password: "123" };

    const result = await authenticate.authenticate(
      validUser.email,
      validUser.password
    );

    expect(result.statusCode).toBe(200);
    expect(result.success).toBe(true);
    expect(result).toHaveProperty("token");
  });

  test("Usuário não encontrado", async () => {
    const validUser = {
      email: "naoexistente@gmail.com",
      password: "senha",
    };

    await expect(
      authenticate.authenticate(validUser.email, validUser.password)
    ).rejects.toMatchObject({
      message: "Credenciais inválidas!",
      statusCode: 401,
      success: false,
    });
  });

  test("Senha inválida", async () => {
    const validUser = { email: "teste@gmail.com", password: "321" };

    await expect(
      authenticate.authenticate(validUser.email, validUser.password)
    ).rejects.toMatchObject({
      message: "Credenciais inválidas!",
      statusCode: 401,
      success: false,
    });
  });
});
