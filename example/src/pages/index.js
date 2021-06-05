import {graphql} from "gatsby"
import React from "react"

export default ({data}) => {
  return (
    <div>
      {/* {data.allGoogleMyMaps.nodes.map(({googleMapsEmbedUrl, index}) => (
        <iframe
          title={index}
          src={googleMapsEmbedUrl}
          width="600"
          height="450"
          frameborder="0"
          style={{border: 0}}
          allowfullscreen=""
          aria-hidden="false"
        ></iframe>
      ))} */}
      {data.allGoogleMyMaps.nodes.map(({coords, index}) => {
        let coordinateString = ""
        for (const item of coords) {
          coordinateString +=
            "!4m3!3m2!1d" + item.latitude + "!2d" + item.longitude
        }
        const data = `!4m${coords.length * 4 + 1}!3e0${coordinateString}`
        return (
          <a
            href={`https://www.google.com/maps/dir/${coords[0].latitude},${
              coords[0].longitude
            }/${coords[coords.length - 1].latitude},${
              coords[coords.length - 1].longitude
            }/@${coords[0].latitude},${
              coords[0].longitude
            },16.08z/data=${data}`}
          >
            Test
          </a>
        )
      })}
    </div>
  )
}

export const pageQuery = graphql`
  query Index {
    allGoogleMyMaps {
      nodes {
        coords {
          latitude
          longitude
        }
        googleMapsEmbedUrl
      }
    }
  }
`
