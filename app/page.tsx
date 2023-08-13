import AnimalsTable from "@/components/AnimalsTable";
import AnimalFilter from "@/components/AnimalFilter";
import PetFinderService from "@/services/PetFinderService";

type HomePageProps = {
  searchParams: {
    page?: string;
    type?: string;
    breed?: string | string[];
    size?: string | string[];
    gender?: string | string[];
    age?: string | string[];
    status?: string;
  };
};

function queryParamToString(param?: string | string[]): string | undefined {
  return Array.isArray(param) ? param.join(",") : param;
}

function queryParamToArray(param?: string | string[]): string[] {
  if (Array.isArray(param)) {
    return param;
  } else if (param !== undefined) {
    return [param];
  } else {
    return [];
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const {
    breed: searchedBreeds,
    size: searchedSizes,
    gender: searchedGenders,
    age: searchedAges,
    type = "cat",
    status = "adoptable",
    page = "1",
  } = searchParams;
  const petFinderService = new PetFinderService();
  const { animals, pagination } = await petFinderService.findAnimals({
    filter: {
      type,
      status,
      breed: queryParamToString(searchedBreeds),
      size: queryParamToString(searchedSizes),
      gender: queryParamToString(searchedGenders),
      age: queryParamToString(searchedAges),
    },
    page: parseInt(page, 10),
  });
  const breeds = await petFinderService.findBreeds(type);
  return (
    <div className="flex gap-x-4">
      <aside className="w-1/4">
        <AnimalFilter
          breeds={breeds}
          defaultValues={{
            type,
            status,
            breeds: queryParamToArray(searchedBreeds),
            sizes: queryParamToArray(searchedSizes),
            genders: queryParamToArray(searchedGenders),
            ages: queryParamToArray(searchedAges),
          }}
        />
      </aside>
      <section className="grow">
        <AnimalsTable animals={animals} pagination={pagination} />
      </section>
    </div>
  );
}
