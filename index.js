#!/usr/bin/env node
var log = console.log.bind(console);
var bigInt = require('big-integer');

// http://stackoverflow.com/questions/29418957/is-it-possible-to-get-a-natural-log-of-a-big-integer-instance/29420801#29420801
var logForBigInts = function(bigInt){
	var string = bigInt.toString();
	return string.length * Math.log(10) + Math.log(parseFloat('0.' + string));
}

var getRSAStrength = function(modulus){
	// Without logForBigInts, this value would be infinite, rather than 1419 for 2048 bits
	var naturalLog = logForBigInts( bigInt(2).pow(modulus) )
	return Math.floor(Math.log2( Math.exp( Math.cbrt( (64/9) * naturalLog) * Math.pow( Math.log( naturalLog ), 2/3) ) ))
}

// Thanks @durumcrustulum on twitter
var getECCStrength = function(pSize){
	return Math.log2(0.88 * Math.pow(Math.pow(2, pSize), 0.5))
}

module.exports = {
	rsa: getRSAStrength,
	ecc: getECCStrength
}

