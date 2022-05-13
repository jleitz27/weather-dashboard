// open weather api
var apiKey = "cc7058684a739f06477775dd4ccca86e";

//variables
var citySearch = $("#city-search").val();
var  cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var weatherEl = document.querySelector("#current-weather");

var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday");
var pastCityButtonEl = document.querySelector("#past-city-buttons");

// get and display the current weather conditions

$(citySearch).keypress(function(event){

    if (event.keyCode=== 13) {
        event.preventDefault();
        $("#submit").click();
    }
});

$("#submit").on("click", function() {

    $('#forecastH5').addClass('show');

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
    
        // getCurrentConditions(response);
        // getCurrentForecast(response);
        // makeList();
    
        })
    });