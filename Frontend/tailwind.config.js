/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        themeBg: "linear-gradient(to right, #b24592, #e57498)",
      },
      colors: {
        themePink: "#b24592",
      },
    },
  },
  plugins: [],
};
