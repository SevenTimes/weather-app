async function getWeatherData(city) {
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2393c3bafdf1164d3efc533db9ceed34&units=metric`
  );
  const weatherJson = await weatherResponse.json();

  const alert404 = document.getElementById('alert-404');
  if (weatherJson.cod === '404') {
    alert404.style.display = 'block';
    return;
  }
  if (alert404.style.display === 'block') {
    alert404.style.display = 'none';
  }
  const weatherData = new getWeatherObject(weatherJson);
  updateWeatherInfo(weatherData);

  const main = document.querySelector('main');
  main.style.display = 'flex';

  localStorage.setItem('location', city);
}

function getWeatherObject(json) {
  this.cityName = json.name;
  this.country = json.sys.country;
  this.weatherIcon = json.weather[0].icon;
  this.temp = Math.round(json.main.temp);
  this.feelsLikeTemp = Math.round(json.main.feels_like);
  this.humidity = json.main.humidity;
  this.windSpeed = json.wind.speed;
  this.windDirection = degToCompass(json.wind.deg);
}

function degToCompass(num) {
  const val = Math.floor(num / 45 + 0.5);
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[val % 8];
}

function updateWeatherInfo(data) {
  const location = document.querySelector('#location');
  location.innerText = `${data.cityName}, ${data.country}`;

  const weatherIcon = document.querySelector('#weather-icon');
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weatherIcon}@4x.png`;

  const weatherIconMobile = document.querySelector('#weather-icon-mobile');
  weatherIconMobile.src = `https://openweathermap.org/img/wn/${data.weatherIcon}@2x.png`;

  const temp = document.querySelector('#main-temp');
  temp.innerText = `${data.temp}°C`;

  const feelLike = document.querySelector('#feelslike-temp');
  feelLike.innerText = `Feels like ${data.feelsLikeTemp}°`;

  const windInfo = document.querySelector('#wind-info');
  windInfo.innerText = `Wind ${data.windDirection}, ${data.windSpeed} m/s`;

  const humidity = document.querySelector('#humidity-info');
  humidity.innerText = `Humidity ${data.humidity}%`;
}

const cityInput = document.querySelector('input');
const searchBtn = document.querySelector('#search-submit');

searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keydown', enterValue);

function enterValue(e) {
  if (e.code === 'Enter') {
    searchWeather();
  }
}

function searchWeather() {
  getWeatherData(cityInput.value);
  cityInput.value = '';
}

document.addEventListener('DOMContentLoaded', loadSavedLocation);

function loadSavedLocation() {
  if (localStorage.location) {
    getWeatherData(localStorage.location);
  } else {
    getWeatherData('Moscow');
  }
}
