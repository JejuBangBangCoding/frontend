/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Pretendard: ["Pretendard"],
        SBAggro: ["SBAggro"],
      },
    },
    container: {
      center: true,
      screens: {
        DEFAULT: "calc(500 / 1024 * 100dvh)",
      },
    },
  },
  plugins: [],
};
