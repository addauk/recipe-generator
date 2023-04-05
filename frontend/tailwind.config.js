/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "background-body": "url('../../../public/Images/background2.jpg')",
      },
      colors: {
        "pastel-green": "#B7D7C4",
        "pastel-yellow": "#FAFAD2",
      },
    },
  },
  plugins: [],
};
