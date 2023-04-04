/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "body-background": "url('../backgroundImage2.png)",
      },
    },
  },
  plugins: [],
};
