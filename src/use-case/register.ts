import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/interface/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export interface RegisterUseCaseRequest {
  name: string,
  email: string,
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) { }

  async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6);
    console.log(password_hash)
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) throw new UserAlreadyExistsError();
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    })

    return {
      user,
    }
  }
}