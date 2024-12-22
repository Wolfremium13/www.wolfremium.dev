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
                "primary-light": "#8bd450",
                "primary": "#1d1a2f",
                "primary-dark": "#1d1a2f",
                "secondary-dark": "#965fd4",
                "secondary": "#ff5722",
                "secondary-light": "#734f9a",
                "neutral-light": "#ffffff",
                "neutral-mid-light": "#f1f1f1",
                "neutral": "#404041",
                "neutral-dark": "#1d1a2f",
                "alert-light": "#ffdcdc",
                "alert": "#ff0000",
                "alert-dark": "#cc0000",
                "warning-light": "#ffffcc",
                "warning": "#ffcc00",
                "warning-dark": "#cc9900",
                "success-light": "#ccffcc",
                "success": "#00ff00",
                "success-dark": "#00cc00"
            },
            backgroundImage: {
                'confetti': "url('/layout/bg-confetti.svg')",
                'kakashi-svg': "url('/layout/kakashi-hatake-background-cleaned.svg')",
            }
        },
    },
    plugins: [],
};
