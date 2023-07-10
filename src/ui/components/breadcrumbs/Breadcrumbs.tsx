import React from "react";
import {
  StyledBreadcrumbsLink,
  StyledBreadcrumbsWrapper,
} from "@ui/components/breadcrumbs/styled";
import { IBreadcrumbsProps } from "@ui/components/breadcrumbs/types";

export const Breadcrumbs: React.FC<IBreadcrumbsProps> = (props) => {
  return (
    <StyledBreadcrumbsWrapper>
      {props.crumbs.map((crumb, index) => (
        <StyledBreadcrumbsLink to={crumb.href || ""} key={`Crumb_${index}`}>
          <span className={"breadcrumbs-link__title"}>{crumb.title}</span>

          {index !== props.crumbs.length - 1 ? (
            <span className={"breadcrumbs-link__title"}>{">"}</span>
          ) : null}
        </StyledBreadcrumbsLink>
      ))}
    </StyledBreadcrumbsWrapper>
  );
};

Breadcrumbs.defaultProps = {
  crumbs: [],
};
