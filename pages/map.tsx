import { Loader } from "@googlemaps/js-api-loader"
import { useEffect } from "react";

const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    version: "weekly",
  });
const Map = () => {
useEffect(() => {
  let map: google.maps.Map, infoWindow: google.maps.InfoWindow;

    loader.load().then(() => {
      const lat = 32.329656, lng = -111.168146

       map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: { lat, lng },
          zoom: 20,
          styles: require("./mapstyles.json")
        }as google.maps.MapOptions);

        const marker = new google.maps.Marker({
          position: {lat,lng},
          map: map,
          icon: "silver-raptor.svg"
        });

        const userMaker = new google.maps.Marker({
          map,
          icon: "running-icon.svg"
        })
        userMaker.setPosition({lat, lng})

        infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");

  map.controls[google.maps.ControlPosition.LEFT_CENTER].push(locationButton);

const updatePosition = () => {
  console.log("update")
  navigator.geolocation.getCurrentPosition(
    (position: any) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      // infoWindow.setPosition(pos);
      // infoWindow.setContent("Location found.");
      // infoWindow.open(map);
      map.setCenter(pos);
      userMaker.setPosition(pos)})
      setTimeout(updatePosition, 2000)

}
updatePosition()
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
          userMaker.setPosition(pos)
        },
        (e) => {
          console.log(e)
          // handleLocationError(true, infoWindow, map.getCenter()!);
        }
      );
    } else {
      alert("no nav")
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter()!);
    }
  });
      });
},[])
return (<div id="map" style={{height:"100vh"}}>map</div>)}

export default Map