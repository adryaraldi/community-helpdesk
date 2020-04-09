import customButtonThemes from "./customButtonThemes";
import customInputThemes from "./customInputThemes";

export const lightTheme = {
  body: "#FFFFFF",
  primary: "#37474F",
  text: "#37474F",
  ...customButtonThemes.lightTheme,
  ...customInputThemes.lightTheme,
};

export const darkTheme = {
  body: "#263238",
  primary: "#FFFFFF",
  text: "#FFFFFF",
  ...customButtonThemes.darkTheme,
  ...customInputThemes.darkTheme,
};

export const variables = {
  text_m: "14pt",
  weight_m: "600",
  radius_m: "2pt",
};
