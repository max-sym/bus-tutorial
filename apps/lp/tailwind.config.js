module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-radial-hero":
          "radial-gradient(farthest-corner at 20% 50%,#ffffffff 0%, #88A4BF 120%);",
      },
      boxShadow: {
        "green-light": "0 3px 15px 0 rgba(100, 255, 100, 0.4)",
        "green-light2": "0 2px 15px 0 rgba(100, 255, 100, 0.8)",
      },
      fontFamily: {
        title: ["'Montserrat'"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
