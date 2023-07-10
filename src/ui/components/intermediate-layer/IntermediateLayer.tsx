import React, { PropsWithChildren, useEffect } from "react";
import { StyledIntermediateLayerWrapper } from "@ui/components/intermediate-layer/styled";
import { StyledLoaderIndicator } from "@ui/components/loader-indicator";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { onAppStartAction } from "@store/modules/app/actions";
import { selectApp } from "@store/modules/app/selector";
import { selectUser } from "@store/modules/user/selector";

export function IntermediateLayer(props: PropsWithChildren): JSX.Element {
  const user = useAppSelector(selectUser);
  const app = useAppSelector(selectApp);
  const dispatch = useAppDispatch();

  useEffect(() => {
    queueMicrotask(() => {
      dispatch(onAppStartAction());
    });
  }, [dispatch]);

  if (app.pageLoading === "loading" || user.loading === "loading") {
    return (
      <StyledIntermediateLayerWrapper>
        <StyledLoaderIndicator />
      </StyledIntermediateLayerWrapper>
    );
  }

  return props.children as JSX.Element;
}
