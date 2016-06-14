Quotes = require('./quotes')

# converts seconds to time.
module.exports.secoundsToTime =  (secounds) ->
  sec = parseInt(secounds, 10)
  hours   = Math.floor(sec / 3600)
  minutes = Math.floor((sec - (hours * 3600)) / 60)
  seconds = sec - (hours * 3600) - (minutes * 60)
  if hours < 10
    hours   = "0" + hours
  if minutes < 10
    minutes = "0" + minutes
  if seconds < 10
    seconds = "0" + seconds
  hours + ':' + minutes + ':' + seconds

# translates our template strings into valid dom nodes.
module.exports.createElement = (htmlString, classes = "") ->
  item = document.createElement('div')
  item.className = classes
  item.innerHTML = htmlString
  item

# returns a random quote.
module.exports.getRandomQuote = ->
  Quotes.quotes[Math.floor(Math.random()*Quotes.quotes.length)]
