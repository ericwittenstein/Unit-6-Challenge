// initialize variables from index
// var searchedCityNameEl = $('#searchBar');
var savedCitiesEl = $('#savedCities');
var buttonEl = $('#button');
var todayTemp = $('#currentTemp');
var todayWind = $('#currentWind');
var todayHumid = $('#currentHumid');
var todayUV = $('#currentUVIndex');
// var todayIcon = $('#currentIcon');
var CityEl = $('#displayCity');

// use moment to set current date and 5 days ahead
var todayDateEl = $('#currentDate').append(moment().format("MM/DD/YYYY"));
var date1 = $('#day1Date').append(moment().add(1, 'days').format("MM/DD/YYYY"));
var dat2 = $('#day2Date').append(moment().add(2, 'days').format("MM/DD/YYYY"));
var date3 = $('#day3Date').append(moment().add(3, 'days').format("MM/DD/YYYY"));
var date4 = $('#day4Date').append(moment().add(4, 'days').format("MM/DD/YYYY"));
var date5 = $('#day5Date').append(moment().add(5, 'days').format("MM/DD/YYYY"));

// function to call the API using the requested city to extract the lat and long
function getTodayCoords(cityName) {
    var callWeatherPt1 = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var callWeatherPt2 = cityName;
    var callWeatherPt3 = '&units=imperial&appid=4cd991bb843c8dfb86a480140e987fb5';
    var callWeatherForLatLong = callWeatherPt1 + callWeatherPt2 + callWeatherPt3;

    // need to extract the latitude and longitude for the data
    fetch(callWeatherForLatLong).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            // set main city name display
            var todayCityVal = data['name'];
            CityEl.replaceWith('<h3 id="displayCity">' + todayCityVal.toUpperCase() + '</h3>');

            console.log('initial pull for latlong', data);
            var latVal = data['coord']['lat'];
            var lonVal = data['coord']['lon'];
            getWeatherWithCoords(latVal, lonVal);
        });
}

// create new call link with lat lon values
function getWeatherWithCoords(lat, lon) {
    var callWeather = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=4cd991bb843c8dfb86a480140e987fb5';

    // fetched the info from the api call and handles it through json
    fetch(callWeather).then(function (response) {
        return response.json()
    })
        // assignment of current day's weather info to their respective html fields
        .then(function (data) {
            console.log('second pull', data);

            // set icon display
            var todayIconVal = data['current']['weather']['0']['icon'];
            var todayIconURL1 = 'http://openweathermap.org/img/wn/';
            var todayIconURL2 = todayIconVal;
            var todayIconURL3 = '@2x.png';
            var todayIconURL = todayIconURL1 + todayIconURL2 + todayIconURL3;
            $('#currentIcon').append('<img src="' + todayIconURL + '" />');

            // set main temp display
            var todayTempVal = data['current']['temp'];
            todayTemp.text("Temperature:  " + todayTempVal + " °F");

            // set main wind speed display
            var todayWindVal = data['current']['wind_speed'];
            todayWind.text("Wind Speed:  " + todayWindVal + " MPH");

            // set main humidity display
            var todayHumidVal = data['current']['humidity'];
            todayHumid.text('Humidity:  ' + todayHumidVal + '% (feels like ' + data['current']['feels_like'] + '°F)');

            // set main UV index value
            var todayUvVal = data['current']['uvi'];
            if (todayUvVal < 5.99) {
                todayUV.addClass("greenUV");
            }
            else if (todayUvVal > 6 && todayDateEl < 7.99) {
                todayUV.addClass("yellowUV");
            }
            else if (todayUvVal > 8) {
                todayUV.addClass("redUV");
            }
            todayUV.text(todayUvVal);

            // for loop to move through the various days and assign their values
            for (var i = 1; i < 6; i++) {
            var dailyIconVal = data.daily[i].weather[0].icon;
            var dailyIconURL1 = 'http://openweathermap.org/img/wn/';
            var dailyIconURL2 = dailyIconVal;
            var dailyIconURL3 = '@2x.png';
            var dailyIconURL = dailyIconURL1 + dailyIconURL2 + dailyIconURL3;
            var dayIcon = $(`#day${i}Icon`);
            dayIcon.append("<img src='" + dailyIconURL + "' />");
            }
        });
}

// event listeners for the save button
// function to save to local storage
buttonEl.on('click', function (event) {
    // prevents a default
    // event.preventDefault();
    // creates a variable that pulls in the input from the search bar
    var searchedCityNameEl = $(this).siblings("input").val();
    // saves that variable to local storage
    localStorage.setItem('new city', searchedCityNameEl);
    // creates a new list item with that city from local storage
    savedCitiesEl.append('<li class="list-group-item">' + localStorage.getItem('new city').toUpperCase() + '</li>');
    // $("#displayCity").replaceWith('<h3 id="displayCity">' + searchedCityNameEl + '</h3>');
    getTodayCoords(searchedCityNameEl);
});