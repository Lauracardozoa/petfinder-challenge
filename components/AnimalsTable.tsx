"use client";
import { Pagination, Table } from "flowbite-react";
import { useRouter } from "next/navigation";
import AnimalSchema from "@/entities/AnimalEntity";
import PaginationEntity from "@/entities/PaginationEntity";

type AnimalsTableProps = {
  animals: AnimalSchema[];
  pagination: PaginationEntity;
};

export default function AnimalsTable({
  animals,
  pagination,
}: AnimalsTableProps) {
  const router = useRouter();
  return (
    <>
      <Table striped hoverable>
        <Table.Head>
          <Table.HeadCell />
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Type</Table.HeadCell>
          <Table.HeadCell>Breed</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {animals.map((animal, index) => (
            <Table.Row
              key={animal.id}
              onClick={() => {
                router.push(`/animals/${animal.id}`);
              }}
            >
              <Table.Cell>
                {index + 1 + (pagination.current_page - 1) * 30}
              </Table.Cell>
              <Table.Cell>{animal.name}</Table.Cell>
              <Table.Cell>{animal.type}</Table.Cell>
              <Table.Cell>{animal.breeds.primary}</Table.Cell>
              <Table.Cell>{animal.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="mt-2 flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-gray-500">
            Showing <span className="font-bold">{pagination.current_page}</span>{" "}
            of <span className="font-bold">{pagination.total_pages}</span> pages
          </p>
          <Pagination
            showIcons
            currentPage={pagination.current_page}
            onPageChange={(page) => router.push(`/?page=${page}`)}
            totalPages={pagination.total_pages}
          />
        </div>
        <span className="text-gray-500">
          Total results: {pagination.total_count.toLocaleString("en-US")}
        </span>
      </div>
    </>
  );
}
