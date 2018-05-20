const fs = require("fs"),
  path = require("path"),
  showdown = require("showdown"),
  converter = new showdown.Converter();

exports.convert = filePath => {
  if (path.extname(filePath) != ".md") throw new Error("This program only accepts markdown files");

  let markDown = fs.readFileSync(filePath, { encoding: "utf8" });
  let html = converter.makeHtml(markDown);

  let fileName = path.basename(filePath, ".md");
  fs.writeFileSync("./html/" + fileName + ".html", html);

  console.log(fileName + ".html written successfully");
};
