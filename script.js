const apiKey = "c4044c2eaa599a764f065ae5e154990b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather (city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";

    } else {

        var data =  await response.json();
        console.log(data);

        document.querySelector(".description").innerHTML = data.weather[0].description;
        document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp)  + " ºC";
        document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity)  + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/clouds.png"
    
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/clear.png"
    
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain.png"
    
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/drizzle.png"
    
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "img/mist.png"
        }

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

