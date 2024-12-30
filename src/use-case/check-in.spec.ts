import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { describe, beforeEach, it, expect, vi, afterEach } from "vitest";
import { CheckInUseCaseCase } from "./check-in";
import { Decimal } from "@prisma/client/runtime/library";

let checkInRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCaseCase;

describe('Register use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCaseCase(checkInRepository, gymsRepository);

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  })

  it('should be able to register', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitute: 0,
      userLongitude: 0
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitute: 0,
      userLongitude: 0
    });

    await expect(() => sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitute: 0,
      userLongitude: 0
    })).rejects.toBeInstanceOf(Error);
  });
});