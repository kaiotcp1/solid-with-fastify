import { CheckInsRepository } from "../interface/check-ins.repository";
import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkOnSameDate = this.items.find(checkIn => {

      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) &&
        checkInDate.isBefore(endOfTheDay);

      return (
        checkIn.user_id === userId && isOnSameDate
      );
    });

    if (!checkOnSameDate) return Promise.resolve(null);

    return Promise.resolve(checkOnSameDate);
  }
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_Id: data.gym_Id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  };
}
