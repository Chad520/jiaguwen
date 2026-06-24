const QRCode = require('qrcode');
const fs = require('fs');

const url = 'https://chad520.github.io/jiaguwen/';

QRCode.toFile('qr_code.png', url, {
  width: 600,
  margin: 2,
  color: { dark: '#2c1810', light: '#ffffff' }
}, (err) => {
  if (err) { console.error('Error:', err); process.exit(1); }
  console.log('QR code generated: qr_code.png');
  console.log('URL:', url);
});
