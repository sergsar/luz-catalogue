"use client";

import type {} from "@mui/material/themeCssVarsAugmentation"; // theme.vars typings
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "media",
  },
  colorSchemes: {
    light: true,
    dark: true,
  },
});

export default theme;
