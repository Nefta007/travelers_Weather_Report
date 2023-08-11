var apiKey = "f978bf3ec4d9bc9745dd5b39365c8644";
var currCity;
var lastSearched = "";
var submitButton = document.querySelector('#submission');
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + currCity + "&appid=" + apiKey;

function pressSubmit(event){
    event.preventDefault();
    console.log("hello");
}