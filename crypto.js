const crypto = require('crypto')

crypto.generateKeyPair('rsa', {
  modulusLength: 530, publicKeyEncoding: { type: 'pkcs1', format: 'pem' }, privateKeyEncoding: {
    type:
      'pkcs8', format: 'pem', cipher: 'aes-192-cbc', passphrase: 'Welcome'
  }
}, (err, publicKey, privateKey) => { console.log(`private key ${privateKey}, publicKey: ${publicKey}`) })
