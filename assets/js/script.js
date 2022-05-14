// open weather api
var apiKey = "cc7058684a739f06477775dd4ccca86e";

//variables
var cities = [];
var citySearch = document.querySelector("#city-search");
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var weatherEl = document.querySelector("#current-weather");

var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday");
var pastCityButtonEl = document.querySelector("#past-city-buttons");

// get and display the current weather conditions

var getCityWeather = function(city){
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

var displayWeather = function(weather, searchCity){
    //clear old content
    weatherEl.textContent= "";  
    citySearch.textContent=searchCity;
 
    //console.log(weather);
 
    //create date element
    var currentDate = document.createElement("span")
    currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    citySearch.appendChild(currentDate);
 
    //create an image element
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearch.appendChild(weatherIcon);
 
    //create a span element to hold temperature data
    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item"
   
    //create a span element to hold Humidity data
    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item"

    //create a span element to hold Wind data
    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item"

    //append to container
    weatherEl.appendChild(temperatureEl);

    //append to container
    weatherEl.appendChild(humidityEl);

    //append to container
    weatherEl.appendChild(windSpeedEl);

    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUvIndex(lat,lon)
}

var formSumbitHandler = function(event){
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if(city){
        getCityWeather(city);
        //get5Day(city);
        cities.unshift({city});
        cityInputEl.value = "";
    } else{
        alert("Please enter a City");
    }
    saveSearch();
    //pastSearch(city);
}

    // function for current conditions
    function getCurrentConditions (response) {

        // get the temperature and convert to fahrenheit 
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        tempF = Math.floor(tempF);
    
        $('#current-forecast').empty();
    
        // get and set the content 
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");
        var city = $("<h4>").addClass("card-title").text(response.name);
        var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
        var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
        var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
        var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
        var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
    
        // add to page
        city.append(cityDate, image)
        cardBody.append(city, temperature, humidity, wind);
        card.append(cardBody);
        $("#current-forecast").append(card)
    
};

var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

cityFormEl.addEventListener("submit", formSumbitHandler);
//pastSearchButtonEl.addEventListener("click", pastSearchHandler);