const baseConfig = require("@bus/ui/tailwind.config")

module.exports = {
  ...baseConfig,
  content: ["./src/**/*.{html,js,ts,tsx}", "../ui/src/**/*.{html,js,ts,tsx}"],
}
