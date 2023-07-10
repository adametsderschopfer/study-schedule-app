import React from "react";
import ReactModal from "react-modal";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { StyledLoaderIndicator } from "@ui/components/loader-indicator";
import {
  StyledBaseModalBody,
  StyledBaseModalBodyLoadingWrapper,
  StyledBaseModalHead,
  StyledBaseModalHeadClose,
  StyledBaseModalHeadTitle,
} from "@ui/components/modals/styled";
import { TLoading } from "@domain/store";

type BaseModalProps = Omit<ReactModal.Props, "isOpen"> & {
  headerTitle: string;
  loading?: TLoading;
  isOpen?: boolean | undefined;
};

export const BaseModal: React.FC<BaseModalProps> = (props) => {
  return (
    <ReactModal
      shouldCloseOnOverlayClick={false}
      closeTimeoutMS={100}
      {...(props as ReactModal.Props)}>
      <StyledBaseModalHead>
        <StyledBaseModalHeadTitle>{props.headerTitle}</StyledBaseModalHeadTitle>

        <StyledBaseModalHeadClose onClick={props.onRequestClose}>
          <svg
            width={"19"}
            height={"19"}
            viewBox={"0 0 19 19"}
            fill={"none"}
            xmlns={"http://www.w3.org/2000/svg"}>
            <path
              fillRule={"evenodd"}
              clipRule={"evenodd"}
              d={
                "M1.82843 0L0.414214 1.41422L8 9L0 17L1.41421 18.4142L9.41421 10.4142L17.3848 18.3848L18.799 16.9706L10.8284 9L18.3848 1.44365L16.9706 0.0294391L9.41421 7.58579L1.82843 0Z"
              }
              fill={"currentColor"}
            />
          </svg>
        </StyledBaseModalHeadClose>
      </StyledBaseModalHead>

      <StyledBaseModalBody>
        {props.loading === "loading" ? (
          <StyledBaseModalBodyLoadingWrapper>
            <StyledLoaderIndicator />
          </StyledBaseModalBodyLoadingWrapper>
        ) : null}

        <ErrorBoundary>{props.children}</ErrorBoundary>
      </StyledBaseModalBody>
    </ReactModal>
  );
};

BaseModal.defaultProps = {
  isOpen: false,
};
