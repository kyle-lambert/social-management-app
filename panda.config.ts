import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  outExtension: "js",
  preflight: true,
  include: ["./app/**/*.{ts,tsx,js,jsx}"],
  exclude: [],
  conditions: {
    extend: {
      ariaHovered: "&:is([data-hovered])",
      ariaPressed: "&:is([data-pressed])",
      ariaFocused: "&:is([data-focused])",
      ariaFocusVisible: "&:is([data-focus-visible])",
      ariaDisabled: "&:is([data-disabled])",
    },
  },
  strictTokens: true,
  outdir: "styled-system",
});
