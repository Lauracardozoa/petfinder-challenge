import AnimalCard from "@/components/AnimalCard";
import PetFinderService from "@/services/PetFinderService";

type AnimalPageProps = {
  params: {
    id: string;
  };
};

export default async function AnimalPage({ params }: AnimalPageProps) {
  const petFinderService = new PetFinderService();
  const animal = await petFinderService.findAnimal(parseInt(params.id, 10));
  return (
    <div className="px-16">
      <AnimalCard {...animal} />
    </div>
  );
}
