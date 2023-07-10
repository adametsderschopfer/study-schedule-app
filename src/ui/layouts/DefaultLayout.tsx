import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@ui/components/header/Header";
import { StyledBody } from "@ui/components/layout/Body";
import { StyledContainerMedium } from "@ui/components/layout/Container";
import { Sidebar } from "@ui/components/sidebar/Sidebar";

export const DefaultLayout: React.FC = () => {
  return (
    <>
      <Header />

      <StyledBody>
        <Sidebar />

        <StyledContainerMedium>
          <Outlet />
        </StyledContainerMedium>
      </StyledBody>
    </>
  );
};
