import { AlgoliaProvider, SearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/assets/css/leaflet.css';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { CustomSearchProvider } from '.';

export default function SearchMap(props) {
  const map = useMap();

  useEffect(() => {
    const searchControl = new SearchControl({
      style: 'button',
      provider: new CustomSearchProvider(),
    });
    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [props.provider, map]);

  return null;
}
