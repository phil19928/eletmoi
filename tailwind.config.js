/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#11d4b4",
        "primary-dark": "#0db397",
        "accent-coral": "#FF7F50",
        "accent-coral-hover": "#e5673d",
        "background-light": "#f6f8f8",
        "background-dark": "#10221f",
        "surface-light": "#ffffff",
        "surface-dark": "#162e2a",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
