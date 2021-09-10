const crypto = require('crypto');

const message = "Hello!!! My name is Dhairya Dhuvad. I am a trainee software engineer at Zeeve.";
// const key = crypto.randomBytes(32);
const key1 = Buffer.alloc(16, 'myCoolPass#12@&');
const key2 = Buffer.alloc(24, 'myCoolPass#12@&');
const key3 = Buffer.alloc(32, 'myCoolPass#12@&');
const iv = crypto.randomBytes(16);
const u = 'utf-8', h ='hex';
let cipher, decipher;
let encString, decString;
const algos = ['aes128', 'aes192', 'aes256']

//aes128
console.log("Algorithm : aes128");
//encryption
cipher = crypto.createCipheriv('aes128',key1,iv);
encString = cipher.update(message, u, h);
encString += cipher.final(h);
console.log("Encrypted String : " + encString);
//decryption
decipher = crypto.createDecipheriv('aes128',key1,iv)
decString = decipher.update(encString, h, u);
decString += decipher.final(u);
console.log("Decrypted String : " + decString + '\n');

//aes192
console.log("Algorithm : aes192");
//encryption
cipher = crypto.createCipheriv('aes192',key2,iv);
encString = cipher.update(message, u, h);
encString += cipher.final(h);
console.log("Encrypted String : " + encString);
//decryption
decipher = crypto.createDecipheriv('aes192',key2,iv)
decString = decipher.update(encString, h, u);
decString += decipher.final(u);
console.log("Decrypted String : " + decString + '\n');

//aes256
console.log("Algorithm : aes256");
//encryption
cipher = crypto.createCipheriv('aes256',key3,iv);
encString = cipher.update(message, u, h);
encString += cipher.final(h);
console.log("Encrypted String : " + encString);
//decryption
decipher = crypto.createDecipheriv('aes256',key3,iv)
decString = decipher.update(encString, h, u);
decString += decipher.final(u);
console.log("Decrypted String : " + decString + '\n');