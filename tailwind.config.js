/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGreen: "#3f6d4e",
        lightGreen: "#8bd450",
        darkViolet: "#1d1a2f",
        mediumViolet: "#965fd4",
        lightViolet: "#734f9a",
      },
      backgroundImage: {
        'confetti': "url('/layout/bg-confetti.svg')",
      }
    },
  },
  plugins: [],
};
