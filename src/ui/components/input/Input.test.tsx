import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Input } from "./Input";

describe("UI/Components/Input", () => {
  const label = "Username";
  const placeholder = "Enter your username";
  const errorMessage = "Please enter a valid username";
  const onChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    const { getByLabelText } = render(<Input aria-label={label} />);
    const input = getByLabelText(label);

    expect(input).toBeInTheDocument();
  });

  test("renders with placeholder", () => {
    const { getByPlaceholderText } = render(
      <Input placeholder={placeholder} />,
    );
    const input = getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  });

  test("renders with label", () => {
    const { getByText } = render(<Input label={label} />);
    const labelElement = getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  test("renders with error message", () => {
    const { getByText } = render(
      <Input errorMessage={errorMessage} isValid={false} />,
    );
    const errorMessageElement = getByText(errorMessage);
    expect(errorMessageElement).toBeInTheDocument();
  });

  test("calls onChange callback when text is entered", () => {
    const { getByLabelText } = render(
      <Input aria-label={label} onChange={onChange} />,
    );
    const input = getByLabelText(label);

    fireEvent.change(input, { target: { value: "test" } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
