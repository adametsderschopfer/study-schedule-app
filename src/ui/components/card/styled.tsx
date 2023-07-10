import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: 348px;
  border-radius: 2px;
  overflow: hidden;

  box-shadow: 0 4px 20px rgba(61, 92, 109, 0.1);

  transition: 200ms;
  cursor: ${(props): string => (props.onClick ? "pointer" : "default")};

  &:hover {
    transform: ${(props): string => (props.onClick ? "scale(1.02)" : "none")};
  }
`;

export const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 0 0 24px;
  background-color: ${theme.colors.primary};
  width: 100%;
`;

export const StyledCardHeaderTitle = styled.div`
  font-size: 24px;
  line-height: 30px;
  font-weight: 500;

  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const StyledCardBody = styled.div`
  padding: 24px;
  min-height: 175px;
  height: calc(100% - 56px);

  display: flex;
  flex-direction: column;
`;

export const StyledCardBodyText = styled.div`
  color: ${theme.colors.primary};
  font-size: 16px;
  line-height: 22px;
  margin-bottom: auto;

  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  max-width: 100%;
  max-height: 90px;
`;

export const StyledCardBodySubText = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: ${theme.colors.grayText};

  margin-top: 20px;
  margin-bottom: 10px;

  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const StyledCardBodyDescription = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  color: ${theme.colors.grayText};

  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;
