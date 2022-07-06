// initialize variables from index
// var searchedCityNameEl = $('#searchBar');
var savedCitiesEl = $('#savedCities');
var buttonEl = $('#button');
var todayTemp = $('#currentTemp');
var todayWind = $('#currentWind');
var todayHumid = $('#currentHumid');
var todayUV = $('#currentUV');
// var todayDateEl = $('#currentDate');
var CityEl = $('#displayCity');

// var searchedCityData = new [];

// use moment to set current date and 5 days ahead
var todayDateEl = $('#currentDate').append(moment().format("MM/DD/YYYY"));
var date1 = $('#day1Date').append(moment().add(1,'days').format("MM/DD/YYYY"));
var dat2 = $('#day2Date').append(moment().add(2,'days').format("MM/DD/YYYY"));
var date3 = $('#day3Date').append(moment().add(3,'days').format("MM/DD/YYYY"));
var date4 = $('#day4Date').append(moment().add(4,'days').format("MM/DD/YYYY"));
var date5 = $('#day5Date').append(moment().add(5,'days').format("MM/DD/YYYY"));

// function to save to local storage
buttonEl.on('click', function (event) {
    // prevents a default
    event.preventDefault();
    // creates a variable that pulls in the input from the search bar
    var searchedCityNameEl = $(this).siblings("input").val();
    // saves that variable to local storage
    localStorage.setItem('new city', searchedCityNameEl);
    // creates a new list item with that city from local storage
    savedCitiesEl.append('<li class="list-group-item">' + localStorage.getItem('new city') + '</li>');
    $("#displayCity").replaceWith('<h3 id="displayCity">' + searchedCityNameEl + '</h3>');
});

// function to call the API using the requested city
function getTodayWeather() {
    var callWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + localStorage.getItem('new city') + '&units=imperial&appid=b0572ae39a1b4f96f4d79c380369edb3';
    
    console.log(callWeather);
}

// event listeners for the save button
buttonEl.click(getTodayWeather());
// buttonEl.click(get5DayWeather());