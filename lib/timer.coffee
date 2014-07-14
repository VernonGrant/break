EventEmitter = require('events').EventEmitter
StatusMessage = require './status-message'

module.exports =
  class Timer extends EventEmitter
    constructor: (@interval = 1000)->

    _isRunning: false
    _startTime: null
    _endTime: null
    _timer: null
    interval: 1000 # 1 Seconds
    _timeRemaining: 0
    _message: null
    _microCount: null

    setStatusBar: (time, count) ->
      @_timeRemaining = time
      @_microCount = count

    updateStatusBar: () ->
      @_timeRemaining = @_timeRemaining - 1
      @displayMessage('<span class=\"icon icon-steps\"></span>' + @_microCount + ' / ' + @_timeRemaining + 's')

    # Display a message, creates one if it doesn't already exist
    displayMessage: (message) ->
      if @_message?
        @_message.setText(message)
      else
        @_message = new StatusMessage(message)

    start: =>
      @cancel() # Cancel any previous/currently running
      @_isRunning = true
      @_timer = setTimeout @tick, @interval
      @_startTime = new Date()

    stop: =>
      @_isRunning = false
      clearTimeout @_timer
      @_endTime = new Date()

    cancel: =>
      @stop()

    tick: =>
      if @_isRunning
        @emit "tick"
        @updateStatusBar()
        # Setup next tick
        @_timer = setTimeout @tick, @interval


    after: (delay = 1000, listener = ->) ->
      type = 'tick'
      startDate = +new Date()
      if delay instanceof Date
        afterDate = +delay
      else
        afterDate = +new Date(startDate + delay)


      # Listener Wrapper
      g = ->
        currDate = +(new Date())
        if currDate >= afterDate
          self.removeListener type, g
          listener.apply this, arguments
          return
      if "function" isnt typeof listener
        throw new Error(".once only takes instances of Function")
      self = this
      g.listener = listener
      self.on type, g
      return {
        "cancel": () =>
          @removeListener type, g
        "listener": g
        "endDate": new Date(afterDate)
        "startDate": new Date(startDate)
        }
