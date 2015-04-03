# SSL RSA Strength

Asymmetric ciphers like RSA are evaluated by National Institute of Standards and Technology by [converting them to equivalent symmetric cipher](http://csrc.nist.gov/publications/nistpubs/800-57/sp800-57_part1_rev3_general.pdf) values. 

This module implements the General Number Field Sieve used by NIST, allowing you to compare the relative strength of different RSA modulus sizes (RSA 1024, 2048, 4096, etc) as if they were symmetric ciphers.

In short: if you're interested in just how much additional strength using a 4096 or larger key will get you, this module is for you.

## Drawbacks to using larger key sizes

There are also drawbacks in using a 4096 bit key, including slower handshakes affecting the time taken for browsers to connect, as well as increased CPU usage on both the server and the browser. See the CertSimple article for discussion on these topics.

## Usage

    npm -i ssl-rsa-strength

    var getRSAStrength = require('ssl-rsa-strength');

## OpenSSL default key size (non-EV)

    getRSAStrength(512);

## LibreSSL default key size (non-EV)

    getRSAStrength(1024);

## Minimum for a EV SSL certificate per cabforum guidelines

    getRSAStrength(2048);

## Interpreting the results

The GNFS is a heuristic: it's a tool to help you measure the relative strengths of different RSA key sizes but it is not exact. Implementation details, future vulnerabilities in RSA, and other factors can affect the strength of an RSA key.

In addition: the original NIST cypher rounded down to commonly used symmetric key sizes to allow comparison with existing common symmetric cipher values - so you could say 'RSA 1024 is equivalent to AES 80', whereas this module gives the raw results.

## Recommended Reading

The original [National Institute of Standards and Technology paper](http://csrc.nist.gov/publications/nistpubs/800-57/sp800-57_part1_rev3_general.pdf)

In particular, these two threads on [Crypto StackExchange](http://crypto.stackexchange.com) have an excellent discussion.

[Security strength of RSA in relation with the modulus size](http://crypto.stackexchange.com/questions/8687/security-strength-of-rsa-in-relation-with-the-modulus-size/8692?noredirect=1#comment56473_8692)

[Why is the complexity of RSA-1024 80 bit and not 86 bit?](http://crypto.stackexchange.com/questions/10076/why-is-the-complexity-of-rsa-1024-80-bit-and-not-86-bit)

