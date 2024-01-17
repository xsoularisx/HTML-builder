/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

const pathFile = path.join('./01-read-file/text.txt');
const stream = new fs.ReadStream(pathFile);

stream.on('data', (e) => {
  console.log(e.toString());
});
