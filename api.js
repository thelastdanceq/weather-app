let APIKEY = '244ce0346be4b684cc59285d0ab99682';
let obj;


const getLoc = new Promise((resolve, reject) => {
    let geolocation = navigator.geolocation;

    geolocation.getCurrentPosition((position) => { resolve(position) });

})


getLoc.then(data => {
    const lat = (data.coords.latitude.toFixed(2));
    const lon = (data.coords.longitude.toFixed(2));

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            let nameField = document.querySelector('#name');
            let degreeField = document.querySelector('#degree');
            let statusField = document.querySelector('#status');
            nameField.innerHTML = data.name;
            degreeField.innerHTML = Math.round(data.main.temp - 273);
            statusField.innerHTML = data.weather[0]['description']
        })
        .catch(err => console.log(err));

})

