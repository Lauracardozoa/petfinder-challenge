import { Client } from "@petfinder/petfinder-js";
import AnimalSchema from "@/entities/AnimalEntity";
import PaginationEntity from "@/entities/PaginationEntity";
import FindAnimalFilter from "./types/FindAnimalsFilter";
import PaginationArgs from "./types/PaginationArgs";

type PetFinderFindAllResponse = {
  animals: AnimalSchema[];
  pagination: PaginationEntity;
};

export default class PetFinderService {
  private readonly client: Client;

  constructor() {
    this.client = new Client({
      apiKey: process.env.CLIENT_ID!,
      secret: process.env.CLIENT_SECRET!,
    });
  }

  public async findAnimals({
    filter = {},
    limit = 30,
    page = 1,
  }: PaginationArgs<FindAnimalFilter> = {}): Promise<PetFinderFindAllResponse> {
    const { data } = await this.client.animal.search({
      ...filter,
      limit,
      page,
    });

    return data;
  }

  public async findAnimal(id: number): Promise<AnimalSchema> {
    const { data } = await this.client.animal.show(id);
    return data.animal;
  }

  public async findBreeds(type: string): Promise<string[]> {
    const {
      data: { breeds },
    } = await this.client.animalData.breeds(type);
    return breeds.map((breed: { name: string }) => breed.name);
  }
}
