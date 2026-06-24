const surge = require('surge');

surge({
  login: 'jiaguwen2026@tmail.com',
  password: 'jiaguwen2026!'
}, function(err, result) {
  if (err) { console.error('Error:', err); process.exit(1); }
  console.log('Result:', result);
});
