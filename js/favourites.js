let addButton = document.getElementById("buttonDonate");
let formAdd = document.getElementById("newCity");
let counter = 0;
let newCityData;

let parsers = {
    "favourite_temperature": (res) => {
        return Math.trunc(res.main.temp) + "°C";
    },
    "favourite_wind": (res) => {
        return res.wind.speed;
    },
    "favourite_clouds": (res) => {
        return res.clouds.all;
    },
    "favourite_pressure": (res) => {
        return res.main.pressure;
    },
    "favourite_humidity": (res) => {
        return res.main.humidity;
    },
    "favourite_latitude": (res) => {
        return res.coord.lat;
    },
    "favourite_longitude": (res) => {
        return res.coord.lon;
    },
    "city-name": (res) => {
        return res.name;
    }
};

localStorageInit();
forEachFavouriteOrdered((newCityName, i) => {
    let FavouritesCity = document.createElement("li")
    FavouritesCity.classList.add("cityBlock", "mb25");
    document.getElementById("FavouritesCities").appendChild(FavouritesCity);
    getFastWeather(newCityName, (res) => {
        if (res.cod === 200) {
            newCityData = JSON.stringify(res);
            FavouritesCity.setAttribute("name", res.name);

            let weatherImg;

            let weather = JSON.stringify(res.weather);
            let isRainy = weather.includes("Rain") || weather.includes("Snow");


            if (isRainy) {
                weatherImg = "../img/sk2NgSo19ek.jpg";
            } else {
                weatherImg = "../img/M2tjhQmJe0o.jpg";
            }
            FavouritesCity.innerHTML = document.getElementById("favouriteTemplate").innerHTML;
            let prefilledFantasies = FavouritesCity.getElementsByClassName("prefill");
            for (let i = 0; i < prefilledFantasies.length; i++) {
                let element = prefilledFantasies.item(i);
                let parser = parsers[element.getAttribute("name")];
                if (parser !== undefined) {
                    element.innerText = parser(res);
                } else {
                    element.innerText = "Я ЗАПОЛНЯЮ ГЛУБОКУЮ ФАНТАЗИЮ ДЛЯ " + element.getAttribute("name");
                }
            }
            FavouritesCity.getElementsByClassName("animeWeather").item(0).setAttribute("src", weatherImg);

            FavouritesCity.setAttribute("name", res.name);
        } else {

        }
    });

});
formAdd.onsubmit = function (e) {
    e.preventDefault();
}

addButton.onclick = async function () {
    let newCityName = document.getElementById("newCityName").value;
    document.getElementById("newCityName").value = '';
    let FavouritesCity = document.createElement("li");
    document.getElementById("FavouritesCities").appendChild(FavouritesCity);
    FavouritesCity.innerHTML = "<img src='../img/tenor.gif' height='300px' width='400px'  alt='loading'>";
    FavouritesCity.classList.add("cityBlock", "mb25");
    await getFastWeather(newCityName, async (res) => {
        if (res.cod === 200) {
            newCityData = JSON.stringify(res);
            FavouritesCity.setAttribute("name", res.name);
            let result = await addFavourite(res.name);
            console.log("result: " + result);
            if (result != true) {
                alert("Вы ввели город который у вас уже есть");
                FavouritesCity.remove();
                return;
            }
            let weatherImg;

            let weather = JSON.stringify(res.weather);
            let isRainy = weather.includes("Rain") || weather.includes("Snow");


            if (isRainy) {
                weatherImg = "../img/sk2NgSo19ek.jpg";
            } else {
                weatherImg = "../img/M2tjhQmJe0o.jpg";
            }
            FavouritesCity.innerHTML = document.getElementById("favouriteTemplate").innerHTML;
            let prefilledFantasies = FavouritesCity.getElementsByClassName("prefill");
            for (let i = 0; i < prefilledFantasies.length; i++) {
                let element = prefilledFantasies.item(i);
                let parser = parsers[element.getAttribute("name")];
                if (parser !== undefined) {
                    element.innerText = parser(res);
                } else {
                    element.innerText = "Я ЗАПОЛНЯЮ ГЛУБОКУЮ ФАНТАЗИЮ ДЛЯ " + element.getAttribute("name");
                }
            }
            FavouritesCity.getElementsByClassName("animeWeather").item(0).setAttribute("src", weatherImg);

            FavouritesCity.setAttribute("name", res.name);
        } else {
            alert("Город не найден или произошла ошибка на сервере. Соси короче.");
            FavouritesCity.remove();
        }
    }, () => {
        alert("Город не найден или произошла ошибка на сервере. Соси короче.");
        FavouritesCity.remove();
    });


}

function clearFavourite(e) {
    removeFavourite(e.parentNode.parentNode.parentNode.parentNode.getAttribute("name").toLowerCase());
    e.parentNode.parentNode.parentNode.parentNode.remove();
}