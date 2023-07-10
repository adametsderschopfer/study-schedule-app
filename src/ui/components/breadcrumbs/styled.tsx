import { theme } from "@config/theme";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledBreadcrumbsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

export const StyledBreadcrumbsLink = styled(Link)`
  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color: ${theme.colors.grayText};

  text-decoration: none;
  text-transform: capitalize;
  cursor: pointer;

  transition: 150ms;

  word-break: break-word;

  &:hover .breadcrumbs-link__title {
    text-decoration: underline;
  }

  & .breadcrumbs-link__title {
    margin-right: 5px;
  }

  &:first-of-type .breadcrumbs-link__title {
    margin-left: 0;
  }
`;
