"use client"
import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import ReactMapGl, {Marker, Popup, ViewState, NavigationControl, GeolocateControl} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';


interface IProps {
    longitude: number,
    latitude: number,
    updateCoordinates: (longitude: any,latitude: any) => void;
}

export default function Map2({ longitude, latitude, updateCoordinates }:IProps){
    const mapRef = useRef<typeof ReactMapGl | null>(null);
    const [viewPort, setViewPort] = useState<ViewState>({
        latitude: 43,
        longitude: -79,
        zoom: 10,
        bearing:0,
        pitch:0,
        padding: {top:10, bottom:10, left:10, right:10},
    })
    const [marker, setMarker] = useState({
    latitude,
    longitude,
  });

     useEffect(() => {
    setViewPort((oldViewport) => ({
      ...oldViewport,
      latitude,
      longitude,
    }));
  }, [latitude,longitude]);

  const handleMarkerDrag = (event:any) => {
    const latitude = event.lngLat.lat;
    const longitude = event.lngLat.lng;

    setMarker({ latitude, longitude });

    updateCoordinates(latitude, longitude);
  };

    return <div className='text-black relative rounded-lg'>
        <ReactMapGl
        {...viewPort}
        onMove={event => setViewPort(event.viewState)}
        style={{width: 800, height: 300}}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        >
            <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          draggable={true}
          onDragEnd={handleMarkerDrag}
        ></Marker>
            
            {/* <GeolocateControl position='top-left'/> */}
            <NavigationControl position='top-left'/>
        </ReactMapGl>
    </div>
}