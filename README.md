# SSL RSA Strength

Asymmetric ciphers like RSA are evaluated by National Institute of Standards and Technology by [converting them to equivalent symmetric cipher](http://csrc.nist.gov/publications/nistpubs/800-57/sp800-57_part1_rev3_general.pdf) values.

This module implements the technique used by NIST (a General Number Field Sieve), allowing you to compare the relative strength of different RSA modulus sizes (RSA 1024, 2048, 4096, etc) as if they were symmetric ciphers.

In short: **if you're interested in comparing the relative strengths of RSA key sizes, this module is for you**.

Please also note that strength is only a small portion of choosing a key size: there are [considerable drawbacks in using a 4096 bit key](https://certsimple.com/blog/measuring-ssl-rsa-keys), including slower handshakes affecting the time taken for browsers to connect, as well as increased CPU usage on both the server and the browser.

This module now also includes **ECC cipher strength**.

See 'Interpreting the results' below for further information.

## Usage

Just install:

	  npm install ssl-rsa-strength

Then:

	  var getStrength = require('ssl-rsa-strength');

	  getStrength.rsa(modulus);
	  getStrength.ecc(pSize);

Modulus is, for RSA, what is commonly referred to as key size, eg, 2048, 4096 etc.

pSize is, for ECC, what is commonly referred to as key size, eg, 256, 512 etc.

### OpenSSL default key size (non-EV)

	  getStrength.rsa(512);

### LibreSSL default key size (non-EV)

	  getStrength.rsa(1024);

### Minimum for a EV SSL certificate per cabforum guidelines

	  getStrength.rsa(2048);

## Interpreting the results

Results should be read as if comparing a symmetric cipher, eg, a strength of 116 bits means you theoretically have 2^116 possibilities to bruteforce.

Why theoretically? **The GNFS is a heuristic: it's a tool to help you measure the relative strengths of different RSA key sizes but it is not exact**. See [The number field sieve by Arjen K. Lenstra](http://www.iai.uni-bonn.de/~adrian/nfs/lenstra90number.pdf) page 5,section 3 for further discussion.

Implementation details, future vulnerabilities in RSA, and other factors can affect the strength of an RSA key. The attack that breaks RSA 2048 could also break RSA 4096.

In addition: the original NIST cypher rounded down to commonly used symmetric key sizes to allow comparison with existing common symmetric cipher values - so you could say 'RSA 1024 is equivalent to AES 80', whereas this module gives the raw results.

## Unit tests

		npm test

The values are checked against the Mathematica implementation from Crypto StackExchange mentioned below.

## Recommended Reading

The original [National Institute of Standards and Technology Special Publication 800-57 Recommendation for Key Management](http://csrc.nist.gov/publications/nistpubs/800-57/sp800-57_part1_rev3_general.pdf)

[The number field sieve by Arjen K. Lenstra](http://www.iai.uni-bonn.de/~adrian/nfs/lenstra90number.pdf)

In particular, these two threads on [Crypto StackExchange](http://crypto.stackexchange.com) have excellent discussion used in researching the development of this module:

 - [Security strength of RSA in relation with the modulus size](http://crypto.stackexchange.com/questions/8687/security-strength-of-rsa-in-relation-with-the-modulus-size/8692?noredirect=1#comment56473_8692)

 - [Why is the complexity of RSA-1024 80 bit and not 86 bit?](http://crypto.stackexchange.com/questions/10076/why-is-the-complexity-of-rsa-1024-80-bit-and-not-86-bit)


