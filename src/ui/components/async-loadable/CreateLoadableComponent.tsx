import React from "react";
import Loadable, {
  LoadableComponent,
  LoadingComponentProps,
  Options,
} from "react-loadable";
import { RequestError } from "@ui/components/error-view/error-view-variants/RequestError";
import { PageLoader } from "@ui/components/page-loader/PageLoader";

const LoadingComponent: React.FC<LoadingComponentProps> = (props) => {
  if (props.error || props.timedOut) {
    return <RequestError retry={props.retry} />;
  } else if (props.pastDelay) {
    return <PageLoader />;
  } else {
    return null;
  }
};

export const createLoadableComponent = <T,>(
  options: Partial<Options<T, any>>,
): React.ComponentType<T> & LoadableComponent =>
  Loadable(
    Object.assign(
      {
        loading: LoadingComponent,
      },
      options as Options<T, any>,
    ),
  );
