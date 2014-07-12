EventEmitter = require('events').EventEmitter

module.exports =
  class Timer extends EventEmitter
    constructor: (@interval = 1000)->

    _isRunning: false
    _startTime: null
    _endTime: null
    _timer: null
    interval: 1000 # 1 Seconds

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
