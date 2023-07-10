import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Button } from "./Button";

describe("UI/Components/Button", () => {
  const buttonText = "Click me";
  const onClickMock = jest.fn();
  const defMockStyle = { backgroundColor: "red" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders button with text content", () => {
    render(<Button onClick={onClickMock}>{buttonText}</Button>);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(buttonText);

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalled();
  });

  test("renders button with icon", () => {
    const icon = <svg data-testid={"icon-svg"} />;

    render(<Button onClick={onClickMock}>{icon}</Button>);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByTestId("icon-svg")).toBeInTheDocument();

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalled();
  });

  test("renders button with custom styles", () => {
    render(
      <Button onClick={onClickMock} style={defMockStyle}>
        {buttonText}
      </Button>,
    );

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toHaveStyle("background-color: red");
  });
});
