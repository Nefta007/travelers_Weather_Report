var currCity = document.getElementById("user-location");
var userButton = document.getElementById("user-submission-btn");
var userHistory = document.getElementById("listHistory-btn")
var apiKey = "f978bf3ec4d9bc9745dd5b39365c8644";
//var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + CityLocation + "&appid=" + apiKey;
var dateArray = [];

var UserCity = function (event) {
    event.preventDefault();
    let CityLocation = currCity.value.trim();
    if (!CityLocation) {
        alert("please input a city");
    }
    else {
        // alert("you chose " + CityLocation);
        GetWeather(CityLocation)
        userHistory.value = '';
        const newElement = document.getElementById('cityOfChoice');
        newElement.innerHTML = currCity.value;
        return;
    }
};

var GetWeather = function (CityLocation) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + CityLocation + "&appid=" + apiKey;
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(CityLocation);
            for (var i = 0; i < 6; i++) {
                document.getElementById('T-' + i).textContent = 'Temp: ' + Number(data.list[i].main.temp).toFixed(1) + '°';
            }
            for (var i = 0; i < 6; i++) {
                document.getElementById('w-' + i).textContent = 'Wind: ' + Number(data.list[i].wind.speed).toFixed(1) + 'MPH';
            }
            for (var i = 0; i < 6; i++) {
                document.getElementById('h-' + i).textContent = 'Humidity: ' + Number(data.list[i].main.humidity) + '%';
            }

            for (var i = 0; i < 6; i++) {
                document.getElementById('icon-' + i).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
            }

        })
}





for (var i = 0; i < 7; i++) {
    var future = new Date(); // get today date
    future.setDate(future.getDate() + i); // add 7 days
    var finalDate = ((future.getMonth() + 1) < 10 ? '' : '') + (future.getMonth() + 1) + '-' + future.getDate() + '-' + future.getFullYear();
    dateArray.push(finalDate);
    for (var i = 0; i < dateArray.length; i++) {
        document.getElementById('day-' + i).textContent = dateArray[i];
    }
    //console.log(dateArray);
}

userButton.addEventListener("click", UserCity);

