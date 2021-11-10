const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/pages/*.js", "./src/components/**/*.js"],
  theme: {},
};
