import type { Config } from "tailwindcss";

import defaultTheme from "tailwindcss/defaultTheme";

const FONT_FAMILY = {
  monaSans: "Mona Sans",
} as const;

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-fast": "spin 0.8s linear infinite",
      },
    },
    fontFamily: {
      sans: [FONT_FAMILY.monaSans, ...defaultTheme.fontFamily.sans],
    },
  },
} satisfies Config;
