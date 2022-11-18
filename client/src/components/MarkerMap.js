import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { breakAddr } from "../helpers/utils";
import "./MarkerMap.css";
// Global Leaflet variable; only necessary for the green marker.
// Everything else is provided by React Leaflet
const L = window.L;

function MarkerMap(props) {
  // By default Leaflet only comes with blue markers. We want green too!
  // https://github.com/pointhi/leaflet-color-markers
  let greenMarker = new L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    nameAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  // let carMarker = new L.icon({
  //   iconUrl:
  //     "https://mpng.subpng.com/20180723/yxq/kisspng-computer-icons-desktop-wallpaper-clip-art-car-icon-black-5b569791f20cf8.3936918815324015539915.jpg",

  //   iconSize: [80, 80],
  //   iconAnchor: [12, 41],
  //   nameAnchor: [1, -34],
  // });

  return (
    <MapContainer
      className="MarkerMap"
      center={props.home}
      zoom={props.zoom}
      // {!props.places && zoom={3}}
      style={{ height: "500px" }} // you MUST specify map height, else it will be 0!
    >
      {/* Create the tile layer that shows the map */}
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Draw the green "YOU ARE HERE" marker */}
      {/* {props.home && (
        <Marker position={props.home}>
          <Popup>YOU ARE HERE</Popup>
        </Marker>
      )} */}

      {/* Draw a blue marker for each of the places passed as prop */}
      {props.places.map((p) => (
        <Marker
          key={p.title}
          position={[p.latitude, p.longitude]}
          icon={greenMarker}
        >
          <Popup>
            {breakAddr(p.title)}{" "}
            {/* <button type="button" onClick={(e) => props.updateMarker(p.id)}>
              &#x2713;
            </button> */}
            {/* <button
              type="buttonMarker"
              onClick={(e) => props.deleteMarker(p.id)}
            >
              X
            </button> */}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MarkerMap;
