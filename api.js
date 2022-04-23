let APIKEY = '244ce0346be4b684cc59285d0ab99682';
let obj;


const getLoc = new Promise((resolve, reject) => {
    let geolocation = navigator.geolocation;

    geolocation.getCurrentPosition((position) => { resolve(position) });

})


getLoc.then(data => {
    const lat = (data.coords.latitude.toFixed(2));
    const lon = (data.coords.longitude.toFixed(2));

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=&appid=${APIKEY}`)
        .then(response => {
            return response.json()
        })
        .then((data) => {
            console.log(data);
            let forecast = document.querySelector('#forecast');
            data.daily.forEach((date, index) => {

                let div = document.createElement('div');
                div.classList.add('day');
                if (index === 0) div.classList.add('now');

                let dateDt = new Date(date.dt * 1000);
                let day = dateDt.getDay();
                switch (day) {
                    case 6:
                        div.innerHTML = 'Sunday';
                        break;

                    case 5:
                        div.innerHTML = 'Saturday';

                        break;
                    case 4:

                        div.innerHTML = 'Friday';

                        break;
                    case 3:
                        div.innerHTML = 'Thursday';

                        break;
                    case 2:
                        div.innerHTML = 'Wednesday';

                        break;
                    case 1:
                        div.innerHTML = 'Tuesday';

                        break;
                    case 0:
                        div.innerHTML = 'Monday';

                        break;
                }
                let temp = Math.round(date.temp.day - 273);
                let p = document.createElement('p');
                p.innerHTML = temp + '&deg;';
                div.appendChild(p)
                forecast.appendChild(div);
            });
        })
        .catch(err => {
            console.error(err);
        });

})



function chooseImage(temp, weather, windSpeed) {

}
