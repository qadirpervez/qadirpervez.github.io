//drizzle, clouds, rain, snow, clear, thunderstorm, Mist
// https://github.com/freeCodeCamp/freeCodeCamp/issues/15767

// https://openweathermap.org/weather-conditions

// API : https://home.openweathermap.org/

// JS Code for Local Weather App.
// Owner Qadir Pervez
//
// _____________________________________________________________

var apiOBJ = {
  url: "api.openweathermap.org/data/2.5/forecast?",
  // q=London&appid=b6907d289e10d714a6e88b30761fae22 By CityName
  // lat=35&lon=139 By Lat and Long
  apiKey: "7336c358d9a2fe6239a7f49f942f8688" // Success Responce: cod == 200, ERROR RES: cod: 404 OR 400,
};
var images = {
  clearW: "images/clear.jpeg",
  clouds: "images/clouds.jpg",
  rain: "images/rain.jpeg",
  snow: "images/snow.jpeg",
  thunderstorm: "images/thunder2.jpeg"
};
// {
//   "cod": "200",
//   "message": 0.0032,
//   "cnt": 36,                    JSON RESPONSE.
//   "list": [],
//   "city": {}
// }


// List Contains:
// {
//       "dt": 1487246400,
//       "main": {
//         "temp": 286.67,
//         "temp_min": 281.556,
//         "temp_max": 286.67,
//         "pressure": 972.73,
//         "sea_level": 1046.46,
//         "grnd_level": 972.73,
//         "humidity": 75,
//         "temp_kf": 5.11
//       },
//       "weather": [
//         {
//           "id": 800,
//           "main": "Clear",
//           "description": "clear sky",
//           "icon": "01d"
//         }
//       ],
//       "clouds": {
//         "all": 0
//       },
//       "wind": {
//         "speed": 1.81,
//         "deg": 247.501
//       },
//       "sys": {
//         "pod": "d"
//       },
//       "dt_txt": "2017-02-16 12:00:00"
//     },

// Icons Html.
var sunRainHTML = window.sunRain,
thunderstormHTML = window.thunderstorm,
cloudsHTML = window.clouds,
snowHTML = window.snow,
clearWHTML = window.clearW,
rainHTML = window.rain;
window.iconsMainDiv.style.display = "none";


function getGeo(){

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      window.lat = position.coords.latitude;
      window.lon = position.coords.longitude;
      console.log("lat:", lat);
    });
  } else {
    console.log("location not supported");
  }

}
