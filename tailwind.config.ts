import type { Config } from "tailwindcss";

import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mona Sans", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: "480px",
      },
      animation: {
        "spin-fast": "spin 0.7s linear infinite",
      },
    },
  },
} satisfies Config;
