{View} = require 'atom'

module.exports =
# Internal: The main view for displaying the status from Travis CI.
class BreakStatusView extends View
  # Internal: Build up the HTML contents for the fragment.
  @content: ->
    @div class: 'break-status inline-block', =>
      @span
        class: 'break-status icon icon-history'
        outlet: 'status', tabindex: -1
        'wow'

  # Internal: Initialize the view.
  #
  # nwo    - The string of the repo owner and name.
  # matrix - The build matrix view.
  initialize: (@break, @timer) ->
    # atom.workspaceView.command 'break:toggle', =>
    #    @toggle()
    @attach()
    @toggle()

  # Internal: Serialize the state of this view.
  #
  # Returns an object containing key/value pairs of state data.
  serialize: ->

  # Internal: Attach the status bar segment to the status bar.
  #
  # Returns nothing.
  attach: ->
    atom.workspaceView.statusBar?.appendLeft @

  # Internal: Destroy the view and tear down any state.
  #
  # Returns nothing.
  destroy: ->
    @detach()

  # Internal: Toggle the visibility of the view.
  #
  # Returns nothing.
  toggle: ->
    if @hasParent()
      @detach()
    else
      @attach()

  # Internal: Get the active pane item path.
  #
  # Returns a string of the file path, else undefined.
  getActiveItemPath: ->
    @getActiveItem()?.getPath?()

  # Internal: Get the active pane item.
  #
  # Returns an object for the pane item if it exists, else undefined.
  getActiveItem: ->
    atom.workspaceView.getActivePaneItem()

  # Internal: Update the repository build status from Travis CI.
  #
  # Returns nothing.
  update: =>
    return unless @hasParent()
    @status.text "TEST"
