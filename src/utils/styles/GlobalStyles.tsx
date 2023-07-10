import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    position: relative;
    font-family: Roboto, sans-serif;
    box-sizing: border-box;
    height: 100%;
    font-size: 16px;
    scroll-behavior: smooth;
    overflow-y: scroll;

    background-color: #f6f6f6;
  }

  * {
    font-family: Roboto, sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  #app {
    position: relative;
  }

  a {
    text-decoration: none;
  }

  *::-webkit-scrollbar {
    width: 8px;
  }

  *::-webkit-scrollbar-track {
    background-color: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #dadada;
    border-radius: 2px;
  }

  .ReactModal__Overlay {
    z-index: 100;
  }

  .ReactModal__Content {
    top: 50% !important;
    left: 50% !important;
    right: auto !important;
    bottom: auto !important;
    margin-right: -50% !important;
    transform: translate(-50%, -50%) scale(0.8) !important;
    border: none !important;
    border-radius: 2px;
    padding: 0 !important;
    min-width: 520px;
    overflow: visible !important;

    box-shadow: 0 4px 20px rgba(61, 92, 109, 0.1);
  }

  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 100ms;
  }

  .ReactModal__Content {
    transition: transform 100ms;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;

    & .ReactModal__Content {
      transform: translate(-50%, -50%) scale(1) !important;
    }
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;

    & .ReactModal__Content {
      transform: translate(-50%, -50%) scale(0.8) !important;
    }
  }

  button {
    outline: none;
  }
`;
