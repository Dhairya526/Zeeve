const crypto = require('crypto');

const message = "Hello!!! My name is Dhairya Dhuvad. I am a trainee software engineer at Zeeve.";

let hash, digest;

//sha256
hash= crypto.createHash('sha256');
digest= hash.update(message).digest('hex');
console.log("SHA 256 Digest :" + digest);

//sha512
hash= crypto.createHash('sha512');
digest= hash.update(message).digest('hex');
console.log("SHA 512 Digest :" + digest);

//md4
hash= crypto.createHash('md4');
digest= hash.update(message).digest('hex');
console.log("MD4 Digest :" + digest);

//md5
hash= crypto.createHash('md5');
digest= hash.update(message).digest('hex');
console.log("MD5 Digest :" + digest);