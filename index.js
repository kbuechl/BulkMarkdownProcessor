const fs = require('fs'),
  path = require("path"),
  mdProcessor = require("./mdProcessor");

  const  { lstatSync, readdirSync } = require('fs');

  const processDir = (currentLocation) =>{
    //process files in current folder
    processFilesInDir(currentLocation);
    // get other directies
   const directories = getDirectories(currentLocation);
    //recursion if there are directories left
   
    if(directories){
      directories.forEach(d=> processDir(d));
    }
   
  };
  
  const processFilesInDir = (dirToProcess) =>{
    fs.readdir(dirToProcess, (err, files) => {
      files.forEach(file => {
        if (path.extname(file) == ".md") {
          mdProcessor.convert(dirToProcess, file);
        }
      });
    });
  };
  
const getDirectories = source => readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);
const isDirectory = source => lstatSync(source).isDirectory();

let directoryToSearch = process.argv[2];

if (!directoryToSearch) throw new Error("No directory provided in args");

console.log("started")
processDir(directoryToSearch);
console.log("Done")
