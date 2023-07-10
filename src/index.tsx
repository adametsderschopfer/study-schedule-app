import { Fonts } from "@utils/styles/Fonts";
import { GlobalStyles } from "@utils/styles/GlobalStyles";
import i18next from "i18next";
import { Normalize } from "styled-normalize";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { IntermediateLayer } from "@ui/components/intermediate-layer/IntermediateLayer";
import { PageActionLoader } from "@ui/components/page/page-action-loader/PageActionLoader";
import { store } from "@store/index";
import "@app/i18n";
import { NavigationContainer } from "@app/router/NavigationContainer";

const container = document.getElementById("app")!;
const root = createRoot(container);

Modal.setAppElement("#app");

root.render(
  <I18nextProvider i18n={i18next}>
    <Normalize />
    <GlobalStyles />
    <Fonts />

    <Provider store={store}>
      <IntermediateLayer>
        <BrowserRouter
          basename={process.env.NODE_ENV === "development" ? "/" : "new"}>
          <PageActionLoader />

          <ToastContainer
            position={"top-right"}
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            draggable={true}
            theme={"light"}
          />

          <ErrorBoundary>
            <NavigationContainer />
          </ErrorBoundary>
        </BrowserRouter>
      </IntermediateLayer>
    </Provider>
  </I18nextProvider>,
);
