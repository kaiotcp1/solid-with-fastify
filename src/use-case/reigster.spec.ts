import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { expect, test, describe, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";

describe('Register use case', () => {
  it('should hash user password upon registration', async () => {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    const { user } = await registerUseCase.execute({ name: 'John Doe', email: 'j@j.com', password: '123456' });

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)
  })
});

test('check if it works', () => {
  expect(2 + 2).toBe(4)
});