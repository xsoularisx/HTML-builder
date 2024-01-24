/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

//replace template tags
const templateFile = path.join('./06-build-page/template.html');
const componentFiles = path.join('./06-build-page/components');
const projectDist = path.join('./06-build-page/project-dist');
const pageFile = path.join('./06-build-page/project-dist/index.html');

fs.mkdir(projectDist, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.stat(pageFile, (err) => {
  if (!err) {
    fs.rm(pageFile, { recursive: true }, (err) => {
      if (err) throw err;
      makePage();
    });
  } else {
    makePage();
  }
});

function makePage() {
  fs.copyFile(templateFile, pageFile, err => {
    if (err) throw err;
  });

  fs.readFile(templateFile, 'utf-8', (err, template) => {
    if (err) throw err;

    fs.readdir(componentFiles, { withFileTypes: true }, (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        const componentPath = path.join(componentFiles, file.name);
        const componentName = path.basename(file.name, '.html');
        const componentTag = `{{${componentName}}}`;

        fs.readFile(componentPath, 'utf-8', (err, component) => {
          if (err) throw err;
          template = template.replaceAll(componentTag, component);

          if (!template.includes(componentTag)) {
            fs.writeFile(pageFile, template, (err) => {
              if (err) throw err;
            });
          };
        });
      });
    });
  });
}

// copy assets files
const assetsFiles = path.join('./06-build-page/assets');
const copyAssetsFiles = path.join('./06-build-page/project-dist/assets');

fs.stat(copyAssetsFiles, (err) => {
  if (!err) {
    fs.rm(copyAssetsFiles, { recursive: true }, (err) => {
      if (err) throw err;
      makeFolder();
    });
  } else {
    makeFolder();
  }
});

function makeFolder() {
  fs.mkdir(copyAssetsFiles, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(assetsFiles, (err, files) => {
    if (err) throw err;
    files.forEach(folder => {
      const mainFiles = path.join(`./06-build-page/assets/${folder}`);
      const copyFiles = path.join(`./06-build-page/project-dist/assets/${folder}`);

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
    });
  });
}

// compile styles
const styleFiles = path.join('./06-build-page/styles');
const bundleFile = path.join('./06-build-page/project-dist/style.css');

const writeableStream = fs.createWriteStream(bundleFile, 'utf-8');

fs.readdir(styleFiles, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile()) {
      const pathFile = path.join('./06-build-page/assets', file.name);
      const fileType = path.extname(pathFile).slice(1);
      if (fileType === 'css') {
        const fileName = path.join(styleFiles, file.name);
        const readableStream = fs.createReadStream(fileName, 'utf-8');
        readableStream.on('data', (chunk) => writeableStream.write(`${chunk}\n`));
      };
    };
  });
});