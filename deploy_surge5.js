const surgeSDK = require('surge-sdk');
const netrc = require('netrc');
const os = require('os');
const fs = require('fs');
const path = require('path');

const EMAIL = 'jiaguwen2026@tmail.com';
const PASS = 'jiaguwen2026!';
const ENDPOINT = 'https://surge.surge.sh';
const HOST = 'surge.surge.sh';
const DOMAIN = 'jiaguwen-oracle.surge.sh';

const sdk = surgeSDK({ endpoint: ENDPOINT });

console.log('Getting auth token...');
sdk.token({ user: EMAIL, pass: PASS }, function(err, creds) {
  if (err && err.status) {
    console.error('Auth failed with status:', err.status);
    process.exit(1);
  }

  if (creds && creds.pass) {
    console.log('Token obtained');
    const home = process.env.USERPROFILE || process.env.HOME;
    const netrcFile = path.join(home, '.netrc');
    let netrcData = {};
    try { netrcData = netrc(netrcFile); } catch(e) {}
    netrcData[HOST] = { login: EMAIL, password: creds.pass };
    fs.writeFileSync(netrcFile, netrc.format(netrcData) + os.EOL);
  }

  console.log('Deploying to ' + DOMAIN + '...');

  // Call surge with args array (mimics CLI: surge . jiaguwen-oracle.surge.sh)
  const surge = require('surge');
  surge([__dirname, DOMAIN]);
});
