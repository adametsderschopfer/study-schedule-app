import { Input } from "@ui/components/input/Input";

export default {
  title: "ui/input",
  component: Input,
};

export const Default = (): JSX.Element => <Input />;
export const Labeled = (): JSX.Element => <Input label={"Label"} />;
export const Error = (): JSX.Element => (
  <Input label={"title"} errorMessage={"error message here"} />
);
export const Placeholder = (): JSX.Element => (
  <Input label={"title"} placeholder={"Test input"} />
);
export const Value = (): JSX.Element => (
  <Input
    label={"title"}
    placeholder={"Test input"}
    value={"Test valueResolver"}
  />
);
