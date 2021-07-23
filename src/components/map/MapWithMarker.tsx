import { makeStyles } from '@material-ui/core';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import * as React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import SetMarker from './SetMarker';

interface MapWithMarkerProps {
  position?: LatLngExpression;
}
const useStyle = makeStyles((theme) => ({
  root: {
    height: '40vh',
    borderRadius: '10px',
    overflow: 'hidden',
    marginTop: '0px',
    border: '2px solid purple',
  },
}));

export default function MapWithMarker({ position }: MapWithMarkerProps) {
  const center: LatLngExpression = [10.772461, 106.698055];
  const classes = useStyle();
  // const map = useMap();
  // map.flyTo(position || center);
  return (
    <MapContainer
      center={position === undefined ? center : position}
      zoom={16}
      scrollWheelZoom={true}
      className={classes.root}
      whenCreated={(map) => {
        L.control
          .fullscreen({
            position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
            title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
            titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen

            forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
            forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
            fullscreenElement: false, // Dom element to render in full screen, false by default, fallback to map._container
          })
          .addTo(map);
      }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetMarker position={position} />
    </MapContainer>
  );
}
