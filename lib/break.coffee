BreakView = require './break-view'
Timer = require './timer'

module.exports =

  configDefaults:
    microBreakIntervalInSeconds: 5*60
    microBreakLengthInSeconds: 15
    macroBreakIntervalInMicroAmount: 8
    macroBreakLengthInSeconds: 5*60

  # Views
  breakView: null
  currentMicroCount: null

  activate: (@state) ->
    # Create break view
    @timer = new Timer 1000
    @breakView = new BreakView @, @timer
    @currentMicroCount = 0

    # Start interval countdown
    @timer.start()
    @scheduleBreak()

  deactivate: ->
    @breakView?.destroy()

  serialize: ->
    breakViewState: @breakView.serialize()

  scheduleBreak: ->
    # Cancel any previously scheduled break
    if @_scheduledBreak?
      @_scheduledBreak.cancel()
      delete @_scheduledBreak
    # Start break countdown
    interval = 1000 * atom.config.get 'break.microBreakIntervalInSeconds'
    # Set countdown for status bar
    @timer.setStatusBar(interval / 1000, @currentMicroCount)
    # console.log interval
    @_scheduledBreak = @timer.after interval, () =>
      # console.log "BREAK TIME"
      @breakView.show()
      # Schedule
      do @scheduleBreakEnd

  scheduleBreakEnd: ->
    # Cancel any previously scheduled break end
    if @_scheduledBreakEnd?
      @_scheduledBreakEnd.cancel()
      delete @_scheduledBreakEnd
    # Start break countdown
    breakCount = atom.config.get 'break.macroBreakIntervalInMicroAmount'
    if @currentMicroCount >= breakCount
      duration = 1000 * atom.config.get 'break.macroBreakLengthInSeconds'
      @currentMicroCount = 0
    else
      duration = 1000 * atom.config.get 'break.microBreakLengthInSeconds'
    # console.log duration
    @_scheduledBreakEnd = @timer.after duration, () =>
      # console.log "END BREAK TIME"
      @breakView.hide()
      # Increment micro count
      @currentMicroCount++
      # Reschedule
      do @scheduleBreak
