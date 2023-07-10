import React, { PropsWithChildren } from "react";
import { ErrorView } from "@ui/components/error-view/ErrorView";

export class ErrorBoundary extends React.Component<PropsWithChildren> {
  state = { hasError: false };

  constructor(props: PropsWithChildren) {
    super(props);
  }

  static getDerivedStateFromError(error: unknown): { hasError: boolean } {
    console.log(
      `%c[ERROR BOUNDARY EXCEPTION]:`,
      "color: red; background: yellow; font-size: 18px",
    );
    console.error(error);
    return { hasError: true };
  }

  render(): React.ReactNode | undefined {
    if (this.state.hasError) {
      return <ErrorView />;
    }

    return this.props.children;
  }
}
