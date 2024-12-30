import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository';
import { UserAlreadyExistsError } from '@/use-case/errors/user-already-exists-error';
import { makeRegisterUseCase } from '@/use-case/factories/make-register-usecase';
import { RegisterUseCase } from '@/use-case/register';
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    reply.status(500).send({ message: error }) //FIX ME
  }

  return reply.status(201).send()
}