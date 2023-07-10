import { theme } from "@config/theme";
import styled, { keyframes } from "styled-components";

const spinKeyFrames = keyframes`
  0%, 100% {box-shadow: 0.2em 0 0 0 currentcolor;}
  12% {box-shadow: 0.2em 0.2em 0 0 currentcolor;}
  25% {box-shadow: 0 0.2em 0 0 currentcolor;}
  37% {box-shadow: -0.2em 0.2em 0 0 currentcolor;}
  50% {box-shadow: -0.2em 0 0 0 currentcolor;}
  62% {box-shadow: -0.2em -0.2em 0 0 currentcolor;}
  75% {box-shadow: 0px -0.2em 0 0 currentcolor;}
  87% {box-shadow: 0.2em -0.2em 0 0 currentcolor;}
`;

export const StyledLoaderIndicatorMiniWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 50px;
  padding: 10px;

  div {
    width: 15px;
    height: 15px;
  }
`;

export const StyledLoaderIndicator = styled.div<{
  isInvertColor?: boolean;
}>`
  transform: rotateZ(45deg);
  perspective: 1000px;
  width: 48px;
  height: 48px;
  color: #000000;

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: 0.5s ${spinKeyFrames} linear infinite;
  }

  &:after {
    color: ${(props): string =>
      props.isInvertColor ? "#ffffff" : theme.colors.primary};
    transform: rotateY(70deg);
    animation-delay: 0.2s;
  }
`;
