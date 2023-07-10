import { createFontFace } from "@utils/styles/helpers";
import { createGlobalStyle } from "styled-components";

export const Fonts = createGlobalStyle`
  ${createFontFace("Roboto", "./assets/fonts/Roboto/Roboto-Thin", 100)}
  ${createFontFace(
    "Roboto",
    "./assets/fonts/Roboto/Roboto-ThinItalic",
    100,
    "italic",
  )}
  ${createFontFace("Roboto", "./assets/fonts/Roboto/Roboto-Light", 300)}
  ${createFontFace(
    "Roboto",
    "./fonts/Roboto/Roboto-LightItalic",
    300,
    "italic",
  )}
  ${createFontFace("Roboto", "./assets/fonts/Roboto/Roboto-Regular", 400)}
  ${createFontFace(
    "Roboto",
    "./assets/fonts/Roboto/Roboto-Italic",
    400,
    "italic",
  )}
  ${createFontFace("Roboto", "./assets/fonts/Roboto/Roboto-Medium", 500)}
  ${createFontFace(
    "Roboto",
    "./fonts/Roboto/Roboto-MediumItalic",
    500,
    "italic",
  )}
  ${createFontFace("Roboto", "./assets/fonts/Roboto/Roboto-Bold", 700)}
  ${createFontFace(
    "Roboto",
    "./assets/fonts/Roboto/Roboto-BoldItalic",
    700,
    "italic",
  )}
  ${createFontFace("Roboto", "./assets/fonts/Roboto/Roboto-Black", 900)}
  ${createFontFace(
    "Roboto",
    "./fonts/Roboto/Roboto-BlackItalic",
    900,
    "italic",
  )}
`;
