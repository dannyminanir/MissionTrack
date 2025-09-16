// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: {
          10: "#cfe3ff",
          50: "#3b82f6",
        },
        accent: {
          10: "#6ee7b7",
        },
      },
    },
  },
  plugins: [],
};
