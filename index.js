document.addEventListener("DOMContentLoaded", function(e){
  setupEventListener();
});
 
function setupEventListener(){
  const subtmitButton = document.getElementById("location-submit")
  subtmitButton.addEventListener("click", getWeatherForLocation);
}

function getWeatherForLocation(e) {
  e.preventDefault();
  fetchLocation().then((location_json) => {
    fetchWeather(location_json).then((weather_json) => {
      console.log("weather JSON", weather_json);
      doSomethingWithWeatherJSON(weather_json);
    });
  });
}

function fetchLocation() {
  const enterlocation = document.getElementById("location").value;
  const LOCATION_ENDPOINT = `https://weather-app-rails.herokuapp.com/location/${enterlocation}`
  return fetch(LOCATION_ENDPOINT)
  .then(function (response) {
    return response.json();
  });
}

function fetchWeather(location_json) {
  const jawn = location_json.results[0].geometry.location;
  const lat = jawn.lat;
  const long = jawn.lng;
  console.log("lat and long", jawn);
  const WEATHER_ENDPOINT = `https://weather-app-rails.herokuapp.com/weather?loc=${lat}_${long}`
  return fetch(WEATHER_ENDPOINT)
  .then(function(response){
      return response.json();
  });
}

function doSomethingWithWeatherJSON(json) {

}