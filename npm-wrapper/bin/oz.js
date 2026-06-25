#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn, execSync } = require('child_process');
const https = require('https');

const VERSION = require('../package.json').version;
const REPO = "codecollab-co/oz";

const homeDir = os.homedir();
const ozDir = path.join(homeDir, '.oz');
const binDir = path.join(ozDir, 'bin', VERSION);

const platform = os.platform();
const arch = os.arch();

let binaryName = '';
let artifactName = '';

if (platform === 'darwin') {
  binaryName = 'Oz.app/Contents/MacOS/oz';
  artifactName = arch === 'arm64' ? 'Oz_aarch64.app.tar.gz' : 'Oz_x64.app.tar.gz';
} else if (platform === 'linux') {
  binaryName = 'oz';
  artifactName = 'oz_linux_x64.zip';
} else if (platform === 'win32') {
  binaryName = 'oz.exe';
  artifactName = 'oz_windows_x64.zip';
} else {
  console.error(`Unsupported platform: ${platform}`);
  process.exit(1);
}

const binaryPath = path.join(binDir, binaryName);

if (fs.existsSync(binaryPath)) {
  runBinary();
} else {
  downloadAndExtract();
}

function runBinary() {
  const args = process.argv.slice(2);
  const child = spawn(binaryPath, args, { stdio: 'inherit' });
  child.on('close', (code) => {
    process.exit(code);
  });
}

function downloadAndExtract() {
  console.log(`Oz is not downloaded yet. Downloading version v${VERSION} for ${platform}-${arch}...`);
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }

  const url = `https://github.com/${REPO}/releases/download/v${VERSION}/${artifactName}`;
  const archivePath = path.join(binDir, artifactName);
  const file = fs.createWriteStream(archivePath);

  function get(url) {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        get(response.headers.location);
        return;
      }
      if (response.statusCode !== 200) {
        console.error(`Failed to download binary: HTTP ${response.statusCode}`);
        process.exit(1);
      }

      const totalSize = parseInt(response.headers['content-length'], 10) || 0;
      let downloaded = 0;

      response.on('data', (chunk) => {
        downloaded += chunk.length;
        if (totalSize > 0) {
          const percent = ((downloaded / totalSize) * 100).toFixed(1);
          process.stdout.write(`\rDownloading: ${percent}%`);
        } else {
          process.stdout.write(`\rDownloading: ${(downloaded / 1024 / 1024).toFixed(2)} MB`);
        }
      });

      response.pipe(file);

      file.on('finish', () => {
        file.close(() => {
          console.log('\nDownload complete. Extracting files...');
          try {
            if (platform === 'darwin') {
              execSync(`tar -xzf "${archivePath}" -C "${binDir}"`);
            } else if (platform === 'linux') {
              execSync(`unzip -o "${archivePath}" -d "${binDir}"`);
            } else if (platform === 'win32') {
              execSync(`powershell -Command "Expand-Archive -Path '${archivePath}' -DestinationPath '${binDir}' -Force"`);
            }
            fs.unlinkSync(archivePath);
            
            if (platform !== 'win32') {
              fs.chmodSync(binaryPath, 0o755);
            }
            console.log('Extraction complete. Launching Oz...');
            runBinary();
          } catch (err) {
            console.error('Failed to extract files:', err.message);
            process.exit(1);
          }
        });
      });
    }).on('error', (err) => {
      try { fs.unlinkSync(archivePath); } catch {}
      console.error('Download error:', err.message);
      process.exit(1);
    });
  }

  get(url);
}
