/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "background-body": "url('../../../public/Images/background.png')",
      },
    },
  },
  plugins: [],
};
