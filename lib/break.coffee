BreakView = require './break-view'
BreakStatusView = require './break-status-view'
Timer = require './timer'

module.exports =

  configDefaults:
    breakIntervalInSeconds: 5*60
    breakLengthInSeconds: 30

  # Views
  breakView: null
  breakStatusBarView: null

  activate: (@state) ->
    # Create break view
    @timer = new Timer 1000
    @breakView = new BreakView @, @timer

    # Start interval countdown
    @timer.start()
    #
    @scheduleBreak()

    # atom.packages.once 'pane-container:active-pane-item-changed', =>
    #   console.log("attach status!")
    #   @breakStatusBarView = new BreakStatusView @, @timer

  deactivate: ->
    @breakView?.destroy()
    @breakStatusView?.destroy()

  serialize: ->
    breakViewState: @breakView.serialize()

  scheduleBreak: ->
    # Cancel any previously scheduled break
    if @_scheduledBreak?
      @_scheduledBreak.cancel()
      delete @_scheduledBreak
    # Start break countdown
    interval = 1000 * atom.config.get 'break.breakIntervalInSeconds'
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
    duration = 1000 * atom.config.get 'break.breakLengthInSeconds'
    # console.log duration
    @_scheduledBreakEnd = @timer.after duration, () =>
      # console.log "END BREAK TIME"
      @breakView.hide()
      # Reschedule
      do @scheduleBreak
