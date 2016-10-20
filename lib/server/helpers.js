'use strict';

// Quotes = require('./quotes')

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.secoundsToTime = secoundsToTime;
exports.createElement = createElement;
exports.getRandomQuote = getRandomQuote;
var quotes = ["Whatever the mind of man can conceive and believe, it can achieve – Napoleon Hill", "A goal is a dream with a deadline. – Napoleon Hill", "If you cannot do great things, do small things in a great way. – Napoleon Hill", "Don't wait. The time will never be just right. – Napoleon Hill", "Patience, persistence and perspiration make an unbeatable combination for success. – Napoleon Hill", "The starting point of all achievement is desire. – Napoleon Hill", "It is literally true that you can succeed best and quickest by helping others to succeed. – Napoleon Hill", "When your desires are strong enough you will appear to possess superhuman powers to achieve. – Napoleon Hill", "Most great people have attained their greatest success just one step beyond their greatest failure. – Napoleon Hill", "Action is the real measure of intelligence. – Napoleon Hill"];

function secoundsToTime(seconds) {

    var sec = parseInt(seconds, 10);
    var hours = Math.floor(sec / 3600);
    var minutes = Math.floor((sec - hours * 3600) / 60);
    seconds = sec - hours * 3600 - minutes * 60;

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return hours + ':' + minutes + ':' + seconds;
}

function createElement(htmlString) {
    var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


    var item = document.createElement('div');
    item.className = classes;
    item.innerHTML = htmlString;

    return item;
}

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}