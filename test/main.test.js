const assert = chai.assert

describe('core_defense', function () {

  // Clears
  // setup()
  // let clr = document.getElementById('clear')
  beforeEach(function () {
    // clr.dispatchEvent(new Event('click', {bubbles: true}))
    // setup()
  })

  afterEach(function () {
    // clr.dispatchEvent(new Event('click', {bubbles: true}))
  })

  describe('Variable initiation', function(){
    it('score to equal 0', function(){
      // setup()
      // createWalls()
      assert.equal(score, 0)
    })
  })

  describe('create walls', function(){
    it('expects 4 walls to be created', function(){
      // setup()
      // createWalls()
      assert.equal(walls.length, 4)
    })
  })

})
