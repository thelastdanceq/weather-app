APIKEY = '244ce0346be4b684cc59285d0ab99682';
let obj;
fetch('https://api.openweathermap.org/data/2.5/weather?id=703448&appid=' + APIKEY)
    .then(response => response.json())
    .then((data) => { obj = data })
    .then(() => console.log(obj))
    .catch(err => console.log(err));

