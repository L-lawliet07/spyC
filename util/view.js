//////////////////////////////////////////////////////////////
// @AUTHOR: Mandeep Bisht
//////////////////////////////////////////////////////////////

"use strict";

/*
 * require statement
 */

const chalk = require("chalk");

const figlet = require("figlet");

/*
 * Utility function used for indentation
 */

function indent_util(content) {
  const max_width = Math.max(13, content.length);
  let space = "";
  for (let i = 0; i < max_width - content.length; ++i) {
    space += " ";
  }
  return content + space + ": ";
}

/*
 * Main Banner
 */

function heading(msg, options = undefined) {
  console.log(chalk.bold.white(" ^   ^    ______________"));
  console.log(chalk.bold.white(figlet.textSync(msg, options)));
  // console.log(chalk.bold.green("_______________________"));
}

/*
 * Print object contains printing utilities it is just a wrapper over chalk
 */

const print = {
  success: (type = "", msg = "") => {
    if (type !== "") type = indent_util(type);
    console.log(`${chalk.green.bold(type)}${chalk.green(msg)}`);
  },

  error: (type = "", msg = "") => {
    if (type !== "") type = indent_util(type);
    console.log(`${chalk.red.bold(type)}${chalk.red(msg)}`);
  },

  warn: (type = "", msg = "") => {
    if (type !== "") type = indent_util(type);
    console.log(`${chalk.yellow.bold(type)}${chalk.yellow(msg)}`);
  },

  info: (type = "", msg = "") => {
    if (type !== "") type = indent_util(type);
    console.log(`${chalk.blue.bold(type)}${chalk.blue(msg)}`);
  }
};

/*
 * to clear to console
 */

function clear() {
  console.clear();
}

/*
 * Export statement
 */

module.exports = {
  heading,
  print,
  clear
};
