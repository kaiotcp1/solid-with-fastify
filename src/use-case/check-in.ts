import { CheckInsRepository } from "@/repositories/interface/check-ins.repository";
import { GymsRepository } from "@/repositories/interface/gyms-repository";
import { CheckIn, Gym } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

interface CheckInUseCaseCaseRequest {
  userId: string;
  gymId: string;
  userLatitute: number;
  userLongitude: number;
};

interface CheckInUseCaseCaseResponse {
  checkIn: CheckIn
}
export class CheckInUseCaseCase {
  constructor(
    private readonly checkInsRepository: CheckInsRepository,
    private readonly gymsRepository: GymsRepository
  ) { }

  async execute({ userId, gymId, userLatitute, userLongitude }: CheckInUseCaseCaseRequest): Promise<CheckInUseCaseCaseResponse> {
    const MAX_DISTANCE_IN_KM = 0.1
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) throw new ResourceNotFoundError();

    const distance = getDistanceBetweenCoordinates({
      latitude: userLatitute,
      longitude: userLongitude
    }, {
      latitude: gym.latitude.toNumber(),
      longitude: gym.longitude.toNumber()
    });

    if (distance > MAX_DISTANCE_IN_KM) throw new Error();

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());

    if (checkInOnSameDate) throw new Error();

    const checkIn = await this.checkInsRepository.create({ user_id: userId, gym_Id: gymId });

    return {
      checkIn
    }
  };
}