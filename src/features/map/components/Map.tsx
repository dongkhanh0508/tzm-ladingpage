import * as React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { makeStyles } from '@material-ui/core';

interface MapProps {}
const useStyle = makeStyles((theme) => ({
  root: {
    height: '85vh',
    borderRadius: '10px',
    overflow: 'hidden',
    marginTop: '-39px',
  },
}));
function LocationMarker() {
  const [position, setPosition] = React.useState(new L.LatLng(10.772461, 106.698055));
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
export default function App(props: MapProps) {
  const classes = useStyle();
  return (
    <MapContainer
      center={{ lat: 10.772461, lng: 106.698055 }}
      zoom={16}
      scrollWheelZoom={true}
      className={classes.root}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}
