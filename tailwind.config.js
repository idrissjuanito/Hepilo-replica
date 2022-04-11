module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      width: {
        container: "95%",
        70: "70%",
      },
      minWidth: {
        "1/2": "50%",
        "1/4": "25%",
        6: "3.4rem",
      },
      maxWidth: {
        "1/3": "33%",
        "4/5": "80%",
        70: "70%",
      },
      fontFamily: {
        rob: ["Roboto", "sans-serif"],
      },
      colors: {
        accent: "hsl(62, 61%, 48%)",
      },
      backgroundImage: {
        "hero-dark": "url('./assets/home-hero-dark.png')",
        "home-budget": "url('./assets/home-budget-dark.png')",
        "home-github": "url('./assets/home-github-dark.png')",
      },
      flexBasis: {
        70: "70%",
        30: "30%",
      },
    },
  },
  plugins: [],
};
