let history = JSON.parse(localStorage.getItem("history")) || [];
let data;
let temp;
var apiKey = "apikey";
const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".cityn");

//const apiBox = document.querySelector(".api");
//const apiBtn = document.querySelector(".apibtn");
const weatherIcon = document.querySelector(".weather-icon");
let celsius = true;
let windspeed = true;

async function checkweather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    data = await response.json();
    console.log(data);
    weatherData(data);
    if(!history.includes(city))
    {
        history.unshift(city);
        history = history.slice(0,5);
        localStorage.setItem("history",JSON.stringify(history));

    }
    displayHistory();
}

// async function getApi(Key) {
//     apiKey = apiKey + Key;
// }

function weatherData(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + "°C";

    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr ";
    var f = data.main.temp * (9 / 5) + 32;
    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "img/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "img/clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "img/rain.png";
        document.querySelector("suggestion").innerHTML =
            "You might want to grab an umbrella, looks like there could be rain later today";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "img/rain.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "img/mist.png";
    }
}

function searchBtn() {
    checkweather(searchBox.value);
};

function tempBtn() {
    if (celsius == true) {
        var f = Math.round(Math.round(data.main.temp) * (9 / 5) + 32);
        document.querySelector(".temp").innerHTML = f + "°F";
        document.querySelector(".tempbtn").innerHTML = "Temp in °C";
        celsius = false;
    } else {
        document.querySelector(".temp").innerHTML = data.main.temp + "°C";
        document.querySelector(".tempbtn").innerHTML = "Temp in °F";
        celsius = true;
    }
};

function windBtn(){
    if (windspeed == true) {
        document.querySelector(".wind").innerHTML =
            Math.round((data.wind.speed * 5) / 18).toFixed(2) + " m/s ";
        document.querySelector(".windbtn").innerHTML = "Wind Speed in km/r";
        windspeed = false;
    } else {
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
        document.querySelector(".windbtn").innerHTML = "Wind Speed in m/s";
        windspeed = true;
    }
};
// apiBtn.addEventListener("click", () => {
//     getApi(apiBox.value);
//     console.log(apiKey);
// });

let map;

function initMap1(lat = 20.5937, lng = 78.9629) {
    // Default India center
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat, lng },
        zoom: 5,
    });

    getUserLocation();

    map.addListener("click", (event) => {
        let clickedLat = event.latLng.lat();
        let clickedLng = event.latLng.lng();
        getDetails(clickedLat, clickedLng);
    });
}

function getUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("position");
                let userLat = position.coords.latitude;
                let userLng = position.coords.longitude;
                getDetails(userLat, userLng);
            },
            (error) => {
                console.log("error");
                document.getElementById("location").innerHTML =
                    "Error: " + error.message;
            }
        );
    } else {
        document.getElementById("location").innerHTML =
            "Geolocation is not supported by this browser.";
    }
}

async function getDetails(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    data = await response.json();
    weatherData(data);
    temp = Math.round(data.main.temp);
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = temp + "°C";

    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr ";
}

function displayHistory()
{
    document.getElementById("historyList").innerHTML = history
        .map(city => `<li>${city}</li>`)
        .join("");
}

displayHistory();