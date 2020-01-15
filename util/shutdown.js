////////////////////////////////////////////////////////////
// @AUTHOR: Mandeep Bisht
////////////////////////////////////////////////////////////

"use strict";

/*
 * require statement
 */

const { unwatch, filename } = require("./../lib/watch");

const { listen } = require("./../lib/main");

/*
 * shutdown funtion will terminate the program
 */
function shutdown() {
  if (filename) unwatch();
  if (listen) listen.close();
  process.exit(0);
}

/*
 * exports statement
 */

module.exports = {
  shutdown
};
