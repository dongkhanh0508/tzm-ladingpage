import 'leaflet/dist/leaflet.css';
import * as React from 'react';
import Map from '../components/Map';
import '../style.css';

interface BrandMapProps {}

export default function BrandMap(props: BrandMapProps) {
  return (
    <>
      <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4"></div>
        </div>
      </div>

      <div className="px-3 md:px-8 h-auto -mt-28 mb-16">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 h-[600px]">
            <div className="relative w-full rounded-xl shadow-lg">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
