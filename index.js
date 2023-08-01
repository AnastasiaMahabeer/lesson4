let now = new Date();

let h3 = document.querySelector("h3");
let day = now.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let date = now.getDate();
let month = now.getMonth();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h3.innerHTML = `${days[day]}, ${date} ${months[month]} ${year}, ${hours}:${minutes}`;
console.log(hours + ":" + minutes);

function showTemp(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let weather = document.querySelector("#weather");
  weather.innerHTML = ` ${response.data.weather[0].description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = ` Humidity: ${response.data.main.humidity}%`;
  let windspeed = document.querySelector("#wind");
  windspeed.innerHTML = ` Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let feel = document.querySelector("#est_temp");
  feel.innerHTML = ` Feels like: ${Math.round(response.data.main.feels_like)}°`;
}
function searchCity(event) {
  event.preventDefault();
  let search = document.querySelector("#search-bar");
  let h2 = document.querySelector("h2");
  h2.innerHTML = search.value;

  let city = search.value;
  let apiKey = "2718952144ed077c12e7c160fb6fc351";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios.get(`${apiUrl}${city}&appid=${apiKey}&units=metric`).then(showTemp);
}

let searchTab = document.querySelector("#search-tab");
searchTab.addEventListener("submit", searchCity);

function currentCity(response) {
  console.log(response);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let weather = document.querySelector("#weather");
  weather.innerHTML = ` ${response.data.weather[0].description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = ` Humidity: ${response.data.main.humidity}%`;
  let windspeed = document.querySelector("#wind");
  windspeed.innerHTML = ` Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let feel = document.querySelector("#est_temp");
  feel.innerHTML = ` Feels like: ${Math.round(response.data.main.feels_like)}°`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
}
function navGeo(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "2718952144ed077c12e7c160fb6fc351";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(currentCity);
}
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(navGeo);
}

let current = document.querySelector("#current-tab");
current.addEventListener("submit", currentPosition);
