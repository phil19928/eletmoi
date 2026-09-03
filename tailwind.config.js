/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7A9E88",
          dark: "#4D7A65",
          light: "#A9C4B6",
          "very-light": "#EDF3F0",
        },
        secondary: {
          DEFAULT: "#6D98C2",
          dark: "#4F7FAE",
          light: "#8EB6D8",
          "very-light": "#EAF2FB",
        },
        accent: "#F59E0B",
      },
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
        display: ["Roboto", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(-5px) rotate(-1deg)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.4" },
          "80%, 100%": { transform: "scale(1.5)", opacity: "0" },
        },
        // Entrées « au-dessus de la ligne de flottaison ». Reprennent les
        // valeurs que framer-motion appliquait, mais en CSS : une animation
        // CSS démarre à la première peinture, alors qu'une animation JS
        // attend l'hydratation de React — environ une seconde de texte
        // invisible sur un mobile lent.
        enter: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "enter-nav": {
          "0%": { opacity: "0", transform: "translateY(-80px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "enter-phone": {
          "0%": { opacity: "0", transform: "scale(0.9) translateY(30px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "fade-in-down": "fade-in-down 0.6s ease-out forwards",
        float: "float 5s ease-in-out infinite",
        "scale-in": "scale-in 0.6s ease-out forwards",
        "spin-slow": "spin-slow 20s linear infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        // `both` et non `forwards` : sans l'état initial appliqué pendant le
        // délai, l'élément clignote (visible, puis masqué au démarrage).
        enter: "enter 0.5s ease-out both",
        "enter-nav": "enter-nav 0.6s ease-out both",
        "enter-phone": "enter-phone 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};
