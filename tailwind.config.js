const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(avatar|button|card|divider|dropdown|image|input|modal|toggle|user|ripple|spinner|menu|popover).js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#020912",
      },
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [nextui()],
};
