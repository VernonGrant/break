{View} = require 'atom'

module.exports =
class BreakView extends View
  @content: ->
    # The full screen overlay
    @div class: 'overlay from-top floating break', =>
      # Panel in the center
      @div class: "panel bordered vertical-center", =>
        @div class: "panel-heading text-center", =>
          @h4
            class: 'actual-heading',
            =>
              @span 'Time to take a '
              @span class: 'text-danger', "break;"

        @div class: "panel-body padded", =>
          # Quote
          @p
            class: 'break-quote text-center text-highlight'
            outlet: 'quote'
            ''
          # Progress Bar
          @div class: 'block', =>
            @progress
              class: 'inline-block widen'
              max: '100'
              value: '0'
              outlet: 'progress'

  initialize: (@break, @timer) ->
    atom.workspaceView.command "break:toggle", => @toggle()
    @timer.on "tick", @tickHandler

  tickHandler: =>
    currDate = new Date()
    startDate = @break._scheduledBreakEnd?.startDate
    endDate = @break._scheduledBreakEnd?.endDate
    if not startDate? and not endDate?
      @progress.val 0
      return
    total = (+endDate - +startDate)
    elapse = (+currDate - +startDate)
    percentage = (elapse / total)*100
    console.log currDate, startDate, endDate, total, elapse, percentage
    @progress.val percentage

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @timer.removeListener "tick", @tickHandler
    @detach()

  refresh: ->
    @progress.val 0
    @quote.text @generateQuote()

  generateQuote: ->
    "Whatever the mind of man can conceive and believe, it can achieve.
    – Napoleon Hill"

  show: ->
    if not @hasParent()
      atom.workspaceView.append @
    @refresh()

  hide: ->
    if @hasParent()
      @detach()

  isShowing: ->
    @hasParent()

  toggle: ->
    console.log "BreakView was toggled!"
    if @isShowing()
      @hide()
    else
      @show()
