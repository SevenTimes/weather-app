async function getWeatherData(city) {
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2393c3bafdf1164d3efc533db9ceed34&units=metric`
  );
  const weatherJson = await weatherResponse.json();
  if (weatherJson.cod === '404') {
    alert(weatherJson.message);
    return;
  }
  const weatherData = new getWeatherObject(weatherJson);
  updateWeatherInfo(weatherData);
}

function getWeatherObject(json) {
  this.cityName = json.name;
  this.country = json.sys.country;
  this.weatherDescription = json.weather[0].description;
  this.weatherIcon = json.weather[0].icon;
  this.temp = json.main.temp;
  this.feelsLikeTemp = json.main.feels_like;
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

  const weatherIcon = document.querySelector('img');
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weatherIcon}@4x.png`;

  const temp = document.querySelector('h1');
  temp.innerText = `${data.temp}°`;

  const feelLike = document.querySelector('p');
  feelLike.innerText = `Feels like ${data.feelsLikeTemp}°`;
}

const searchBtn = document.querySelector('#search');
searchBtn.addEventListener('click', searchWeather);

function searchWeather() {
  const cityInput = document.querySelector('input').value;
  getWeatherData(cityInput);
}
