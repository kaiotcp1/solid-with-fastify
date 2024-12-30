import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
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
    await expect(() =>
      sut.execute({
        email: 'wrong@email.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);

  })

  it('should not be able to authenticate with wrong password', async () => {
    await expect(() =>
      sut.execute({
        email: 'j@j.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  })
})