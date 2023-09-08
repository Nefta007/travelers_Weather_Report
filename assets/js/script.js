var apiKey = "f978bf3ec4d9bc9745dd5b39365c8644";
var lastSearched = document.getElementById("list-history");
var submitButton = document.getElementById('user-submission')
//var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + currCity + "&appid=" + apiKey;
//var queryUrl = "https:api.openweathermap.org/data/2.5/forecast?q=" + currCity.value + "&appid=" + apiKey;
const newCity = document.getElementById("user-location");

//submitButton.addEventListener('click', GetUserInfo);
function GetInfo(){
    const newName = document.getElementById("user-location");
    const cityName = document.getElementById("city-name");
    cityName.innerHTML = "--"+ currCity.value + "--"
    console.log(cityName);


fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + newCity.value + "&appid=f978bf3ec4d9bc9745dd5b39365c8644")
.then(response=>response.json())
.then(data=>{
    for(i=0; i<5; i++){
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min:" + Number(data.list[i].main.temp_min -288.53).toFixed(1)+'°';
    }
    for(i=0; i<5; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max:" + Number(data.list[i].main.temp_max -288.53).toFixed(1)+'°';
    }
    for(i=0; i<5; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
    }
})

.catch(err =>alert("there has been an error"))
}

// function defaultScreen(){
//     document.getElementById("user-location").defaultValue = "California";
//     GetUserInfo();
// }