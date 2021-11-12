import React from "react"

const TOKEN = process.env.GATSBY_MAPBOX_TOKEN

export const useMapbox = (polyline) => {
  const polylineEncoded = encodeURIComponent(polyline)
  const style = `mapbox/light-v10`
  const pathColor = "4794e6"
  return `https://api.mapbox.com/styles/v1/${style}/static/path+${pathColor}(${polylineEncoded})/auto/500x300@2x?access_token=${TOKEN}&logo=false&attribution=false`
}

export const Map = ({name, polyline, ...props}) => {
  const mapUrl = useMapbox(polyline)
  return (
    <div {...props}>
      <h2>{name}</h2>
      <img src={mapUrl} alt={name} />
    </div>
  )
}
