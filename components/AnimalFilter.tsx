"use client";
import { Button, Card, Checkbox, Select, ToggleSwitch } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import SearchableSelect from "./SearchableSelect";

type AnimalFilterProps = {
  breeds?: string[];
  defaultValues?: Partial<AnimalFilterFormSchema>;
};

type AnimalFilterFormSchema = {
  type: string;
  breeds: string[];
  sizes: string[];
  genders: string[];
  ages: string[];
  status: string;
};

export default function AnimalFilter({
  breeds = [],
  defaultValues = {},
}: AnimalFilterProps) {
  const [data, setData] = useState<AnimalFilterFormSchema>({
    type: defaultValues.type ?? "cat",
    breeds: defaultValues.breeds ?? [],
    sizes: defaultValues.sizes ?? [],
    genders: defaultValues.genders ?? [],
    ages: defaultValues.ages ?? [],
    status: defaultValues.status ?? "adoptable",
  });
  const router = useRouter();

  const applyFilter = useCallback(() => {
    const queryParams = new URLSearchParams({
      type: data.type,
      status: data.status,
    });
    data.breeds.forEach((breed) => queryParams.append("breed", breed));
    data.sizes.forEach((size) => queryParams.append("size", size));
    data.genders.forEach((gender) => queryParams.append("gender", gender));
    data.ages.forEach((age) => queryParams.append("age", age));
    router.push(`/?${queryParams}`);
  }, [data, router]);

  function handleChangeSize({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.checked) {
      setData((d) => ({ ...d, sizes: [...d.sizes, target.id] }));
    } else {
      setData((d) => ({
        ...d,
        sizes: d.sizes.filter((size) => size !== target.id),
      }));
    }
  }

  function handleChangeGender({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.checked) {
      setData((d) => ({ ...d, genders: [...d.genders, target.id] }));
    } else {
      setData((d) => ({
        ...d,
        genders: d.genders.filter((gender) => gender !== target.id),
      }));
    }
  }

  function handleChangeAge({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.checked) {
      setData((d) => ({ ...d, ages: [...d.ages, target.id] }));
    } else {
      setData((d) => ({
        ...d,
        ages: d.ages.filter((age) => age !== target.id),
      }));
    }
  }

  useEffect(() => {
    applyFilter();
  }, [data.type, applyFilter]);

  return (
    <Card>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          applyFilter();
        }}
      >
        <header className="flex justify-between items-center">
          <h2 className="font-bold text-xl">Filters</h2>
          <Button color="purple" size="sm" type="submit">
            Apply
          </Button>
        </header>
        <section className="flex flex-col gap-2">
          <div>
            <label
              htmlFor="type"
              className="text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              Type
            </label>
            <Select
              id="type"
              defaultValue={data.type}
              onChange={({ target }) =>
                setData((d) => ({ ...d, type: target.value }))
              }
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </Select>
          </div>
          <div>
            <label
              htmlFor="breed"
              className="text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              Breed
            </label>
            <SearchableSelect
              isMulti
              inputId="breed"
              defaultValue={defaultValues.breeds?.map((breed) => ({
                value: breed,
                label: breed,
              }))}
              options={breeds.map((breed) => ({ value: breed, label: breed }))}
              onChange={(selectedOptions) => {
                if (Array.isArray(selectedOptions)) {
                  setData((d) => ({
                    ...d,
                    breeds: selectedOptions.map((option) => option.value),
                  }));
                }
              }}
            />
          </div>
          <fieldset>
            <legend className="text-lg font-medium text-gray-900 dark:text-gray-300">
              Size
            </legend>
            <div className="flex gap-x-2 items-center">
              <Checkbox
                id="small"
                name="size"
                defaultChecked={defaultValues.sizes?.includes("small")}
                onChange={handleChangeSize}
              />
              <label htmlFor="small">Small</label>
            </div>
            <div className="flex gap-x-2 items-center">
              <Checkbox
                id="medium"
                name="size"
                defaultChecked={defaultValues.sizes?.includes("medium")}
                onChange={handleChangeSize}
              />
              <label htmlFor="medium">Medium</label>
            </div>
            <div className="flex gap-x-2 items-center">
              <Checkbox
                id="large"
                name="size"
                defaultChecked={defaultValues.sizes?.includes("large")}
                onChange={handleChangeSize}
              />
              <label htmlFor="large">Large</label>
            </div>
            <div className="flex gap-x-2 items-center">
              <Checkbox
                id="xlarge"
                name="size"
                defaultChecked={defaultValues.sizes?.includes("xlarge")}
                onChange={handleChangeSize}
              />
              <label htmlFor="xlarge">Extra Large</label>
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-lg font-medium text-gray-900 dark:text-gray-300">
              Gender
            </legend>
            <div className="flex gap-x-2 items-center">
              <Checkbox
                id="female"
                name="gender"
                defaultChecked={defaultValues.genders?.includes("female")}
                onChange={handleChangeGender}
              />
              <label htmlFor="female">Female</label>
            </div>
            <div className="flex gap-x-2 items-center">
              <Checkbox
                id="male"
                name="gender"
                defaultChecked={defaultValues.genders?.includes("male")}
                onChange={handleChangeGender}
              />
              <label htmlFor="male">Male</label>
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-lg font-medium text-gray-900 dark:text-gray-300">
              Age
            </legend>
            <div className="flex gap-x-2 items-center">
              <Checkbox
                id="baby"
                name="age"
                defaultChecked={defaultValues.ages?.includes("baby")}
                onChange={handleChangeAge}
              />
              <label htmlFor="baby">Baby</label>
            </div>
            <div className="flex gap-x-2 items-center">
              <Checkbox
                id="young"
                name="age"
                defaultChecked={defaultValues.ages?.includes("young")}
                onChange={handleChangeAge}
              />
              <label htmlFor="young">Young</label>
            </div>
            <div className="flex gap-x-2 items-center">
              <Checkbox
                id="adult"
                name="age"
                defaultChecked={defaultValues.ages?.includes("adult")}
                onChange={handleChangeAge}
              />
              <label htmlFor="adult">Adult</label>
            </div>
            <div className="flex gap-x-2 items-center">
              <Checkbox
                id="senior"
                name="age"
                defaultChecked={defaultValues.ages?.includes("senior")}
                onChange={handleChangeAge}
              />
              <label htmlFor="senior">Senior</label>
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-lg font-medium text-gray-900 dark:text-gray-300">
              Status
            </legend>
            <div className="inline-flex">
              <ToggleSwitch
                id="status"
                color="purple"
                checked={data.status === "adoptable"}
                label=""
                onChange={(checked) =>
                  setData((d) => ({
                    ...d,
                    status: checked ? "adoptable" : "adopted",
                  }))
                }
              />
              <label htmlFor="status">Adoptable</label>
            </div>
          </fieldset>
        </section>
      </form>
    </Card>
  );
}
