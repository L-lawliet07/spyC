////////////////////////////////////////////////////////////
// @AUTHOR: Mandeep Bisht
////////////////////////////////////////////////////////////

"use strict";

/*
 * require statements
 */

const fs = require("fs");

const { execute } = require("./execute");

/*
 * watch: used to watch file for changes
 */

function watch(compile_command, exec_command, file) {
  //////////////////////////////////////////
  //watchFile will watch targeted file{file}
  fs.watchFile(file, { interval: 500 }, (cur, prev) => {
    execute(compile_command, exec_command, file);
  });
}

/*
 * unwatch: used to unwatch file
 */

function unwatch(file) {
  //////////////////////////
  //To unwatch targeted file
  fs.unwatchFile(file);
}

/*
 * exports statement
 */

module.exports = {
  watch,
  unwatch
};
