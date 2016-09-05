BreakTrigger = require('../lib/break-trigger')


describe "Break Trigger", ->
  Trigger = null

  beforeEach( ->
        Trigger = new BreakTrigger(3, 10, (->console.log('break started')), (->console.log('break ended')), null)
    )

  it "can check to see if it's running", ->
    expect(Trigger.running).toBe(true)

  it "can stop running", ->
    Trigger.stop(false)
    expect(Trigger.running).toBe(false)

  it "can stop running and rest all counters", ->
    Trigger.watch()
    Trigger.watch()
    expect(Trigger.counter).toBe(2)
    Trigger.watch()
    Trigger.stop(true)
    expect(Trigger.running).toBe(false)
    expect(Trigger.counter).toBe(0)

  it "can start running after stopping", ->
    Trigger.stop(true)
    expect(Trigger.running).toBe(false)
    Trigger.start()
    Trigger.watch()
    expect(Trigger.running).toBe(true)

  it "has a second counter that gets incremented on each watch, it's called counter", ->
    Trigger.watch()
    Trigger.watch()
    Trigger.watch()
    expect(Trigger.counter).toBe(3)

  it "can have a delay before starting the break", ->
    expect(Trigger.onBreak).toBe(false)
    Trigger.watch()
    Trigger.watch()
    expect(Trigger.onBreak).toBe(false)
    Trigger.watch()
    expect(Trigger.onBreak).toBe(true)

  it "can have no delay before going on break", ->
    Trigger = new BreakTrigger(0, 4, (-> console.log('break started')), (-> console.log('break ended')), null)
    expect(Trigger.onBreak).toBe(true)
    Trigger.watch()
    Trigger.watch()
    Trigger.watch()
    expect(Trigger._breakDurationCounter).toBe(3)

  it "stops automatically after the break has been completed", ->
    Trigger = new BreakTrigger(1, 3, (-> console.log('break started')), (-> console.log('break ended')), null)
    expect(Trigger.onBreak).toBe(false)
    Trigger.watch()
    expect(Trigger.onBreak).toBe(true)
    expect(Trigger.running).toBe(true)
    Trigger.watch()
    Trigger.watch()
    Trigger.watch()
    expect(Trigger.running).toBe(false)
    expect(Trigger.onBreak).toBe(false)

  it "calls a callback when break starts", ->
    number = 1
    breakStartsCallback = ->
      number = 5
    Trigger = new BreakTrigger(1, 3, breakStartsCallback, (-> console.log('break ended')), null)
    Trigger.watch()
    expect(number).toBe(5)

  it "calls a callback when break ends", ->
    number = 1
    breakEndsCallback = ->
      number = 5
    Trigger = new BreakTrigger(1, 3, (-> console.log('break ended')), breakEndsCallback, null)
    Trigger.watch()
    expect(number).toBe(1)
    Trigger.watch()
    Trigger.watch()
    Trigger.watch()
    expect(number).toBe(5)

  it "can pass a object or value to both callbacks", ->
    valueExample = 'Hello World'
    breakEndsCallback = (value) ->
      value
    breakStartsCallback = (value) ->
      value
    Trigger = new BreakTrigger(1, 3, breakStartsCallback, breakEndsCallback, valueExample)
    expect(Trigger.callbackStarted(Trigger.object)).toBe('Hello World')
    expect(Trigger.callbackEnded(Trigger.object)).toBe('Hello World')
