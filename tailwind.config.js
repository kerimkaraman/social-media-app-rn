/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-darkgreen": "#07301e",
        "custom-green": "#1ED860",
        "custom-darkblue": "#1A1F22",
        "custom-red": "#BF0000",
        "custom-lightgrey": "#d9d9d9",
        "custom-verylightgrey": "#F9F8F8",
      },
    },
  },
  plugins: [],
};
