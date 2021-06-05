const fastXmlParser = require("fast-xml-parser")
const request = require("request")

const coordinatesStringToObject = (coordinatesString) => {
  const [longitude, latitude] = coordinatesString.trim().split(",")
  return {
    longitude: parseFloat(longitude),
    latitude: parseFloat(latitude),
  }
}

const transformCoordinates = (coordinates) => {
  return coordinates
    .split("\n")
    .filter((coord) => coord && coord.length > 0)
    .map(coordinatesStringToObject)
}

const getMyMaps = async (id) => {
  return new Promise((resolve, reject) => {
    try {
      request(
        `http://www.google.com/maps/d/kml?forcekml=1&mid=${id}`,
        {},
        (err, res, body) => {
          if (err) {
            reject(err)
          }

          if (body && fastXmlParser.validate(body) === true) {
            const {
              kml: {Document},
            } = fastXmlParser.parse(body)
            const folders = Array.isArray(Document.Folder)
              ? Document.Folder
              : [Document.Folder]
            const myMaps = {
              name: Document.name,
              description: Document.description,
              layers: folders.map((folder) => {
                const placemarks = Array.isArray(folder.Placemark)
                  ? folder.Placemark
                  : [folder.Placemark]
                return {
                  name: folder.name,
                  lineStrings: placemarks
                    .filter((object) =>
                      Object.prototype.hasOwnProperty.call(object, "LineString")
                    )
                    .map((object) => ({
                      name: object.name,
                      coordinates: transformCoordinates(
                        object.LineString.coordinates
                      ),
                    })),
                  points: placemarks
                    .filter((object) =>
                      Object.prototype.hasOwnProperty.call(object, "Point")
                    )
                    .map((object) => ({
                      name: object.name,
                      coordinates: coordinatesStringToObject(
                        object.Point.coordinates
                      ),
                    })),
                }
              }),
            }
            resolve(myMaps)
          } else {
            reject("Error while fetching Google MyMaps " + id)
          }
        }
      )
    } catch (e) {
      reject(e)
    }
  })
}

exports.sourceNodes = async (
  {actions, createNodeId, createContentDigest, reporter},
  pluginOptions = {}
) => {
  if (!pluginOptions.ids || !Array.isArray(pluginOptions.ids)) {
    return
  }

  const timer = reporter.activityTimer(
    `source-google-mymaps: Creating GoogleMyMaps nodes`
  )

  if (pluginOptions.debug) {
    timer.start()
  }

  try {
    await Promise.all(
      pluginOptions.ids.map(async (myMapsId) => {
        const myMaps = await getMyMaps(myMapsId)

        if (
          pluginOptions.transform &&
          typeof pluginOptions.transform === "function"
        ) {
          pluginOptions.transform(myMaps)
        }

        await actions.createNode({
          id: createNodeId(`GoogleMyMaps-${myMaps.name}`),
          internal: {
            type: "GoogleMyMaps",
            content: JSON.stringify(myMaps),
            contentDigest: createContentDigest(myMaps),
          },
          sourceName: pluginOptions.name || undefined,
          ...myMaps,
        })

        if (pluginOptions.debug) {
          timer.setStatus(myMaps.name)
        }
      })
    )
  } catch (e) {
    reporter.panic(`source-google-mymaps: ${e.message}`)
  }

  if (pluginOptions.debug) {
    timer.end()
  }

  return
}

exports.createSchemaCustomization = ({actions}) => {
  const {createTypes} = actions
  const typeDefs = `
    type GoogleMyMaps implements Node {
      name: String!
      description: String
      layers: [Layer!]!
    }

    type Layer {
      name: String!
      lineStrings: [LineString!]!
      points: [Point!]!
    }

    type LineString {
      name: String!
      coordinates: [Coordinate]
    }

    type Point {
      name: String!
      coordinates: Coordinate
    }

    type Coordinate {
      longitude: Float!
      latitude: Float!
    }
  `

  createTypes(typeDefs)
}
