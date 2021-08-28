var fs = require('fs');

function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });

    console.log(`Deleting directory "${path}"...`);
    fs.rmdirSync(path);
  }
};

console.log("Cleaning working tree...");

deleteFolderRecursive("./build");
deleteFolderRecursive("./code-coverage");
deleteFolderRecursive("./dist");
deleteFolderRecursive("./html-report");
deleteFolderRecursive("./coverage");

console.log('\x1b[33m%s\x1b[0m', "Successfully cleaned working tree!");
