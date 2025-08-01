// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // This is the most important part. It tells Tailwind which files to scan//
  // for class names. Make sure the paths are correct for your project structure.//
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
