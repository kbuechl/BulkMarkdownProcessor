const fs = require("fs"),
  path = require("path"),
  mdProcessor = require("./mdProcessor");

let directoryToSearch = process.argv[2];

if (!directoryToSearch) throw new Error("No directory provided in args");

fs.readdir(directoryToSearch, (err, files) => {
  files.forEach(file => {
    if (path.extname(file) == ".md") {
      mdProcessor.convert(directoryToSearch + "\\" + file);
    }
  });
});
