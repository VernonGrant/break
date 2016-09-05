module.exports =
  class BreakTrigger

    ###
    Triggers a set of callbacks on the start and end of a break.
    ###
    constructor: (secondsBeforeBreak = 0, breakDuration = 0, @callbackStarted, @callbackEnded , @object = null) ->
      @running = true
      @counter = 0
      @_breakDurationCounter = 0
      @_secondsBeforeBreak = secondsBeforeBreak
      @_breakDuration =  breakDuration
      @onBreak = @_setOnBreak(false)

    watch: ->
      if @_isRunning()
        if @_isHavingBreak() isnt true
          @_incrementCounter()

        if @_isTimeForBreak()
          @_breakStarts()

        if @_isHavingBreak()
          @_incrementCounterBreak()

        if @_isTimeToEndBreak()
          @_breakEnds()

    start: ->
      @running = true

    stop: (bool = true) ->
      @running = false
      @_setOnBreak(false)
      if bool
        @_resetCounters()

    _resetCounters: ->
      @counter = 0
      @_breaksTaken = 0
      @_breakDurationCounter = 0

    _breakStarts: ->
      @onBreak = true
      @callbackStarted(@object)

    _breakEnds: ->
      @stop(true)
      @callbackEnded(@object)

    _isRunning: ->
      @running is true

    _isHavingBreak: ->
      @onBreak is true

    _isTimeForBreak: ->
      @counter is @_secondsBeforeBreak and @_breakDurationCounter is 0

    _isTimeToEndBreak: ->
      @_breakDurationCounter is @_breakDuration

    _incrementCounter: ->
      @counter += 1

    _incrementCounterBreak: ->
      @_breakDurationCounter += 1

    _setOnBreak: (bool) ->
      if @_secondsBeforeBreak is 0
        @onBreak = true
      else
        @onBreak = bool
