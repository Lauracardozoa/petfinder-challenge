type Breed = {
  primary: string;
  secondary: string | null;
  mixed: boolean;
  unknown: boolean;
};

type Color = {
  primary: string;
  secondary: string | null;
  tertiary: string | null;
};

type Photo = {
  small: string;
  medium: string;
  large: string;
  full: string;
};

type AnimalEntity = {
  id: number;
  type: string;
  breeds: Breed;
  name: string;
  age: "Baby" | "Young" | "Adult" | "Senior";
  gender: "Male" | "Female";
  colors: Color;
  size: "Small" | "Medium" | "Large" | "Extra Large";
  status: "adoptable" | "adopted";
  photos: Photo[];
  description: string;
};

export default AnimalEntity;
