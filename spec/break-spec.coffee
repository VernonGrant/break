Break = require '../lib/break'
packageName = 'break'

describe "Break", ->

  beforeEach ->
    waitsForPromise ->
      atom.packages.activatePackage(packageName)

  # Testing if the package is infact activated loaded
  describe "Is successfully activated, loaded", ->

    it "is activated", ->
      expect(atom.packages.isPackageActive(packageName)).toBe(true)

    it "is loaded", ->
      expect(atom.packages.isPackageLoaded(packageName)).toBe(true)
