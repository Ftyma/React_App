/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        orange: "#F16F22",
        blue: "#008ECF",
        purple: "#9E28B5",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
