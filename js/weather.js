function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const API_KEY = "7efe9843063639ccf151c830e082f4bb";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url).then(response => response.json()).then(data => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      weather.innerText =  `${data.weather[0].main} ${data.main.temp}℃`;
      city.innerText = data.name;

  });
}
function onGeoError() {
  alert("cant find you");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
