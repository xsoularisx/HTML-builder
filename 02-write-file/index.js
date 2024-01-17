/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');

const pathFile = path.join('./02-write-file/text.txt');
const textFile = fs.createWriteStream(pathFile, 'utf-8');

stdout.write('введите текст\n');

stdin.on('data', function (data) {
  if (data.toString().trim() === 'exit') {
    stdout.write('текст записан в файл text.txt');
    process.exit();
  }
  textFile.write(data);
});

process.on('SIGINT', function () {
  stdout.write('текст записан в файл text.txt');
  process.exit();
});