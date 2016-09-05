module.exports =
  class Timer

    ###
    A callback get called every second, the current instance and an aditional
    object or value gets passed to the callback.
    ###
    constructor: (@callback, @object = null, @autoStart = false) ->
      @running = false
      @interval = 1000
      @secondCounter = 0
      @intervalId = null

      if @autoStart
        @_startInterval()

    start: ->
      @_startInterval()

    stop: ->
      clearInterval(@intervalId)
      @running = false
      @secondCounter = 0

    incrementSeconds: ->
      @secondCounter += 1

    isSecondsEqualTo: (seconds) ->
      if @secondCounter == seconds
        true
      else
        false

    _startInterval: ->
      @running = true
      @intervalId = setInterval(@_onInterval, @interval, @, @object)

    _onInterval: (self, object) ->
      self.incrementSeconds()
      self.callback(self, object)
