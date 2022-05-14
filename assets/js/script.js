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
    $(weatherEl).append(temperatureEl);

    //append to container
    $(weatherEl).append(humidityEl);

    //append to container
    $(weatherEl).append(windSpeedEl);

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
    pastSearch(city);
}

//UV index workflow
var displayUvIndex = function(index){
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if(index.value <=2){
        $(uvIndexValue).addClass("bg-success text-white")
    }else if(index.value >2 && index.value<=8){
        $(uvIndexValue).addClass("bg-warning text-white")
    }
    else if(index.value >8){
        $(uvIndexValue).addClass("bg-danger text-white");
    };

    $(uvIndexEl).append(uvIndexValue);

    //append index to current weather
    $(weatherEl).append(uvIndexEl);
}
var getUvIndex = function(lat,lon){
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvIndex(data)
        });
    });

}

//past searches
var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

var pastSearch = function(pastSearch){

     //console.log(pastSearch)

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    $(pastSearchEl).addClass("d-flex w-100 btn-light border p-2 bg-info text-uppercase");
    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastCityButtonEl.prepend(pastSearchEl);
}

var pastSearchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        //get5Day(city);
    }
}

cityFormEl.addEventListener("submit", formSumbitHandler);
pastCityButtonEl.addEventListener("click", pastSearchHandler);