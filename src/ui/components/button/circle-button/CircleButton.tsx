import React from "react";
import { StyledCircleButton } from "@ui/components/button/circle-button/styled";
import { IButtonProps } from "@ui/components/button/types";

export const CircleButton: React.FC<IButtonProps> = (props) => {
  return (
    <StyledCircleButton {...props}>
      <svg
        width={"16"}
        height={"16"}
        viewBox={"0 0 16 16"}
        fill={"none"}
        xmlns={"http://www.w3.org/2000/svg"}>
        <path
          d={"M1.59961 8L14.3996 8"}
          stroke={"currentColor"}
          strokeWidth={"2"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
        <path
          d={"M8 14.3999L8 1.5999"}
          stroke={"currentColor"}
          strokeWidth={"2"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
      </svg>
    </StyledCircleButton>
  );
};
