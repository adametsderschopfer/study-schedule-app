import { Button } from "@ui/components/button/Button";
import { IButtonProps } from "@ui/components/button/types";

export default {
  title: "ui/Buttons",
  component: Button,
};

const Template = (args: IButtonProps): JSX.Element => (
  <Button {...args}>Перейти в раздел</Button>
);

export const Default = Template.bind({});
export const Wide = Template.bind({}, { mode: "wide" });
export const Outline = Template.bind({}, { isOutline: true });
