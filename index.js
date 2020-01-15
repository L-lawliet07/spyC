////////////////////////////////////////////////////////////
// @AUTHOR: Mandeep Bisht
////////////////////////////////////////////////////////////

"use strict";

/*
 * require statement
 */

const parser = require("./lib/main");

const { watch } = require("./lib/watch");

const { heading, clear } = require("./util/view");

const { execute } = require("./lib/execute");

/*
 * start function will call all other function
 */

function start(args) {
  clear();

  heading("O.O [spyC]", {
    font: "Calvin S",
    verticalLayout: "default",
    horizontalLayout: "fitted"
  });

  const parse_result = parser.main(args);
  execute(
    parse_result.compile_command,
    parse_result.exec_command,
    parse_result.file_name
  );

  watch(
    parse_result.compile_command,
    parse_result.exec_command,
    parse_result.file_name
  );
}

/*
 * exports statement
 */

module.exports = {
  start
};
