const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const targetDirs = ['.vercel/output/functions', '.vercel/output/static/_worker.js'];

targetDirs.forEach(dir => {
  walkDir(dir, function(filePath) {
    if (filePath.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let newContent = content
        .replace(/require\("async_hooks"\)/g, 'require("node:async_hooks")')
        .replace(/from"async_hooks"/g, 'from"node:async_hooks"');
      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Patched ${filePath}`);
      }
    }
  });
});
