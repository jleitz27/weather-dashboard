// open weather api
var apiKey = "cc7058684a739f06477775dd4ccca86e";

//variables
var cities = [];
var citySearch = $("#city-search").val();
var  cityFormEl = document.querySelector("#city-form");
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

$("#submit").on("click", function() {

    $('#forecast').addClass('show');

    // get the value of the input from user
    city = $(citySearch).val();
    
    // clear input box
    $(citySearch).val("");  

    // full url to call api
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function (response){

        console.log(response)
    
        console.log(response.name)
        console.log(response.weather[0].icon)
    
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        console.log(Math.floor(tempF))
    
        console.log(response.main.humidity)
    
        console.log(response.wind.speed)
    
        getCurrentConditions(response);
        // getCurrentForecast(response);
        // makeList();
    
        })
    });

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
pastSearchButtonEl.addEventListener("click", pastSearchHandler);