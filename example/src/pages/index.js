import {graphql} from "gatsby"
import React from "react"

import {Map} from "../components/map"

const PageIndex = ({data}) => {
  return (
    <div>
      {data.allGoogleMyMaps.nodes.map((node) => (
        <Map name={node.name} polyline={node.polyline} />
      ))}
    </div>
  )
}

export default PageIndex

export const pageQuery = graphql`
  query Index {
    allGoogleMyMaps {
      nodes {
        name
        polyline
      }
    }
  }
`
