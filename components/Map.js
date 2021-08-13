import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  const coordinates = searchResults.map((s) => ({
    longitude: s.long,
    latitude: s.lat,
  }));

  const center = getCenter(coordinates);

  console.log(`object`, coordinates);

  const [selectedLocation, setSelectedLocation] = useState({});

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/smani1211/cksacu9rn3xnv18p1w00zq2s3"
      mapboxApiAccessToken={process.env.mapbox_key}
      onViewportChange={(nextViewPort) => setViewport(nextViewPort)}
    >
      {searchResults?.map((r) => (
        <div key={r.long}>
          <Marker
            longitude={r.long}
            latitude={r.lat}
            offsetLeft={-10}
            offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLocation(r)}
              aria-label="push-pin"
              role="img"
              className="cursor-pointer text-2xl animate-bounce "
            >
              🤗😍
            </p>
          </Marker>

          {selectedLocation.long === r.long ? (
            <Popup
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              latitude={r.lat}
              longitude={r.long}
            >
              {r.title}
            </Popup>
          ) : null}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
