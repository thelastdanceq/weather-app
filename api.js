let APIKEY = '244ce0346be4b684cc59285d0ab99682';
let obj;


const getLoc = new Promise((resolve, reject) => {
    let geolocation = navigator.geolocation;

    geolocation.getCurrentPosition((position) => { resolve(position) });

})


getLoc.then(data => {
    const lat = (data.coords.latitude.toFixed(2));
    const lon = (data.coords.longitude.toFixed(2));
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,current,hourly,alerts&appid=${APIKEY}`)
        .then((response) => { return response.json() })
        .then((data) => {
            console.log(data);
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`)
                .then((response) => { return response.json() })
                .then((data1) => {
                    console.log(data1);
                    const now = document.querySelector('#now');
                    let tempNow = document.createElement('p');

                    tempNow.innerHTML = Math.round(data1.main.temp - 273) + '&deg;';
                    let image;
                    let iconNowImage;
                    switch (data1.weather[0].main) {
                        case 'Clouds':
                            if (Math.round(data1.main.temp - 273) > 0 && Math.round(data1.main.temp - 273) <= 20) {
                                image = "/images/photo_2022-04-24_12-24-43-removebg-preview.png"
                                iconNowImage = '/images/icons8-ветреная-погода-96.png'
                            } else {
                            }
                            break;

                        case 'Clear':
                            console.log('clear');
                            image = "/images/icons8-солнце-16.png"
                            iconNowImage = '/images/icons8-лето-96.png'

                            break;
                        case 'Snow':
                            image = "/images/icons8-метель-16.png"
                            break;
                        case "Rain":
                            if (Math.round(data1.main.temp - 273)> 0 && Math.round(data1.main.temp - 273) <= 20) {
                                image = "/images/photo_2022-04-24_11-10-06-removebg-preview.png"
                                iconNowImage = '/images/icons8-сильный-дождь-96.png'
                            }
                            break;
                        case "Drizzle":
                            image = "/images/icons8-небольшая-облачность-дождь-16.png"
                            break;
                        case "Thunderstorm":
                            image = "/images/icons8-молния-из-облаков-16.png"
                            break;
                    }
                    let imageNowDiv = document.createElement('div');
                    imageNowDiv.classList.add('imgs');
                    let imageNow = document.createElement('img');
                    let iconNow = document.createElement('img');
                    iconNow.src = iconNowImage;
                    iconNow.height = '100';
                    iconNow.width = '100';
                    imageNow.src = image;
                    let place = document.createElement('p');
                    place.innerHTML = data1.name
                    imageNow.height = '300';
                    imageNowDiv.appendChild(iconNow)
                    imageNowDiv.appendChild(imageNow);
                    now.appendChild(place);
                    now.appendChild(imageNowDiv)
                    now.appendChild(tempNow)


                });


            let forecast = document.querySelector('#forecast');

            data.daily.forEach((date, index) => {
                let div = document.createElement('div');
                div.classList.add('day');
                let imageDay;
                let imageIcon;
                let dateDt = new Date(date.dt * 1000);
                let day = dateDt.getDay();
                let dateOfDay = dateDt.getMonth() + 1 + '.' + Number.parseInt(dateDt.getDate() );
                console.log(dateDt.getMonth() +" "+ dateDt.getDate());
                switch (day) {
                    case 6:
                        div.innerHTML = 'Воскресение ' + dateOfDay;
                        break;

                    case 5:
                        div.innerHTML = 'Суббота ' + dateOfDay;

                        break;
                    case 4:

                        div.innerHTML = 'Пятница ' + dateOfDay;

                        break;
                    case 3:
                        div.innerHTML = 'Четверг ' + dateOfDay;

                        break;
                    case 2:
                        div.innerHTML = 'Среда ' + dateOfDay;

                        break;
                    case 1:
                        div.innerHTML = 'Вторник ' + dateOfDay;

                        break;
                    case 0:
                        div.innerHTML = 'Понедельник ' + dateOfDay;

                        break;
                }
                let temp = Math.round(date.temp.day - 273);
                switch (date.weather[0].main) {
                    case 'Clouds':
                        if (date.temp.day - 273 > 0 && date.temp.day - 273 <= 20) {
                            imageDay = "/images/photo_2022-04-24_12-24-43-removebg-preview.png"
                            imageIcon = '/images/icons8-ветреная-погода-96.png'
                        }
                        break;

                    case 'Clear':
                        if (date.temp.day - 273 > 0 && date.temp.day - 273 <= 20) {
                            imageDay = "/images/photo_2022-04-24_12-19-16-removebg-preview.png"
                            imageIcon = '/images/icons8-лето-96.png'
                        }
                        break;
                    case 'Snow':
                        imageDay = "/images/icons8-метель-16.png"
                        break;
                    case "Rain":
                        if (temp > 0 && temp <= 20) {
                            imageDay = "/images/photo_2022-04-24_11-10-06-removebg-preview.png"
                            imageIcon = '/images/icons8-сильный-дождь-96.png'
                        }
                        break;
                    case "Drizzle":
                        imageDay = "/images/icons8-небольшая-облачность-дождь-16.png"
                        break;
                    case "Thunderstorm":
                        imageDay = "/images/icons8-молния-из-облаков-16.png"
                        break;
                }

                let p = document.createElement('p');
                p.innerHTML = temp + '&deg;';
                let imgDay = document.createElement('img');
                let iconNow = document.createElement('img');
                iconNow.src = imageIcon;
                iconNow.height = '100';
                iconNow.width = '100';
                let imgDayDiv = document.createElement('div');
                imgDayDiv.classList.add('imgs');
                imgDayDiv.appendChild(iconNow);
                imgDayDiv.appendChild(imgDay);
                imgDay.src = imageDay;
                imgDay.classList.add('image');
                imgDay.height = '250';
                div.appendChild(imgDayDiv);
                div.appendChild(p)
                forecast.appendChild(div);

            });
        })
        .catch(err => {
            console.log(err);
        });

})




