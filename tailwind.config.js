const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/pages/*.js", "./src/components/**/*.js"],
  theme: {
    extend: {
      spacing: {
        big: "120rem",
        half:"60rem"
      },
      borderRadius: {
        oval: "50%",
        blob: "74% 30% 30% 70% / 60% 40% 60% 40%;",
    },
  },
},
};
