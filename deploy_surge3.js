const surgeSDK = require('surge-sdk');
const surge = require('surge');
const path = require('path');

const EMAIL = 'jiaguwen2026@tmail.com';
const PASS = 'jiaguwen2026!';
const ENDPOINT = 'https://surge.surge.sh';
const DOMAIN = 'jiaguwen-oracle.surge.sh';

const sdk = surgeSDK({ endpoint: ENDPOINT });

// Step 1: Get token
console.log('Authenticating...');
sdk.token({ user: EMAIL, pass: PASS }, function(err, creds) {
  if (err) {
    console.error('Auth error:', JSON.stringify(err));
    process.exit(1);
  }
  console.log('Got token:', creds.pass ? creds.pass.substring(0, 10) + '...' : 'none');

  // Step 2: Deploy
  console.log('Deploying to ' + DOMAIN + '...');
  surge({
    project: __dirname,
    domain: DOMAIN,
    endpoint: ENDPOINT
  }).then(function() {
    console.log('Deployed! https://' + DOMAIN);
  }).catch(function(e) {
    console.error('Deploy error:', e);
  });
});
