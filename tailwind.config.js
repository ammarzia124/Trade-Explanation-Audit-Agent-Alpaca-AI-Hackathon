/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Amna's theme colors (from her screenshot)
        'dark-bg': '#0D1117',
        'dark-card': '#161B22',
        'dark-border': '#30363D',
        'text-primary': '#FFFFFF',
        'text-secondary': '#8B949E',
        'accent-blue': '#58A6FF',
        'accent-green': '#3FB950',
        'accent-red': '#F85149',
        'accent-yellow': '#D29922',
        'risk-low': '#3FB950',
        'risk-medium': '#D29922',
        'risk-high': '#F85149',
      },
    },
  },
  plugins: [],
};