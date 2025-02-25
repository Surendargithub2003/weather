//1945515b6989fdbd49e864f7c2269d89


const doc : Document = document;
let his = localStorage.getItem("history") || "[]";

let t;
console.log(his)
let hist  = JSON.parse(his);
let data : any;

var apiKey = "1945515b6989fdbd49e864f7c2269d89";
const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


//const apiBox = document.querySelector(".api");
//const apiBtn = document.querySelector(".apibtn");
const suggestion = doc.querySelector(".suggestion") as HTMLElement | null ;


const historyList = doc.querySelector(".historyList") as HTMLElement | null ;





const weatherIcon = doc.querySelector(".weather-icon") as HTMLImageElement  ;

let celsius = true;
let windspeed = true;

async function checkweather(city : string) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    data = await response.json();
    console.log(data);
    weatherData(data);
    if(!hist.includes(city))
    {
        hist.unshift(city);
        hist = hist.slice(0,5);
        localStorage.setItem("history",JSON.stringify(hist));
    }
    displayHistory();
}

// async function getApi(Key) {
//     apiKey = apiKey + Key;
// }

function weatherData(data:any) {

    const city = doc.querySelector(".city") as HTMLElement | null ;
    const humidity = doc.querySelector(".humidity") as HTMLElement | null ;
const wind = doc.querySelector(".wind") as HTMLElement | null ;
const temp = doc.querySelector(".temp") as HTMLElement | null ;
if(weatherIcon && city && temp && humidity && wind )
{
            city.innerHTML = data.name;
            temp.innerHTML = data.main.temp + "°C";
            humidity.innerHTML = data.main.humidity + "%";
            wind.innerHTML = data.wind.speed + " km/hr ";
            
        var f = data.main.temp * (9 / 5) + 32;
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain.png";
           
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/rain.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "img/mist.png";
        }
}
   
}

function searchBtn() {
    const searchBox = doc.querySelector(".cityn") as HTMLInputElement;
    if(searchBox)
    checkweather(searchBox.value);
};

function tempBtn() {
    const temp = doc.querySelector(".temp") as HTMLElement | null ;
    const tempbtn = doc.querySelector(".tempbtn") as HTMLElement | null ;
    if(temp && tempbtn)
    {
        if (celsius == true) {
            var f = Math.round(Math.round(data.main.temp) * (9 / 5) + 32);
                temp.innerHTML = f + "°F";
                tempbtn.innerHTML = "Temp in °C";
            celsius = false;
        } else {
            temp.innerHTML = data.main.temp + "°C";
            tempbtn.innerHTML = "Temp in °F";
            celsius = true;
        }
    }
    
};

function windBtn(){
    const windbtn = doc.querySelector(".windbtn") as HTMLElement | null ;
    const wind = doc.querySelector(".wind") as HTMLElement | null ;
    if(wind && windbtn)
    {
        if (windspeed == true) {
            wind.innerHTML =
                Math.round((data.wind.speed * 5) / 18).toFixed(2) + " m/s ";
            windbtn.innerHTML = "Wind Speed in km/r";
            windspeed = false;
        } else {
            wind.innerHTML = data.wind.speed + "km/hr";
            windbtn.innerHTML = "Wind Speed in m/s";
            windspeed = true;
        }
    }
    
};
// apiBtn.addEventListener("click", () => {
//     getApi(apiBox.value);
//     console.log(apiKey);
// });

 let gmap;

function initMap1(lat = 20.5937, lng = 78.9629) :void{
    // Default India center
    const maps = doc.getElementById("map") as HTMLElement  ;
    gmap = new google.maps.Map(maps, {
        center: { lat, lng },
        zoom: 5,
    });

    getUserLocation();

    gmap.addListener("click", (event:any) => {
        let clickedLat = event.latLng.lat();
        let clickedLng = event.latLng.lng();
        getDetails(clickedLat, clickedLng);
    });
}
initMap1();
function getUserLocation() {
    const locationc = doc.querySelector(".location") as HTMLElement | null ;
    if(locationc)
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
                locationc.innerHTML = "Error: " + error.message;
            }
        );
    } else {
        locationc.innerHTML = "Geolocation is not supported by this browser.";
    }
}

async function getDetails(lat:any, lon:any) {
    const city = doc.querySelector(".city") as HTMLElement | null ;
    const temp = doc.querySelector(".temp") as HTMLElement | null ;
    const humidity = doc.querySelector(".humidity") as HTMLElement | null ;
    const wind = doc.querySelector(".wind") as HTMLElement | null ;
    if(city && temp && humidity && wind)
    {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        data = await response.json();
        weatherData(data);
        t = Math.round(data.main.temp);
        console.log(data);
    
        city.innerHTML = data.name;
        temp.innerHTML = t + "°C";
    
        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + " km/hr ";
    }
   
}

function displayHistory()
{
    const historyList = doc.getElementById("historyList") as HTMLElement | null ;
    if(historyList)
    historyList.innerHTML = hist
        .map((city: string)  => `<li>${city}</li>`)
        .join("");
}
const input = document.getElementById("input") as HTMLInputElement | null;

if(input)
{
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          const b = doc.getElementById("b") as HTMLElement | null ;
          if(b)
          b.click();
        }
      });
    
}

else
console.log("error")

displayHistory();
