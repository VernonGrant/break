Timer = require('../lib/timer')

myCallback = (self)->
  console.log 'Running'

describe "Timer", ->

  it "can be started using the start method", ->
    timer = new Timer(myCallback)
    timer.start()
    expect(timer.running).toBe(true)
    timer.stop()

  it "can be stoped using the stop method", ->
    timer = new Timer(myCallback)
    timer.start()
    timer.stop()
    expect(timer.running).toBe(false)

  it "is not running when autoStart is not defined", ->
    timer = new Timer(myCallback)
    expect(timer.running).toBe(false)

  it "is running when autoStart is set to true", ->
    timer = new Timer(myCallback, null, true)
    expect(timer.running).toBe(true)
    timer.stop()

  it "can increment the second counter using incrementSeconds", ->
    timer = new Timer(myCallback)
    timer.incrementSeconds()
    expect(timer.secondCounter).toBe(1)

  it "can increment the second counter using incrementSeconds", ->
    timer = new Timer(myCallback)
    timer.incrementSeconds()
    expect(timer.secondCounter).toBe(1)

  it "can check to see if the current second are equal to a number", ->
    timer = new Timer(myCallback)
    expect(timer.isSecondsEqualTo(0)).toBe(true)
    expect(timer.isSecondsEqualTo(1)).toBe(false)
    timer.incrementSeconds()
    timer.incrementSeconds()
    timer.incrementSeconds()
    timer.incrementSeconds()
    expect(timer.isSecondsEqualTo(4)).toBe(true)
