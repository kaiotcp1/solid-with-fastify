import { Gym, User } from "@prisma/client";
import { GymsRepository } from "../interface/gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  searchMany(query: string, page: number): Promise<Gym[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }
    return gym;
  }
}
