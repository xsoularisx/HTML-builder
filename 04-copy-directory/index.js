/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

const mainFiles = path.join('./04-copy-directory/files');
const copyFiles = path.join('./04-copy-directory/files-copy');

fs.mkdir(copyFiles, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
    return;
  };
});

fs.readdir(mainFiles, (err, files) => {
  if (err) {
    console.error(err);
    return;
  };

  files.forEach(el => {
    fs.copyFile(`${mainFiles}/${el}`, `${copyFiles}/${el}`, err => {
      if (err) throw err;
    });
  });
});