import styled, { keyframes } from "styled-components";

const skeletonBoxShimmerAnimation = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

export const SkeletonBoxParent = styled.div``;

export const SkeletonBox = styled(SkeletonBoxParent)<{
  width?: number;
  height?: number;
  isCircle?: boolean;
}>`
  display: flex;
  flex-direction: column;

  height: ${(props): string =>
    typeof props.height === "number" ? `${props.height}px` : "100px"};
  width: ${(props): string =>
    typeof props.width === "number" ? `${props.width}px` : "100px"};
  border-radius: ${(props): string => (props.isCircle ? "50px" : "2px")};
  position: relative;
  overflow: hidden;
  background-color: #eeeeee;

  ${SkeletonBoxParent} {
    background-color: #dad9d9;

    ${SkeletonBoxParent} {
      background-color: #bebdbd;
    }
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    transform: translateX(-100%);
    border-radius: ${(props): string => (props.isCircle ? "50px" : "2px")};
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
    );
    animation: ${skeletonBoxShimmerAnimation} 1.5s infinite;
    content: "";
  }
`;
