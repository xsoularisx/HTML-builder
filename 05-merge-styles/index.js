/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

const styleFiles = path.join('./05-merge-styles/styles');
const bundleFile = path.join('./05-merge-styles/project-dist/bundle.css');

const writeableStream = fs.createWriteStream(bundleFile, 'utf-8');

fs.readdir(styleFiles, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile()) {
      const pathFile = path.join('../05-merge-styles/styles', file.name);
      const fileType = path.extname(pathFile).slice(1);
      if (fileType === 'css') {
        const fileName = path.join(styleFiles, file.name);
        const readableStream = fs.createReadStream(fileName, 'utf-8');
        readableStream.on('data', (chunk) => writeableStream.write(`${chunk}\n`));
      };
    };
  });
});