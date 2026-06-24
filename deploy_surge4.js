const surgeSDK = require('surge-sdk');
const netrc = require('netrc');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const EMAIL = 'jiaguwen2026@tmail.com';
const PASS = 'jiaguwen2026!';
const ENDPOINT = 'https://surge.surge.sh';
const HOST = 'surge.surge.sh';
const DOMAIN = 'jiaguwen-oracle.surge.sh';

const sdk = surgeSDK({ endpoint: ENDPOINT });

// Step 1: Get token from surge API
console.log('Step 1: Getting auth token...');
sdk.token({ user: EMAIL, pass: PASS }, function(err, creds) {
  if (err) {
    console.error('Auth response:', JSON.stringify(err));

    // If account doesn't exist, try to figure out what happened
    if (err.status === 401) {
      console.log('Invalid credentials. Surge might auto-create accounts on first deploy.');
    }

    // Even if auth fails, let's try the deploy anyway - surge CLI auto-creates accounts
    console.log('Trying deploy anyway (surge auto-creates accounts)...');
    doDeploy();
    return;
  }

  console.log('Got token successfully');

  // Step 2: Save credentials to .netrc
  const home = process.env.USERPROFILE || process.env.HOME;
  const netrcFile = path.join(home, '.netrc');

  let netrcData = {};
  try {
    netrcData = netrc(netrcFile);
  } catch(e) {}

  netrcData[HOST] = {
    login: EMAIL,
    password: creds.pass
  };

  fs.writeFileSync(netrcFile, netrc.format(netrcData) + os.EOL);
  console.log('Step 2: Credentials saved');

  doDeploy();
});

function doDeploy() {
  console.log('Step 3: Deploying to ' + DOMAIN + '...');

  // Use the surge CLI programmatically
  const surge = require('surge');

  surge({
    project: __dirname,
    domain: DOMAIN
  }).then(function() {
    console.log('\nDeployed successfully!');
    console.log('URL: https://' + DOMAIN);
    process.exit(0);
  }).catch(function(err) {
    console.error('Deploy error:', err.message || err);
    process.exit(1);
  });
}
