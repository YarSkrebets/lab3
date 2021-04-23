let images = [];

function preload(arguments) {
    console.log(arguments.length);
    for (let i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = arguments[i];
    }
}

preload(["../img/animeKrest-removebg-preview.png", "../img/tenor.gif"]);