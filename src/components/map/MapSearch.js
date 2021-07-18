import { geosearch } from 'esri-leaflet-geocoder';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const defaultCenter = [0, 0];
const defaultZoom = 4;
export default function MapSearch() {
  const mapRef = useRef();
  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    if (!map) return;

    const control = geosearch();

    control.addTo(map);

    control.on('results', handleOnSearchResuts);

    return () => {
      control.off('results', handleOnSearchResuts);
    };
  }, []);

  /**
   * handleOnSearchResuts
   * @param {object} data Results object from esri-leaflet-geocoder
   */

  function handleOnSearchResuts(data) {
    console.log('Search results', data);
  }

  return (
    <div className="App">
      <MapContainer ref={mapRef} center={defaultCenter} zoom={defaultZoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}
