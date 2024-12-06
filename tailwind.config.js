/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGreen: "#3f6d4e",
        lightGreen: "#8bd450",
        lightOrange: "#ff5722",
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
