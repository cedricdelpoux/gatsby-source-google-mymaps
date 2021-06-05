// const turf = require("@turf/turf")
// const mapboxPolyline = require("@mapbox/polyline")

// exports.createSchemaCustomization = ({actions, schema}) => {
//   actions.createTypes([
//     schema.buildObjectType({
//       name: "GoogleMyMaps",
//       interfaces: ["Node"],
//       fields: {
//         country: {
//           type: "String!",
//           resolve: (node) => node.name,
//         },
//       },
//     }),
//   ])
// }

// exports.createSchemaCustomization = ({actions}) => {
//   const {createTypes} = actions
//   const typeDefs = `
//     interface Coordinate {
//       latitude: String!
//       longitude: String!
//     }
//   `
//   createTypes(typeDefs)
// }
//
// exports.createResolvers = ({
//   actions,
//   cache,
//   createNodeId,
//   createResolvers,
//   store,
//   reporter,
// }) => {
//   const {createNode} = actions
//   const resolvers = {
//     GoogleMyMaps: {
//       country: {
//         type: `String`,
//         resolve: (source, args, context, info) => {
//           return source.name
//         },
//       },
//       route: {
//         type: "[Coordinate!]!",
//         resolve: (source) => {
//           return source.layers.reduce(
//             (acc, layer) => [
//               ...acc,
//               ...layer.lineStrings.reduce(
//                 (acc, lineString) => [...acc, ...lineString.coordinates],
//                 []
//               ),
//             ],
//             []
//           )
//         },
//       },
//       polyline: {
//         type: "String!",
//         resolve: (source) => {
//           const route = source.layers.reduce(
//             (acc, layer) => [
//               ...acc,
//               ...layer.lineStrings.reduce(
//                 (acc, lineString) => [...acc, ...lineString.coordinates],
//                 []
//               ),
//             ],
//             []
//           )
//           const routeGeoJSON = {
//             type: "Feature",
//             geometry: {
//               type: "LineString",
//               coordinates: route.map(({latitude, longitude}) => [
//                 longitude,
//                 latitude,
//               ]),
//             },
//           }
//           const simple = turf.simplify(routeGeoJSON, {tolerance: 0.01})
//           const polyline = mapboxPolyline.fromGeoJSON(simple)
//           return polyline
//         },
//       },
//     },
//   }
//   createResolvers(resolvers)
// }

// exports.onCreateNode = ({node, cache, actions}) => {
//   if (node.internal.type === "GoogleMyMaps") {
//     actions.createNodeField({
//       node,
//       name: "country",
//       value: node.name,
//     })
//     console.log(node.name)
//     console.log(
//       actions.createNodeField({
//         node,
//         name: "test",
//         value: "test",
//       })
//     )
//     // Route
//     // const route = node.layers.reduce(
//     //   (acc, layer) => [
//     //     ...acc,
//     //     ...layer.lineStrings.reduce(
//     //       (acc, lineString) => [
//     //         ...acc,
//     //         ...lineString.coordinates.map(({latitude, longitude}) => [
//     //           longitude,
//     //           latitude,
//     //         ]),
//     //       ],
//     //       []
//     //     ),
//     //   ],
//     //   []
//     // )
//     // console.log(route)
//     // node.route = route
//
//     // const routeGeoJSON = {
//     //   type: "Feature",
//     //   geometry: {
//     //     type: "LineString",
//     //     coordinates: route,
//     //   },
//     // }
//     // const simple = turf.simplify(routeGeoJSON, {tolerance: 0.01})
//     // const polyline = mapboxPolyline.fromGeoJSON(simple)
//
//     // await cache.set("mymaps-" + node.name, node.id)
//     // await cache.set("polyline-" + node.name, polyline)
//
//     // actions.createNodeField({
//     //   node,
//     //   name: "polyline",
//     //   value: polyline,
//     // })
//     // console.log("createNodeField", polyline)
//
//     //
//     //
//     //     // Points
//     //     const points = node.layers
//     //       .reduce((acc, layer) => [...acc, ...layer.points], [])
//     //       .map((point) => {
//     //         const turfPoint = turf.point([
//     //           point.coordinates.longitude,
//     //           point.coordinates.latitude,
//     //         ])
//     //         const turfLine = turf.lineString(route)
//     //         const nearestPointOnLine = turf.nearestPointOnLine(turfLine, turfPoint)
//     //         const [longitude, latitude] = nearestPointOnLine.geometry.coordinates
//     //         const turfPoints = turf.featureCollection(
//     //           route.map((coord) => turf.point(coord))
//     //         )
//     //         const nearestPoint = turf.nearestPoint(nearestPointOnLine, turfPoints)
//     //         const nearestCoordinates = nearestPoint.geometry.coordinates
//     //         const routeIndex = route.findIndex(
//     //           (coord) =>
//     //             coord[0] === nearestCoordinates[0] &&
//     //             coord[1] === nearestCoordinates[1]
//     //         )
//     //
//     //         return {
//     //           routeIndex,
//     //           longitude,
//     //           latitude,
//     //         }
//     //       })
//     //       .sort((a, b) => (a.routeIndex > b.routeIndex ? 1 : -1))
//     //
//     //     node.points = points
//   }
// }
