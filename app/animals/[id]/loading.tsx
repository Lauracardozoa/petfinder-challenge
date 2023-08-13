"use client";
import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className="text-center my-16">
      <p className="text-xl my-4">🐱 Loading animal... Please wait. 🐶</p>
      <Spinner size="xl" />
    </div>
  );
}
