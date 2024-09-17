/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        modBlue: "hsl(238, 40%, 52%)",
        softRed: "hsl(358, 79%, 66%)",
        lightGrayBlue: "hsl(239, 57%, 85%)",
        paleRed: "hsl(239, 57%, 85%)",
        darkBlue: "hsl(212, 24%, 26%)",
        grayBlue: "hsl(211, 10%, 45%)",
        lightGray: "hsl(223, 19%, 93%)",
        lighterGray: "hsl(228, 33%, 97%)",
      },
      fontFamily: {
        rubik: ["Rubik", "sans"],
      },
    },
  },
  plugins: [],
};
