let now = new Date();

let h2 = document.querySelector("#time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[new Date().getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h2.innerHTML = `${day}, ${hour}:${minutes}`;

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}
        </div>
        <img
          src="https://source.unsplash.com/36x36/?weather"
          alt="Weather icon"
          width="36"
        />
        <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-min">15º</span>
          <span class="weather-forecast-temp-max">26º</span>
        </div>
      </div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function changeCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#current-city");
  let cityInput = cityForm.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey = "34ae1065362d42545661451bda2b8a1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(currentWeather);
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", changeCity);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "34ae1065362d42545661451bda2b8a1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function currentWeather(response) {
  console.log(response.data);
  let cityInput = cityForm.querySelector("#city-input");
  cityInput.innerHTML = response.data.name;
  let currentTemp = document.querySelector("#fahrenheight-temp");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )}ºF`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}MPH`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let currentLow = document.querySelector(".current-low");
  currentLow.innerHTML = `${Math.round(response.data.main.temp_min)}ºF /`;
  let currentHigh = document.querySelector(".current-high");
  currentHigh.innerHTML = ` ${Math.round(response.data.main.temp_max)}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  fahrenheightTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemperature = ((fahrenheightTemp - 32) * 5) / 9;
  //remove the active class the fahrenheight link
  fahrenheightLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let currentTemp = document.querySelector("#fahrenheight-temp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheightTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#fahrenheight-temp");
  fahrenheightLink.classList.add("active");
  celsiusLink.classList.remove("active");
  currentTemp.innerHTML = Math.round(fahrenheightTemp);
}

let fahrenheightTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheightLink = document.querySelector("#fahrenheight-link");
fahrenheightLink.addEventListener("click", displayFahrenheightTemp);
