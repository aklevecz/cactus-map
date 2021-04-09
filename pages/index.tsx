import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  version: "weekly",
});
const Map = () => {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    let map: google.maps.Map, infoWindow: google.maps.InfoWindow;

    loader.load().then(() => {
      const lat = 32.329656,
        lng = -111.168146;

      map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat, lng },
          zoom: 20,
          styles: require("./mapstyles.json"),
          // disableDefaultUI: true,
        } as google.maps.MapOptions
      );

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        icon: {
          url: "silver-raptor.svg",
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(12, 12),
          scaledSize: new google.maps.Size(40, 40),
        },
      });

      const elDiabloPos = { lat: 32.329701, lng: -111.168365 };

      const eldiabloMarker = new google.maps.Marker({
        position: elDiabloPos,
        map,
        icon: "eldiablo.svg",
      });

      eldiabloMarker.addListener("click", () => {
        setShowPopup(true);
      });

      const userMaker = new google.maps.Marker({
        map,
        icon: "running-icon.svg",
      });
      userMaker.setPosition({ lat, lng });

      infoWindow = new google.maps.InfoWindow();

      const locationButton = document.createElement("div");
      const img = document.createElement("img");
      img.src = "triangulate.svg";
      locationButton.appendChild(img);
      // locationButton.textContent = "~find yourself~";
      locationButton.classList.add("custom-map-control-button");

      map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
        locationButton
      );

      const updatePosition = () => {
        console.log("update");
        navigator.geolocation.watchPosition((position: any) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // infoWindow.setPosition(pos);
          // infoWindow.setContent("Location found.");
          // infoWindow.open(map);
          // map.setCenter(pos);
          userMaker.setPosition(pos);
        });
      };
      updatePosition();
      locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position: any) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              console.log(pos);
              // infoWindow.setPosition(pos);
              // infoWindow.setContent("Location found.");
              // infoWindow.open(map);
              map.setCenter(pos);
              userMaker.setPosition(pos);
            },
            (e) => {
              console.log(e);
              // handleLocationError(true, infoWindow, map.getCenter()!);
            },
            { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
          );
        } else {
          alert("no nav");
          // Browser doesn't support Geolocation
          // handleLocationError(false, infoWindow, map.getCenter()!);
        }
      });
    });
  }, []);
  return (
    <div id="container">
      <div id="map"></div>
      {showPopup && (
        <div className="popup">
          <div className="popup-wrapper">
            <div className="popup-speaker">
              <i>El Diablog says...</i>
            </div>
            <div>
              there is a raptor ariel hid for you. it is behind my good friend
              gerald. use this map to find it. it is buried in between 4 rocks.
              your hands will do.
            </div>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
