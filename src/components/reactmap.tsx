"use client";
import { useEffect, useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  ViewState,
} from "react-map-gl";
import { Input } from "./ui/input";

export const Fly = ({ setLat, setLon }: any) => {
  const [city, setCity] = useState("Delhi");
  const [places,setPlaces] = useState<any>([]);
  useEffect(() => {
    function getCoordinates() {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data: any) => {
          //setplaces
          setPlaces(data);
          // Longitude
          setLon(data.features[0].geometry.coordinates[0]);

          // // Latitude
          setLat(data.features[0].geometry.coordinates[1]);
        });
    }
    getCoordinates();
  }, [city]);
  return (
    console.log(places),
    <div>
      <h2>Enter a city name</h2>
      <div>
        <Input
        className="w-1/2"
          type="text"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        {/* {places.length >0 && places.map((place:any)=>(
          console.log(place.features),
          <div>
            <h2>{place.place_name}</h2>
          </div>
        ))} */}
      </div>
    </div>
  );
};

function Map2() {
  // Setting up the state for the latitude
  // and longitude
  const [lat, setLat] = useState(22.5726);
  const [lon, setLon] = useState(88.3639);

  // Setting up the state for the map
  const [viewport, setViewport] = useState({
    longitude: lon,
    latitude: lat,
    zoom: 15,
    bearing: 0,
    pitch: 0,
    padding: { top: 10, bottom: 10, left: 10, right: 10 },
  });

  // Map viewport updates whenever the
  // latitude and longitude changes
  useEffect(() => {
    setViewport({
      longitude: lon,
      latitude: lat,
      zoom: 15,
      bearing: 0,
      pitch: 0,
      padding: { top: 10, bottom: 10, left: 10, right: 10 },
    });
  }, [lat, lon]);

  return (
    <>
      <div className="w-1/2">
        <Fly setLat={setLat} setLon={setLon} />
      </div>
      <div>
        <ReactMapGL
          {...viewport}
          style={{ width: 800, height: 300 }}
          onMove={(event) => setViewport(event.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        >
          <Marker latitude={lat} longitude={lon}></Marker>
          <GeolocateControl position="top-left" />
          <NavigationControl position="top-left" />
        </ReactMapGL>
      </div>
    </>
  );
}

export default Map2;
