"use client";
import { Button, Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import { HiOutlineArrowLeft } from "react-icons/hi";
import AnimalEntity from "@/entities/AnimalEntity";
import Image from "next/image";

type AnimalCardProps = AnimalEntity;

type FieldProps = {
  label: string;
  value: string;
};

function Field({ label, value }: FieldProps) {
  return (
    <div className="space-x-2">
      <span className="text-md font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>
      <span className="text-base text-gray-500">{value}</span>
    </div>
  );
}

export default function AnimalCard({
  name,
  photos,
  type,
  breeds,
  size,
  colors,
  age,
  gender,
  status,
  description,
}: AnimalCardProps) {
  const router = useRouter();
  return (
    <>
      <Button color="purple" className="my-2" onClick={router.back}>
        <HiOutlineArrowLeft className="h-5 w-5 mr-3" />
        <p>Back</p>
      </Button>
      <Card>
        <h2 className="font-bold text-2xl">My name is {name}</h2>
        <div className="flex gap-x-8">
          <div className="grid grid-cols-3 gap-3 items-center">
            {photos.length === 0 ? (
              // Placeholder
              <Image
                src="/photo-not-found.png"
                alt={name}
                height={288}
                width={288}
              />
            ) : (
              photos.map((photo, index) => (
                <Image
                  key={index}
                  src={photo.medium}
                  alt={name}
                  className="rounded-lg "
                  height={288}
                  width={288}
                />
              ))
            )}
          </div>
          <div className="flex flex-wrap flex-col">
            <Field label="Type" value={type} />
            <Field
              label="Breed"
              value={
                breeds.primary +
                (breeds.secondary ? ` - ${breeds.secondary}` : "")
              }
            />
            <Field label="Size" value={size} />
            <Field label="Color" value={colors.primary} />
            <Field label="Age" value={age} />
            <Field label="Gender" value={gender} />
            <Field label="Status" value={status} />
            {description && <Field label="Description" value={description} />}
          </div>
        </div>
      </Card>
    </>
  );
}
