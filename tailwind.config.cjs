/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      "red-hat-mono": ["Red Hat Mono", "monospace"]
      }
    },
  },
  plugins: [],
}