async function getWeatherData(city) {
  const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2393c3bafdf1164d3efc533db9ceed34&units=metric`);
  const weatherJson = await weatherResponse.json();
  if (weatherJson.cod === '404') {
    alert(weatherJson.message)
  }
  console.log(weatherJson);
  const weatherData = new getWeatherObject(weatherJson);
  console.log(weatherData);
}

function getWeatherObject(data) {
  this.cityName = data.name;
  this.country = data.sys.country;
  this.weatherDescription = data.weather[0].description;
  this.weatherIcon = data.weather[0].icon;
  this.temp = data.main.temp;
  this.feelsLikeTemp = data.main.feels_like;
  this.humidity = data.main.humidity;
  this.windSpeed = data.wind.speed;
  this.windDirection = degToCompass(data.wind.deg);
}

function degToCompass(num) {
  const val = Math.floor((num / 45) + 0.5);
  const directions = ["N", "NE",  "E",  "SE",  "S",  "SW",  "W",  "NW"];
  return directions[(val % 8)];
}

getWeatherData('london');