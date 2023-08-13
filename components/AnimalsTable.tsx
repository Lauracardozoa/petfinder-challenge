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
      <div className="flex justify-between items-center">
        <Pagination
          currentPage={pagination.current_page}
          onPageChange={(page) => router.push(`/?page=${page}`)}
          totalPages={pagination.total_pages}
        />
        <span className="text-gray-500">
          Total results: {pagination.total_count.toLocaleString("en-US")}
        </span>
      </div>
    </>
  );
}
