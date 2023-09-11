var currCity = document.getElementById("user-location");
var userButton = document.getElementById("user-submission-btn");
var userHistory = document.getElementById("listHistory-btn")
var apiKey = "f978bf3ec4d9bc9745dd5b39365c8644";
//var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + CityLocation + "&appid=" + apiKey;
var userInput;
var dateArray = [];

//function that will start the whole process by taking in the value of user location
var UserCity = function (event) {
    event.preventDefault();
    let CityLocation = currCity.value;
    //calls functino that will give us conditions of weather 
    GetWeather(CityLocation)
    userButton.addEventListener("click", storageAddition(currCity));
    //we added an event listener so that when submit is clicked a function is called to add it to storage
    displayHistory();
    // this calls function that will help display previous searched locations

};

//function to get conditions for searched location
var GetWeather = function (CityLocation) {
    //if nothing is inputted then alert user to this
    if (!CityLocation) {
        alert("please input a city");
    }
    //if there was an input we want to input to display city name to the top part of the dipslay
    else {
        userHistory.value = '';
        const newElement = document.getElementById('cityOfChoice');
        newElement.innerHTML = CityLocation;
        //this will provided the url which will add the location user is looking for as well as add the api key for permission
        var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + CityLocation + "&appid=" + apiKey;

        //fetches queryUrl that will provide information for the different sections user is looking at, for the current day as well as the 5 day forecast using for loop
        //through research following code snippet was created
        fetch(queryUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                for (var i = 0; i < 6; i++) {
                    //added (temp-273.15)*(9/5)+32 in order to convert to fahrenheit it was in kelvin before
                    //to fixed was set to 2 to provide 2 decimal space format
                    document.getElementById('T-' + i).textContent = 'Temp: ' + Number((data.list[i].main.temp-273.15)*(9/5)+32).toFixed(2) + '°F';
                }
                for (var i = 0; i < 6; i++) {
                    document.getElementById('w-' + i).textContent = 'Wind: ' + Number(data.list[i].wind.speed).toFixed(2) + 'MPH';
                }
                for (var i = 0; i < 6; i++) {
                    document.getElementById('h-' + i).textContent = 'Humidity: ' + Number(data.list[i].main.humidity) + '%';
                }
                // this portion will provided the icons for the different sections
                for (var i = 0; i < 6; i++) {
                    document.getElementById('icon-' + i).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
                }

            })
    }
}


//for loop will set the date that will be displayed for each day, this was created from research
for (var i = 0; i < 7; i++) {
    var future = new Date(); 
    future.setDate(future.getDate() + i);
    var finalDate = ((future.getMonth() + 1) < 10 ? '' : '') + (future.getMonth() + 1) + '-' + future.getDate() + '-' + future.getFullYear();
    dateArray.push(finalDate);
    //length -1 was included because otherwise the first day of the 5 day forecast was set to 1 extra day in advanced
    for (var i = 0; i < dateArray.length-1; i++) {
        document.getElementById('day-' + i).textContent = dateArray[i];
    }
}
//this will store values into local storage 
var storageAddition = (currCity) => {
    const value = currCity.value;
    //again we will check to see if there was any input
    if (!currCity.value) {
        //alert("please add input")
        console.log('please add an input');
    }
    else {
        //next we check to see if value that is taken in already exist within storage
        // uses for loop to loop through local storage to check for existance
        //if else statement was used to check and set values into local storage
        let doesExist = false;
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage[i] === value) {
                doesExist = true;
                break;
            }
        }
        if (doesExist === false) {
            localStorage.setItem(localStorage.length, value);
        }
    }

}
//displayHistory was used to dipsplay the different values within local storage
var displayHistory = () => {
    if (localStorage.length === 0) {
        //this was created to check if local storage is empty
        console.log('this is empty');
    }
    else {
        //looks at last item inputted and sets it within user-location
        var latestCity = localStorage.length - 1;
        userInput = localStorage.getItem(latestCity);
        //sets latest value from local storage into user-location
        $('#user-location').attr("value", userInput);
        //for loop will create a button for the values in local storage 
        for (var i = 0; i < localStorage.length; i++) {
            var newcity = localStorage.getItem(i);
            var currCityEl = `<button type="button">${newcity}</button></li>`;
        }
        //this will append to listHistory-btn
        $('#listHistory-btn').append(currCityEl);
    }
    //this will create an event for the button that is associated with the history of prior searched cities
    userHistory.addEventListener("click", (event) => {
        userInput = event.target.textContent;
        GetWeather(userInput);
    })
    //when page is reloaded local storage is cleared
    window.onbeforeunload = function (e) { localStorage.clear(); };
}

userButton.addEventListener("click", UserCity);