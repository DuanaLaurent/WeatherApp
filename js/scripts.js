    //for Google Maps API
    const placesKey = "AIzaSyCrTeA-u4LAy4H7Q2r3YzgW2S_RRdnCz70";
    const placesUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=";
    const photoUrl = "https://maps.googleapis.com/maps/api/place/photo?";

    //for OpenWeather api
    const apiKey = "a27b3a89cebc9b56a39fc1dac2e4bed5";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBar = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");

    //function to return a photo for each city
    async function findPhoto(city) {
        const response = await fetch(placesUrl + city + `&key=${placesKey}&inputtype=textquery&fields=name,photos`);
        var data = await response.json();

        console.log(data);

        let photoReference = data.candidates[0].photos[0].photo_reference;
        console.log(photoReference);

        $(".city-photo-wrapper").append("<img src=" +  photoUrl + `photo_reference=${photoReference}` + `&key=${placesKey}&maxheight=500&maxwidth=1000&html_attributions` +  " width='100%'/>")
        

    }

    searchBtn.addEventListener("click", ()=> {
        findPhoto(searchBar.value);
    })

    //function to fetch weather details
    async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + '%';
        document.querySelector(".feels").innerHTML = Math.round(data.main.feels_like) + '°C';
        document.querySelector(".high").innerHTML = Math.round(data.main.temp_max) + '°C';
        document.querySelector(".low").innerHTML = Math.round(data.main.temp_min) + '°C';
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + 'km/h';
        document.querySelector(".condition").innerHTML = data.weather[0].main;

        //Change weather icon and background based on condition
        if(data.weather[0].main === 'Clear') {
            document.querySelector(".weather-icon").src = "images/sun.png";
        } else if (data.weather[0].main === 'Snow') {
            document.querySelector(".weather-icon").src = "images/snow.png";
        } else if (data.weather[0].main === 'Rain') {
            document.querySelector(".weather-icon").src = "images/rain.png";
        } else if (data.weather[0].main === 'Drizzle') {
            document.querySelector(".weather-icon").src = "images/drizzle.png";
        } else if (data.weather[0].main === 'Thunderstorm') {
            document.querySelector(".weather-icon").src = "images/lightning.png";
            document.querySelector("body").style.background = "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)";
        } else if (data.weather[0].main === 'Clouds') {
            document.querySelector(".condition").innerHTML = 'Cloudy';
            document.querySelector(".weather-icon").src = "images/cloud-sun.png";
        } else if (data.weather[0].description === "overcast clouds") {
            document.querySelector(".weather-icon").src = "images/overcast.png";
        } else {
            document.querySelector(".weather-icon").src = "images/cloud-sun.png";
        }


    }


    searchBtn.addEventListener("click", ()=> {
        checkWeather(searchBar.value);
    })
    
