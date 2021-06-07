require("dotenv").config()

const turf = require("@turf/turf")
const mapboxPolyline = require("@mapbox/polyline")

module.exports = {
  plugins: [
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      // resolve: "gatsby-source-google-mymaps",
      resolve: require.resolve(`..`),
      options: {
        ids: [
          "1mQBBrUWGSjjvetsWwZvozaiMlOBChuW2", // Iceland
        ],
        name: "travel",
        debug: true,
        transform: (node) => {
          const filterIndexOdd = (_, index) => index % 2 === 0
          const coords = node.layers[0].lineStrings
            .filter(filterIndexOdd)
            .reduce(
              (acc, lineString) => [...acc, ...lineString.coordinates],
              []
            )
          let coordinateString = ""
          for (const item of coords) {
            coordinateString +=
              "!4m3!3m2!1d" + item.latitude + "!2d" + item.longitude
          }
          const epochNow = Date.now()
          let googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m${
            coords.length * 4 + 16
          }`
          googleMapsEmbedUrl += `!1m12!1m3!1d1.0!2d${coords[0].latitude}!3d${coords[0].longitude}`
          googleMapsEmbedUrl += `!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1`
          googleMapsEmbedUrl += `!4m${
            coords.length * 4 + 1
          }!3e0${coordinateString}`
          googleMapsEmbedUrl += `!5e0!3m2!1sen!2sau!4v${epochNow}000!5m2!1sen!2sau`
          Object.assign(node, {
            coords,
            googleMapsEmbedUrl,
            data,
            //     route,
            //     polyline,
            //     points,
          })
        },
        // transform: (node) => {
        //   // Route
        //   const route = node.layers.reduce(
        //     (acc, layer) => [
        //       ...acc,
        //       ...layer.lineStrings.reduce(
        //         (acc, lineString) => [
        //           ...acc,
        //           ...lineString.coordinates.map(({latitude, longitude}) => [
        //             longitude,
        //             latitude,
        //           ]),
        //         ],
        //         []
        //       ),
        //     ],
        //     []
        //   )

        //   // Polyline
        //   const routeGeoJSON = {
        //     type: "Feature",
        //     geometry: {
        //       type: "LineString",
        //       coordinates: route,
        //     },
        //   }
        //   const simple = turf.simplify(routeGeoJSON, {tolerance: 0.01})
        //   const polyline = mapboxPolyline.fromGeoJSON(simple)
        //   //
        //   // // Points
        //   const points = node.layers
        //     .reduce((acc, layer) => [...acc, ...layer.points], [])
        //     .map((point) => {
        //       const turfPoint = turf.point([
        //         point.coordinates.longitude,
        //         point.coordinates.latitude,
        //       ])
        //       const turfLine = turf.lineString(route)
        //       const nearestPointOnLine = turf.nearestPointOnLine(
        //         turfLine,
        //         turfPoint
        //       )
        //       const [
        //         longitude,
        //         latitude,
        //       ] = nearestPointOnLine.geometry.coordinates
        //       const turfPoints = turf.featureCollection(
        //         route.map((coord) => turf.point(coord))
        //       )
        //       const nearestPoint = turf.nearestPoint(
        //         nearestPointOnLine,
        //         turfPoints
        //       )
        //       const nearestCoordinates = nearestPoint.geometry.coordinates
        //       const routeIndex = route.findIndex(
        //         (coord) =>
        //           coord[0] === nearestCoordinates[0] &&
        //           coord[1] === nearestCoordinates[1]
        //       )

        //       return {
        //         routeIndex,
        //         longitude,
        //         latitude,
        //       }
        //     })
        //     .sort((a, b) => (a.routeIndex > b.routeIndex ? 1 : -1))

        //   console.table(
        //     route.length,
        //     turf.simplify(routeGeoJSON, {tolerance: 0.001}).length
        //   )

        //   // Tranform
        //   // node.polyline = polyline
        //   Object.assign(node, {
        //     route,
        //     polyline,
        //     points,
        //   })
        // },
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-images"],
      },
    },
  ],
}
