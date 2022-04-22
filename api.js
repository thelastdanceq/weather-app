APIKEY = '244ce0346be4b684cc59285d0ab99682';
let obj;
fetch('https://api.openweathermap.org/data/2.5/weather?id=703448&appid=' + APIKEY)
    .then(response => response.json())
    .then((data) => {

        
    })
    .catch(err => console.log(err));


function getLocation() {
    var geolocation = navigator.geolocation;
    geolocation.getCurrentPosition((position) => {console.log(position)});
}


