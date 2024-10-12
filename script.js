// 907e91122aea5cf6a934d1036ee644d1
//https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=metric

const apiKey = "907e91122aea5cf6a934d1036ee644d1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
//select element
const temp = document.querySelector("#temp");
const city = document.querySelector(".city");
const windSpeed = document.querySelector("#windSpeed");
const humidity = document.querySelector("#humidity");
const pressure = document.querySelector("#pressure");
const tempMax = document.querySelector("#temp-max");
const tempMin = document.querySelector("#temp-min");
const feelsLike = document.querySelector("#feels-like");
const windDirection = document.querySelector("#wind-direction");
const windDirectionIcon = document.querySelector("#wind-direction-icon");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const weatherName = document.querySelector("#weather-name");
const weatherIcon = document.querySelector(".weather-icon");

//display
const display1 = document.querySelectorAll(".dis")[0];
const display2 = document.querySelectorAll(".dis")[1];

// ..error 
const error = document.querySelectorAll(".error")[0];
const loading = document.querySelectorAll(".loading")[0];
// console.log(loading);
// console.log(windSpeed);

const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");



async function weather(location = "Dhaka") {

    const respone = await fetch(apiUrl + location + "&appid=" + apiKey + "&units=metric");
        
    // console.log(respone.text);
    //! response chk
    if (respone.status == 404 || respone.status == 400) {
        rmvMenu();
        loadingHidden();
        displayError();
    }

    else {
        var data = await respone.json();
        // console.log(data);

        error.style.display = "hidden";
        data_(data);
        displayMenu();
        loadingHidden();
        rmvError();
    }
}


function data_(data) {
    city.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp);
    windSpeed.innerHTML = Math.round(data.wind.speed);
    humidity.innerHTML = Math.round(data.main.humidity);
    pressure.innerHTML = Math.round(data.main.pressure);
    tempMax.innerHTML = Math.round(data.main.temp_max);
    tempMin.innerHTML = Math.round(data.main.temp_min);
    feelsLike.innerHTML = Math.round(data.main.feels_like);
    windDirection.innerHTML = Math.round(data.wind.deg);

    weatherName.innerHTML = (data.weather[0].main);//*

    //wind diredtion
    windDirectionIcon.style.transform = `rotate(${-90 + data.wind.deg}deg)`
    windDirectionIcon.style.padding = `10px` //style
    windDirection.innerHTML = Math.round(data.wind.deg);

    // console.log(data);

    // sunrise
    sunrise.innerHTML = Sunrise(data.sys.sunrise);

    // sunset
    sunset.innerHTML = Sunrise(data.sys.sunset);
    weatherIcon.src = images(data.weather[0].icon);

}

searchbtn.addEventListener("click", () => {

    weather(searchBox.value); //update weather info
    console.log(searchBox.value); //update weather info

    // loading.style.display = 'block';
    loadingBlock();
    rmvMenu();

});

function displayMenu() {
    display1.classList.remove("dis")
    display2.classList.remove("dis")
}
function rmvMenu() {
    display1.classList.add("dis")
    display2.classList.add("dis")
}
function displayError() {
    error.style.display = "block";
}
function rmvError() {
    error.style.display = "none";
}


// displayMenu(); 

function Sunrise(unixTimestamp) {
    /// Convert Unix timestamp to milliseconds
    const date = new Date(unixTimestamp * 1000);
    // Adjust for GMT+6:00 timezone
    const hours = date.getUTCHours() + 6;
    const minutes = date.getUTCMinutes();
    // Handle cases where adding the timezone offset exceeds 24 hours
    const adjustedHours = hours % 24;

    const formattedTime = `${adjustedHours}:${minutes.toString().padStart(2, '0')}`;

    return formattedTime;
}

// function images(img) {
//     if (img == '01d') {
//         return '/icons/01d.svg'
//     }
//     else if (img == '01n') {
//         return '/icons/01n.svg'
//     }
//     else if (img == '10n') {
//         return '/icons/10n.svg'
//     }
//     else if (img == '10d') {
//         return '/icons/10d.svg'
//     }
//     else if (img == '02d') {
//         return '/icons/02d.svg'
//     }
//     else if (img == '02n') {
//         return '/icons/02n.svg'
//     }
//     else if (img == '03d') {
//         return '/icons/03d.svg'
//     }
//     else if (img == '03n') {
//         return '/icons/03n.svg'
//     }
//     else if (img == '04d') {
//         return '/icons/04d.svg'
//     }
//     else if (img == '04n') {
//         return '/icons/04d.svg'
//     }
//     else if (img == '09d') {
//         return '/icons/09d.svg'
//     }
//     else if (img == '09n') {
//         return '/icons/09n.svg'
//     }
//     else if (img == '11d') {
//         return '/icons/11d.svg'
//     }
//     else if (img == '11n') {
//         return '/icons/11n.svg'
//     }
//     else if (img == '13d') {
//         return '/icons/13d.svg'
//     }
//     else if (img == '13n') {
//         return '/icons/13n.svg'
//     }
//     else if (img == '50d') {
//         return '/icons/50d.svg'
//     }
//     else if (img == '50n') {
//         return '/icons/50n.svg'
//     }
//     else {
//         return `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
//     }
// }
function images(img) {
    if (img == '01d') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg'
    }
    else if (img == '01n') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/clear-night.svg'
    }
    else if (img == '10n') {
        return '/icons/10n.svg'
    }
    else if (img == '10d') {
        return '/icons/10d.svg'
    }
    else if (img == '02d') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day-haze.svg'
    }
    else if (img == '02n') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night-haze.svg'
    }
    else if (img == '03d') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/haze.svg'
    }
    else if (img == '03n') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/haze.svg'
    }
    else if (img == '04d') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/overcast.svg'
    }
    else if (img == '04n') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/overcast.svg'
    }
    else if (img == '09d') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/rain.svg'
    }
    else if (img == '09n') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/rain.svg'
    }
    else if (img == '11d') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-day.svg'
    }
    else if (img == '11n') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-night.svg'
    }
    else if (img == '13d') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day-snow.svg'
    }
    else if (img == '13n') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night-snow.svg'
    }
    else if (img == '50d') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/mist.svg'
    }
    else if (img == '50n') {
        return 'https://basmilius.github.io/weather-icons/production/fill/all/mist.svg'
    }
    else {
        return `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }
}


function loadingBlock() {
    loading.style.display = 'block';
}

function loadingHidden() {
    loading.style.display = 'none';
}


