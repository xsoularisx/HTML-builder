/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

const mainFiles = path.join('./04-copy-directory/files');
const copyFiles = path.join('./04-copy-directory/files-copy');

fs.stat(copyFiles, (err) => {
  if (!err) {
    fs.rm(copyFiles, { recursive: true }, (err) => {
      if (err) throw err;
      makeFolder();
    });
  } else {
    makeFolder();
  }
});

function makeFolder() {
  fs.mkdir(copyFiles, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(mainFiles, (err, files) => {
    if (err) throw err;

    files.forEach(el => {
      fs.copyFile(`${mainFiles}/${el}`, `${copyFiles}/${el}`, err => {
        if (err) throw err;
      });
    });
  });
}
