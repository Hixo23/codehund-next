import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        text: "#e4e4f2",
        background: "#0c0d1a",
        primary: "#9d9cd1",
        secondary: "#603979",
        accent: "#a65db3",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
