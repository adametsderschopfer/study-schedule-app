import { Select } from "@ui/components/select/Select";

export default {
  title: "ui/select",
  component: Select,
};

const options = [
  {
    label: "Test – 1",
    value: "Test – 1",
  },
  {
    label: "Test – 1",
    value: "Test – 1",
  },
  {
    label: "Test – 1",
    value: "Test – 1",
  },
  {
    label: "Test – 1",
    value: "Test – 1",
  },
];

export const Default = (): JSX.Element => <Select options={options} />;
