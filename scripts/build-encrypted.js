// Render the guide to a single HTML, then staticrypt-encrypt it into
// public/index.html. Password comes from STATICRYPT_PASSWORD (never committed).
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const tmpSrc = path.join(ROOT, '.staticrypt-src.html');
const outDir = path.join(ROOT, '.staticrypt-out');

if (!process.env.STATICRYPT_PASSWORD) {
  console.error('ERROR: set STATICRYPT_PASSWORD, e.g.  STATICRYPT_PASSWORD=... npm run build:secure');
  process.exit(1);
}

const run = (cmd, args) =>
  execFileSync(cmd, args, { stdio: 'inherit', cwd: ROOT, env: process.env });

// 1. render the self-contained HTML
run('node', [path.join(__dirname, 'render.js'), tmpSrc]);

// 2. encrypt it (password read from env by staticrypt)
run('npx', [
  'staticrypt', tmpSrc,
  '--short', '--remember', '30',
  '-d', outDir,
  '--template-title', 'ECLAT.Retrieve — Documentation',
  '--template-instructions', 'Enter the team password to view the ECLAT.Retrieve documentation. Proprietary & Confidential.',
  '--template-button', 'Unlock',
]);

// 3. place as the published page
fs.mkdirSync(path.join(ROOT, 'public'), { recursive: true });
fs.copyFileSync(path.join(outDir, path.basename(tmpSrc)), path.join(ROOT, 'public', 'index.html'));

// 4. clean up temp artifacts
fs.rmSync(tmpSrc, { force: true });
fs.rmSync(outDir, { recursive: true, force: true });

console.log('OK -> public/index.html (encrypted)');
