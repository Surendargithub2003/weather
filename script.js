//1945515b6989fdbd49e864f7c2269d89
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var doc = document;
var his = localStorage.getItem("history") || "[]";
var t;
console.log(his);
var hist = JSON.parse(his);
var data;
var apiKey = "1945515b6989fdbd49e864f7c2269d89";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
//const apiBox = document.querySelector(".api");
//const apiBtn = document.querySelector(".apibtn");
var suggestion = doc.querySelector(".suggestion");
var historyList = doc.querySelector(".historyList");
var weatherIcon = doc.querySelector(".weather-icon");
var celsius = true;
var windspeed = true;
function checkweather(city) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(apiUrl + city + "&appid=".concat(apiKey))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    weatherData(data);
                    if (!hist.includes(city)) {
                        hist.unshift(city);
                        hist = hist.slice(0, 5);
                        localStorage.setItem("history", JSON.stringify(hist));
                    }
                    displayHistory();
                    return [2 /*return*/];
            }
        });
    });
}
// async function getApi(Key) {
//     apiKey = apiKey + Key;
// }
function weatherData(data) {
    var city = doc.querySelector(".city");
    var humidity = doc.querySelector(".humidity");
    var wind = doc.querySelector(".wind");
    var temp = doc.querySelector(".temp");
    if (weatherIcon && city && temp && humidity && wind) {
        city.innerHTML = data.name;
        temp.innerHTML = data.main.temp + "°C";
        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + " km/hr ";
        var f = data.main.temp * (9 / 5) + 32;
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/rain.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "img/mist.png";
        }
    }
}
function searchBtn() {
    var searchBox = doc.querySelector(".cityn");
    if (searchBox)
        checkweather(searchBox.value);
}
;
function tempBtn() {
    var temp = doc.querySelector(".temp");
    var tempbtn = doc.querySelector(".tempbtn");
    if (temp && tempbtn) {
        if (celsius == true) {
            var f = Math.round(Math.round(data.main.temp) * (9 / 5) + 32);
            temp.innerHTML = f + "°F";
            tempbtn.innerHTML = "Temp in °C";
            celsius = false;
        }
        else {
            temp.innerHTML = data.main.temp + "°C";
            tempbtn.innerHTML = "Temp in °F";
            celsius = true;
        }
    }
}
;
function windBtn() {
    var windbtn = doc.querySelector(".windbtn");
    var wind = doc.querySelector(".wind");
    if (wind && windbtn) {
        if (windspeed == true) {
            wind.innerHTML =
                Math.round((data.wind.speed * 5) / 18).toFixed(2) + " m/s ";
            windbtn.innerHTML = "Wind Speed in km/r";
            windspeed = false;
        }
        else {
            wind.innerHTML = data.wind.speed + "km/hr";
            windbtn.innerHTML = "Wind Speed in m/s";
            windspeed = true;
        }
    }
}
;
// apiBtn.addEventListener("click", () => {
//     getApi(apiBox.value);
//     console.log(apiKey);
// });
var gmap;
function initMap1(lat, lng) {
    if (lat === void 0) { lat = 20.5937; }
    if (lng === void 0) { lng = 78.9629; }
    // Default India center
    var maps = doc.getElementById("map");
    gmap = new google.maps.Map(maps, {
        center: { lat: lat, lng: lng },
        zoom: 5,
    });
    getUserLocation();
    gmap.addListener("click", function (event) {
        var clickedLat = event.latLng.lat();
        var clickedLng = event.latLng.lng();
        getDetails(clickedLat, clickedLng);
    });
}
initMap1();
function getUserLocation() {
    var locationc = doc.querySelector(".location");
    if (locationc)
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("position");
                var userLat = position.coords.latitude;
                var userLng = position.coords.longitude;
                getDetails(userLat, userLng);
            }, function (error) {
                console.log("error");
                locationc.innerHTML = "Error: " + error.message;
            });
        }
        else {
            locationc.innerHTML = "Geolocation is not supported by this browser.";
        }
}
function getDetails(lat, lon) {
    return __awaiter(this, void 0, void 0, function () {
        var city, temp, humidity, wind, url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    city = doc.querySelector(".city");
                    temp = doc.querySelector(".temp");
                    humidity = doc.querySelector(".humidity");
                    wind = doc.querySelector(".wind");
                    if (!(city && temp && humidity && wind)) return [3 /*break*/, 3];
                    url = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(lat, "&lon=").concat(lon, "&units=metric&appid=").concat(apiKey);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    weatherData(data);
                    t = Math.round(data.main.temp);
                    console.log(data);
                    city.innerHTML = data.name;
                    temp.innerHTML = t + "°C";
                    humidity.innerHTML = data.main.humidity + "%";
                    wind.innerHTML = data.wind.speed + " km/hr ";
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function displayHistory() {
    var historyList = doc.getElementById("historyList");
    if (historyList)
        historyList.innerHTML = hist
            .map(function (city) { return "<li>".concat(city, "</li>"); })
            .join("");
}
var input = document.getElementById("input");
if (input) {
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            var b = doc.getElementById("b");
            if (b)
                b.click();
        }
    });
}
else
    console.log("error");
displayHistory();
