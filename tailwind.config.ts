import type { Config } from "tailwindcss";

import plugin from "tailwindcss/plugin";
import defaultTheme from "tailwindcss/defaultTheme";

const FONT_FAMILY = {
  monaSans: "Mona Sans",
} as const;

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: [FONT_FAMILY.monaSans, ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("ra-hovered", "&[data-hovered]");
      addVariant("ra-pressed", "&[data-pressed]");
      addVariant("ra-focused", "&[data-focused]");
      addVariant("ra-focus-visible", "&[data-focus-visible]");
      addVariant("ra-disabled", "&[data-disabled]");
    }),
  ],
} satisfies Config;
