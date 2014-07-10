BreakView = require './break-view'

module.exports =
  breakView: null
  # In miliseconds
  breakInterval: 300000 # 5 minute default
  breakLength: 60000 # 1 minute defualt

  activate: (@state) ->
    # Start Timer
    @timer()


  deactivate: ->
    @breakView.destroy()

  serialize: ->
    breakViewState: @breakView.serialize()

  timer: ->
    # Start interval countdown

    # Activate break view
    @breakView = new BreakView(@state.breakViewState)

    # Start break countdown
      # Get random quote
      # Update progress bar

    # Deactive break view
    @deactivate()

    # Restart
    #@timer()
