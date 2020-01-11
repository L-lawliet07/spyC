////////////////////////////////////////////////////////////
// @AUTHOR: Mandeep Bisht
////////////////////////////////////////////////////////////

"use strict";

/*
 * require statement
 */

const parser = require("./lib/addition");

const { watch } = require("./lib/watch");

const { heading, clear } = require("./util/view");

const { execute } = require("./lib/execute");

module.exports = {
  start: args => {
    clear();

    heading("O.O", {
      font: "Bloody",
      verticalLayout: "default",
      horizontalLayout: "fitted"
    });

    const parse_result = parser.main(args);
    // console.log("DEBUG : ", compile_command);
    // console.log("DEBUG : ", exec_command);
    // console.log("DEBUG : ", file_name);
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
};
