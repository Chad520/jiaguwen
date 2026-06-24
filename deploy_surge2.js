const { spawn } = require('child_process');
const path = require('path');

const surgePath = path.join(__dirname, 'node_modules', '.bin', 'surge');

const child = spawn(surgePath, ['.', 'jiaguwen-oracle.surge.sh'], {
  cwd: __dirname,
  stdio: ['pipe', 'pipe', 'pipe']
});

child.stdout.on('data', (data) => {
  const text = data.toString();
  console.log('stdout:', text);

  if (text.includes('email:')) {
    child.stdin.write('jiaguwen2026@tmail.com\n');
    console.log('> sent email');
  }
  if (text.includes('password:')) {
    child.stdin.write('jiaguwen2026!\n');
    console.log('> sent password');
  }
});

child.stderr.on('data', (data) => {
  console.log('stderr:', data.toString());
});

child.on('close', (code) => {
  console.log('Exited with code:', code);
});

setTimeout(() => { child.kill(); process.exit(1); }, 30000);
