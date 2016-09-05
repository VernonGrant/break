BreakHelpers = require './break-helpers'
BreakTrigger = require './break-trigger'
BreakTemplates = require './break-templates'
Timer = require './timer'

module.exports =

  # Config Schema
  config:
    macroBreakIntervalInMicroAmount:
      type: 'integer'
      default: 8
      minimum: 1
    macroBreakLengthInSeconds:
      type: 'integer'
      default: 300
      minimum: 1
      maximum: 86400
    microBreakIntervalInSeconds:
      type: 'integer'
      default: 300
      minimum: 5
      maximum: 86400
    microBreakLengthInSeconds:
      type: 'integer'
      default: 15
      minimum: 5
      maximum: 86400

  activate: (@state) ->

    # Counters
    @microBreakCounter = 0

    # Config data holders
    @microBreakInterval =
      atom.config.get('break.microBreakIntervalInSeconds')
    @microBreakLength =
      atom.config.get('break.microBreakLengthInSeconds')
    @macroBreakInterval =
     atom.config.get('break.macroBreakIntervalInMicroAmount')
    @macroBreakLength =
     atom.config.get('break.macroBreakLengthInSeconds')

    # Break trigger & Timer objects
    @Timer = new Timer(@everySecond, @, true)

    @microBreakTrigger = new BreakTrigger(
      @microBreakInterval,
      @microBreakLength,
      @_microBreakStarts,
      @_microBreakEnds,
      @)

    @macroBreakTrigger = new BreakTrigger(
      @microBreakInterval,
      @macroBreakLength,
      @_macroBreakStarts,
      @_macroBreakEnded,
      @)

    @macroBreakTrigger.stop(false)

    # Break panel
    breakPanelItem = BreakHelpers.createElement(
      BreakTemplates.breakPanel,
      'break-panel')

    @breakPanel = atom.workspace.addModalPanel(
      item: breakPanelItem,
      visible: false,
      priority: 100)

  consumeStatusBar: (statusBar) ->
    intervalItem = BreakHelpers.createElement(
      BreakTemplates.statusBarInterval,
      'inline-block')

    @intervalTile = statusBar.addRightTile(item: intervalItem, priority: 0)

  # Called every second by the timer
  everySecond: (timer, object) ->
    if object.microBreakTrigger.running
      object.microBreakTrigger.watch()

      object._updateIntervalTile(
        object.microBreakTrigger.counter,
        object.microBreakInterval)

      object._updateBreakProgress(
        object.microBreakTrigger._breakDurationCounter,
        object.microBreakLength)

    if object._isTimeForMacroBreak()
      object.macroBreakTrigger.start()
      object.macroBreakTrigger.watch()

      object._updateIntervalTile(
        object.macroBreakTrigger.counter,
        object.microBreakInterval)

      object._updateBreakProgress(
        object.macroBreakTrigger._breakDurationCounter,
        object.macroBreakLength)

  # restart
  restart: ->
    @microBreakCounter = 0
    @Timer.stop()
    @Timer.start()
    @microBreakTrigger.start()

  # macro break starts
  _macroBreakStarts: (object) ->
    object._updateBreakQuote()
    object.breakPanel.show()

  # macro break ends
  _macroBreakEnded: (object) ->
    object.restart()
    object.breakPanel.hide()

  # micro break starts
  _microBreakStarts: (object) ->
    object._updateBreakQuote()
    object.breakPanel.show()

  # micro break ends
  _microBreakEnds: (object) ->
    object.microBreakCounter += 1

    if object._isTimeForMacroBreak() isnt true
      object.microBreakTrigger.start()

    if object._isTimeForMacroBreak()
      object.macroBreakTrigger.start()

    object.breakPanel.hide()

  _isTimeForMacroBreak: ->
    @microBreakCounter is @macroBreakInterval

  # updates the status bar tile
  _updateIntervalTile: (counter, interval) ->
    item = document.getElementById('break-interval-timer')
    if item isnt null
      time = BreakHelpers.secoundsToTime(interval - counter)
      item.innerHTML = @microBreakCounter + ' | ' + time

  # updates the break panels progress bar
  _updateBreakProgress: (counter, breakLength) ->
    item = document.getElementById('break-progress')
    if item isnt null
      item.value = Math.round((counter / breakLength) * 100)

  # updates the break panels quote with a random one
  _updateBreakQuote: ->
    item = document.getElementById('break-quote')
    if item isnt null
      item.innerHTML = BreakHelpers.getRandomQuote()

  deactivate: ->
    @Timer.stop()

  serialize: ->
