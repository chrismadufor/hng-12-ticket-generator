/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        strokeColor: "#197686",
        strokeMain: "#0E464F",
        strokeMainTwo: "#07373F",
        strokeMainThree: "#133D44",
        strokeLight: "#D9D9D9",
        darkText: "#0A0C11",
        inactiveText: "#B3B3B3",
        primary: "#041E23",
        primaryTwo: "#08252B",
        primaryThree: "#08343C",
        primaryThree: "#052228",
        secondary: "#24A0B5",
        hoverBg: "#2C545B",
        selectedBg: "#12464E"
      },
    },
  },
  plugins: [],
};
