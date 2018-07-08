const fs = require("fs"),
  path = require("path"),
  showdown = require("showdown"),
  converter = new showdown.Converter();

exports.convert = (p, file) => {
  let filePath = path.join(p, file);
  if (path.extname(filePath) != ".md") throw new Error("This program only accepts markdown files");

  let markDown = fs.readFileSync(filePath, { encoding: "utf8" });
  let html = cleanHtmlForJson(converter.makeHtml(markDown));

  let fileName = path.basename(filePath, ".md");
  let htmlFileLocation = path.join(p, "html");

if (!fs.existsSync(htmlFileLocation)){
    fs.mkdirSync(htmlFileLocation);
}
  fs.writeFileSync(path.join(htmlFileLocation, fileName + ".html"), html);

  console.log(fileName + ".html written successfully");
};



const cleanHtmlForJson =(html) => {
  //get rid of h1 headers
  //get ids out of the way
  var idsRegex = new RegExp(/id="[a-zA-Z0-9]*"/g);
  html= html.replace(idsRegex, '');
  //fix images tags
  var imgTags = new RegExp(/(src=)"(https?:\/\/[www\.]?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))"/g);
  html = html.replace(imgTags, '$1\'$2\'')
//remove alt tags
  var altTag = new RegExp(/alt="IMG GOES HERE"/g);
  html= html.replace(altTag, '');

  //anchors
  var anchorTag = new RegExp(/(href=)"([/a-zA-Z0-9]*)"/g);
  html = html.replace(anchorTag,"$1'$2' target='_blank'");


  //ready for last step?
  html = html.replace(/"/g, "&quot;")

 return html;
}
