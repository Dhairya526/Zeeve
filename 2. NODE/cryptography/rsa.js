const crypto = require('crypto');

const message = "Hello!!! My name is Dhairya Dhuvad. I am a trainee software engineer at Zeeve.";

//Key generation
const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
    modulusLength:4096
});

//Encryption
const encString = crypto.publicEncrypt(
    {
        key: publicKey, 
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, 
        oaepHash:'sha256'
    },
    Buffer.from(message)
);
console.log("Encrypted String: " + encString.toString('base64'));

//Decryption
const decString = crypto.privateDecrypt(
    {
        key: privateKey, 
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, 
        oaepHash: 'sha256'
    },
    encString
);
console.log("Decrypted String: " + decString.toString());