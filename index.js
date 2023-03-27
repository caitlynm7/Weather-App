// Current Date & Time

function formatDate(timestamp) {
  let now = new Date(timestamp);

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

  return `${day}, ${hour}:${minutes}`;
}

let h2 = document.querySelector("#time");
h2.innerHTML = formatDate(new Date());

let h2 = document.querySelector("#time");
h2.innerHTML = formatDate(response.data.dt * 1000);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

//display week forecast

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
        </div>
        <img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="50"
        />
        <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-min">${Math.round(
            forecastDay.temp.min
          )}º</span>
          <span class="weather-forecast-temp-max">${Math.round(
            forecastDay.temp.max
          )}º</span>
        </div>
      
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Search & Change City Data

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
  currentHigh.innerHTML = ` ${Math.round(response.data.main.temp_max)}ºF`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  fahrenheightTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

searchCity("Kansas City");
