'use babel';

export function secondsToTime(seconds){

    let sec = parseInt(seconds, 10);
    let hours   = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60);
    seconds = sec - (hours * 3600) - (minutes * 60);

    if (hours < 10){
        hours = "0" + hours;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }

    return hours + ':' + minutes + ':' + seconds;
}

export function createElement(htmlString, classes = ''){

    let item = document.createElement('div');
    item.className = classes;
    item.innerHTML = htmlString;

    return item;

}

export function getRandomArrayItem(array = []){
    return array[Math.floor(Math.random()*array.length)];
}
