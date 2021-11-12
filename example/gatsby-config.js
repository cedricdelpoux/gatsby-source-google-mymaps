require("dotenv").config()

const {transformMymaps} = require("./transform-mymaps")

module.exports = {
  plugins: [
    {
      // resolve: "gatsby-source-google-mymaps",
      resolve: require.resolve(`..`),
      options: {
        ids: ["1ulgu9lNgtBR0XeNVETN-dIfR2tRAis8q"],
        name: "travel",
        debug: true,
        transform: transformMymaps,
      },
    },
  ],
}
