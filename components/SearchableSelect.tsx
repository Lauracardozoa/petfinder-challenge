import ReactSelect, { Props } from "react-select";

type SearchableSelectProps = Omit<
  Props<{ value: string; label: string }>,
  "classNames" | "styles"
>;

export default function SearchableSelect(props: SearchableSelectProps) {
  return (
    <ReactSelect
      {...props}
      classNames={{
        control() {
          return "min-h-11";
        },
        valueContainer() {
          return "h-full rounded-l-lg bg-gray-50";
        },
        indicatorsContainer() {
          return "rounded-r-lg bg-gray-50";
        },
      }}
      styles={{
        control(base) {
          return {
            ...base,
            borderRadius: "0.5rem",
            borderColor: "rgb(209 213 219)",
          };
        },
      }}
    />
  );
}
