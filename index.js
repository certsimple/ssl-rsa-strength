#!/usr/bin/env node
var log = console.log.bind(console);
var bigInt = require('big-integer');

// http://stackoverflow.com/questions/29418957/is-it-possible-to-get-a-natural-log-of-a-big-integer-instance/29420801#29420801
var logForBigInts = function(bigInt){
	var string = bigInt.toString();
	return string.length * Math.log(10) + Math.log(parseFloat('0.' + string));
}

module.exports = function(bits){
	// Without logForBigInts, this value would be infinite, rather than 1419 for 2048 bits
	var naturalLog = logForBigInts( bigInt(2).pow(bits) )
	return Math.floor(Math.log2( Math.exp( Math.cbrt( (64/9) * naturalLog) * Math.pow( Math.log( naturalLog ), 2/3) ) ))
}
