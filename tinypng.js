#!/usr/bin/env node

var fs = require('fs');
var net = require('net');
var tinify = require("tinify");
var path = require("path");

var RED = '\x1b[31m%s\x1b[0m';

var fileList = fs.readdirSync('./');
var argvMap = {};

process.argv.slice(2).reduce(function(sum, next, index, arr) {
  if (next[0] === '-') {
    sum[next] = arr[index + 1];
  }
  return sum;
}, argvMap);

var targetPath = argvMap['-p'] || './';
var rewrite = argvMap['-r'] || 'false';
var key = argvMap['-k'] || 'shnW0WhWVGYYkbbrtlZ79DnZLHEE4Jd7';
var dirName = argvMap['-d'] || '.';

if (!key) {
  console.error(RED, 'Error: input your tinypng Develop API');
  process.exit(1);
}

tinify.key = key;

fileList.forEach(function(filename) {
  var extname = path.extname(filename);
  if (['.png', '.jpg'].indexOf(extname) < 0) {
    return;
  }
  var source = tinify.fromFile(filename);
  var basename = path.basename(filename, extname);

  if(!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }
  source.toFile(`${dirName}/${filename}`);
});
