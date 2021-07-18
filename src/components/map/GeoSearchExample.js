import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

//here you can add some styles
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';

export default class GeoSearchExample extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  render() {
    const prov = OpenStreetMapProvider();
    const GeoSearchControlElement = SearchControl;

    return (
      <MapContainer center={[42.09618442380296, -71.5045166015625]} zoom={2} zoomControl={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <GeoSearchControlElement
          provider={prov}
          showMarker={true}
          showPopup={false}
          maxMarkers={3}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={false}
          searchLabel={'Enter address, please'}
          keepResult={true}
          popupFormat={({ query, result }) => result.label}
        />
      </MapContainer>
    );
  }
}
