import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { describe, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";

describe('Authenticate use case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: 'John Doe',
      email: 'j@j.com',
      password_hash: await hash('123456', 6)
    });

    const { user } = await sut.execute({
      email: 'j@j.com',
      password: '123456'
    });
  })

  it('should not be able to authenticate with wrong email', async () => {

  })

  it('should not be able to authenticate with wrong password', async () => {

  })
})