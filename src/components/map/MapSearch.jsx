import React, { Component } from 'react';
import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import './Map.css';
import { useEffect } from 'react';

// import marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
});

export default function MapSearch() {
  var map = useMap();

  var searchControl = new ELG.Geosearch().addTo(map);

  var results = L.layerGroup().addTo(map);

  searchControl.on('results', function (data) {
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });

  return null;
}
