require("dotenv").config()

const {transformMymaps} = require("./transform-mymaps")

module.exports = {
  plugins: [
    {
      // resolve: "gatsby-source-google-mymaps",
      resolve: require.resolve(`..`),
      options: {
        ids: [process.env.GOOGLE_MYMAPS_ID],
        name: "travel",
        debug: true,
        transform: transformMymaps,
      },
    },
  ],
}
