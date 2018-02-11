//drizzle, clouds, rain, snow, clear, thunderstorm, Mist
// https://github.com/freeCodeCamp/freeCodeCamp/issues/15767

// https://openweathermap.org/weather-conditions

// API : https://home.openweathermap.org/

// JS Code for Local Weather App.
// Owner Qadir Pervez
//
// _____________________________________________________________

var apiOBJ = {
  locate: "https://freegeoip.net/json/", //for location as browser has some issue with my coding.
  url: "https://api.openweathermap.org/data/2.5/weather?",
  addressG: "https://maps.googleapis.com/maps/api/geocode/json?latlng=",
  keyG: "&key=AIzaSyD-VgZ9f-MhD7Cc76245kUYHxVXHtznEfQ",
  // 22.5327038,88.38135160000002
  // q=London&appid=b6907d289e10d714a6e88b30761fae22 By CityName
  // lat=35&lon=139cnt=10 total 10 days By Lat and Long
  apiKey: "&appid=7336c358d9a2fe6239a7f49f942f8688" // Success Responce: cod == 200, ERROR RES: cod: 404 OR 400,
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
var lat, long, city, locObj, usedLocation = false;

window.getGeo = function(){
  $.getJSON(window.apiOBJ.locate, function ( data ){
    window.lat = data.latitude;
    window.long = data.longitude;
    window.locObj = data;
    if(data.city !== '' && data.region_code !== '' && data.country_code != ''){
      $("#geoPlace").html(data.city+', '+data.region_code+', '+data.country_code);
      $("#geoPlace").show();
      $("#locate").hide();
      $("#weatherFetch").show();
    }
    setTimeout(window.getWeatherDataGeo, 400);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    window.locateFail(errorThrown);
  });
}
window.getWeatherDataGeo = function(lat, lon){
  lat = lat || window.lat;
  lon = lon || window.long;
  console.log("called", lat);
  var url = window.apiOBJ.url+"lat="+lat+"&lon="+lon + window.apiOBJ.apiKey;
  $.getJSON(url, function ( data ){
    console.log(url);
    console.log(data);
    window.weatherDataFirst = data;
    $("#weatherFetch").hide();
    window.showWeatherData(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    //invalid coord, response 401, 400, 404 every error response.
    //edit this later,
  });
}

window.getWeatherDataGeoCity = function(queryString){
  var url = window.apiOBJ.url+"q="+queryString+window.apiOBJ.apiKey;
  $.getJSON(url, function ( data ){
    console.log(data)
  }).fail(function(jqXHR, textStatus, errorThrown){
    //Not found city response 401, 400, 404 every error response.
  });
}
window.showWeatherData = function(weather){
  var type = weather.weather[0].main;
  console.log(type);
  var icon = weather.weather[0].icon;
  $("#desc").html(weather.weather[0].description);
  $("#humidity").html(weather.main.humidity + ' %');
  $("#pressure").html(weather.main.pressure + ' hPa');
  $("#windDesc").html(weather.wind.speed + ' m / s');
  $("#otherDetails").show();
  if(window.usedLocation === false){
    $("#usedLoc").show();
  } else {
    $("#usedLoc").hide();
    window.showAddress();
  }
  temp = parseInt(weather.main.temp);
  window.tempC = temp - 273;
  window.tempF = Math.round(((tempC * 9) / 5) + 32);
  window.tempC = Math.round(window.tempC);

  switch(type){
    case "Clouds":
    window.changeBg('clouds');
    break;
    case "Rain":
    window.changeBg('rain');
    break;
    case "Snow":
    window.changeBg('snow');
    break;
    case "Clear":
    window.changeBg('clear');
    break;
    case "Thunderstorm":
    window.changeBg('thunder');
    break;
    case "Haze":
    window.changeBg('haze', icon);
    default:
    window.changeBg('', icon);
  }

  $("#temp").html(window.tempC);
  $("#temperature").show();
}
window.showAddress = function (){
  // call google map api for address.
  url = window.apiOBJ.addressG + window.lat + ',' + window.long + window.apiOBJ.keyG;
  $.getJSON(url, function ( data ){
    console.log(data);

    var city, local, sublocal, country, state, zip;
    var sizeObj = data.results[0].address_components.length;
    var obj = data.results[0].address_components;
    for(i = 0; i < sizeObj; i++){
      if(obj[i].types.indexOf("administrative_area_level_1") != -1 ){
        state = obj[i].short_name;
      }
      if(obj[i].types.indexOf("sublocality_level_1") != -1 ){
        sublocal = obj[i].long_name;
      }
      if(obj[i].types.indexOf("locality") != -1 ){
        local = obj[i].long_name;
      }
      if(obj[i].types.indexOf("administrative_area_level_2") != -1 ){
        city = obj[i].long_name;
      }
      if(obj[i].types.indexOf("country") != -1 ){
        country = obj[i].short_name;
      }
      if(obj[i].types.indexOf("postal_code") != -1){
        zip = obj[i].long_name;
      }
    }

    if(sublocal !== undefined){
      local = sublocal;
    }
    if(local === undefined){
      var address = zip + ', ' + state + ', ' + country;
    } else {
      var address = local + ', ' + state + ', ' + country;
    }
    $("#locate").hide();
    $("#geoPlace").html(address);
    $("#geoPlace").show();
    return;
  });
}
window.changeBg = function(str, icon){
  switch(str){
    case 'clouds':
    $("#bg").attr("class", "cloudsA");
    $("#skyCloudData").html(window.cloudsHTML);
    break;
    case 'rain':
    $("#bg").attr("class", "rainA");
    $("#skyCloudData").html(window.rainHTML);
    break;
    case 'snow':
    $("#bg").attr("class", "snowA");
    $("#skyCloudData").html(window.snowHTML);
    break;
    case 'clear':
    $("#bg").attr("class", "clearA");
    $("#skyCloudData").html(window.clearWHTML);
    break;
    case 'thunder':
    $("#bg").attr("class", "thunderA");
    $("#skyCloudData").html(window.thunderstormHTML);
    break;
    case 'haze':
    $("#bg").attr("class", "hazeA");
    var html = '<div class="text-center"><img src="https://openweathermap.org/img/w/'+icon+'.png" ></div>';
    $("#skyCloudData").html(html);
    break;
    default:
    $("#bg").attr("class", "bgColorGrey");
    var html = '<div class="text-center"><img src="https://openweathermap.org/img/w/'+icon+'.png" ></div>';
    $("#skyCloudData").html(html);
  }
}
window.showCelcius = function (){
  $("#temp").html(window.tempC);
  $("#celcius").addClass("activeUnit");
  $("#farenhiet").removeClass("activeUnit");
}
window.showFarenhiet = function (){
  $("#temp").html(window.tempF);
  $("#celcius").removeClass("activeUnit");
  $("#farenhiet").addClass("activeUnit");
}
window.getLocCallApi = function (){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      window.lat = position.coords.latitude;
      window.long = position.coords.longitude;
      window.usedLocation = true;
      console.log('calling again');
      window.getWeatherDataGeo(window.lat, window.long)
    });
  } else {
    console.log('Not Supported geo location');
  }
}

window.getCoords = function (){
  return new Promise((resolve, reject) =>

  navigator.permissions ?

  // Permission API is implemented
  navigator.permissions.query({name:'geolocation'}).then(permission =>
    // is geolocation granted?
    permission.state === "granted"
    ? navigator.geolocation.getCurrentPosition(pos => resolve(pos.coords))
    : resolve(null),
    reject) :

    // Permission API was not implemented
    reject(new Error("Permission API is not supported"))
  )
}

window.getCoords().then(coords => {
  console.log(coords);
  if(coords === null) setTimeout(getGeo, 1000);
  else {
    window.lat = coords.latitude;
    window.long = coords.longitude;
    window.usedLocation = true;
    window.getWeatherDataGeo(window.lat, window.long);
  }
});
//setTimeout(getGeo, 2000);
window.locateFail = function(error){
  console.log('Failed getting the location', error);
}
