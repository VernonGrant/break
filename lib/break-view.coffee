{View} = require 'atom'

module.exports =
class BreakView extends View
  @content: ->
    # The full screen overlay
    @div class: 'overlay from-top floating break', =>
      # Panel in the center
      @div class: "panel bordered vertical-center", =>
        @div class: "panel-heading text-center", =>
          @h4 class: 'actual-heading', 'Time to take a break;'
        @div class: "panel-body padded", =>
          # Quote
          @p class: 'text-center', 'Whatever the mind of man can conceive and believe, it can achieve. – Napoleon Hill'
          # Progress Bar
          @div class: 'block', =>
            @progress class: 'inline-block widen', max: '100', value: '10'

  initialize: (serializeState) ->
    atom.workspaceView.command "break:toggle", => @toggle()

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @detach()

  toggle: ->
    console.log "BreakView was toggled!"
    if @hasParent()
      @detach()
    else
      atom.workspaceView.append(this)
