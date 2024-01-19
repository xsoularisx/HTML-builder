/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

const pathDir = path.join('./03-files-in-folder/secret-folder');

fs.readdir(pathDir, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile()) {
      const pathFile = path.join('./03-files-in-folder/secret-folder', file.name);
      fs.stat(pathFile, (err, stats) => {
        const fileName = path.parse(pathFile).name;
        const fileType = path.extname(pathFile).slice(1);
        const fileSize = stats.size / 1000;
        console.log(`${fileName} - ${fileType} - ${fileSize}kb`);
      });
    };
  });
});