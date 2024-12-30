import { UserAlreadyExistsError } from '@/use-case/errors/user-already-exists-error';
import { makeAuthenticateUseCase } from '@/use-case/factories/make-authenticate-usecase';
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(request.body);
  console.log(email, password);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const kaio = await authenticateUseCase.execute({ email, password });

    console.log(kaio);
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    reply.status(500).send({ message: error }) //FIX ME
  }

  return reply.status(200).send()
}