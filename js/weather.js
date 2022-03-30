async function requestWeather(latitude, longitude, onAnswer) {
    let url = "http://localhost:3000/weather/coordinates?lat=" + latitude + "&lon=" + longitude;
    await fetch(url)
        .then(data => {
            return data.json()
        })
        .then(res => {
            onAnswer(res)
        });
}
async function getFastWeather(city, onAnswer) {
    let url = "http://localhost:3000/weather/city?q=" + urlEncode(city);
    await fetch(url)
        .then(data => {
            return data.json()
        })
        .then(res => {
            onAnswer(res)
        });
}



async function getFastWeather(city, onAnswer, catched) {
    let url = "http://localhost:3000/weather/city?q=" + city;
    await fetch(url)
        .then(data => {
            return data.json()
        })
        .then(res => {
            onAnswer(res)
        }).catch(catched);
}