module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      Lato:['Lato','sans-serif']
    },
    extend: {
      colors: {
        fullBG:"#636059",
        sideBG:"#C0C9CC",
        topBG:"#C0C9CC",
        rightBG:"#A39D92",
        hoverBG:"#F2F1F0",
        viewBG:"#FFFDD0"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
