// Tests. Mocha TDD/assert style. See
// http://visionmedia.github.com/mocha/
// http://nodejs.org/docs/latest/api/assert.html

var assert = require('assert')
var getRSAStrength = require('../index.js')

var log = console.log.bind(console)

suite('RSA strength', function(){
	// Values checked against Mathematica implementation
	test('is calculated correctly', function(){
		assert.equal(getRSAStrength(512), 63)
		assert.equal(getRSAStrength(1024), 86)
		assert.equal(getRSAStrength(2048), 116)
		assert.equal(getRSAStrength(4096), 156)
		assert.equal(getRSAStrength(8192), 208)
	})
})


