function localStorageInit() {

}

let url = "http://51.38.128.132:8080/favourites";

async function getAllFavourites() {
    let response = await fetch(url);
    return await response.json();
}

async function _addFavourite(name) {
    let response = await fetch(url, {
        method: "POST",
        body: name
    })
    return await response.text();
}

async function _removeFavourite(name) {
    let response = await fetch(url, {
        method: "DELETE",
        body: name
    })
    return await response.text();
}

async function forEachFavouriteOrdered(handler) {
    let array = await getAllFavourites();
    console.log(array.length);
    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
        await handler(array[i], i);
    }

}

async function addFavourite(value) {
    var val = await _addFavourite(value);
    console.log(val.toString());
    console.log(typeof val);
    console.log("true".includes(val.toString()));
    return "true".includes(val.toString());
}

async function removeFavourite(value) {
    return !!await (_removeFavourite(value)) === "true";
}