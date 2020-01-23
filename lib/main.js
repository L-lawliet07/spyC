////////////////////////////////////////////////////////////
// @AUTHOR: Mandeep Bisht
////////////////////////////////////////////////////////////

"use strict";

/*
 * require statement
 */

const fs = require("fs");

const readline = require("readline");

const parse = require("minimist");

const path = require("path");

const { exec } = require("child_process");

const { print } = require("../util/view");

const { watch, unwatch } = require("./watch");

const { execute, stats } = require("./execute");

const { shutdown } = require("../util/shutdown");

/*
 * container stores filename , gcc falgs and input file name
 */

const container = {
  file_name: "",
  gcc_flag: [],
  input_file: ""
};

/*
 * option : object to store command line option
 */

const help_option = {
  "-h, --help": "print command line options",
  "-i, --input": "for giving input to the program. (eg. --input=location)",
  "--std": "std - Specify the C++ version or ISO standard version.",
  "--Wall": "Turns on lots of compiler warning flags.)",
  "--Werror": "Turn any warning into a compilation error.",
  "--Wextra": "Enables extra flags not enabled by -Wall",
  "--Wshadow": "Enable warning for Variable Shadowing",
  "--O0": "No optmization.",
  "--O2": "",
  "--O3": "Higher level of optmization.",
  "--fsanitize": "Sanitizer for runtime checks. (eg. --fsanitize=address)",
  "--quick":
    "admins personal setting [g++ -DLOCAL -std=c++17 -Wshadow -Wall -o file file.cpp -fsan  itize=address -fsanitize=undefined -D_GLIBCXX_DEBUG -g]"
};

/*
 * help function used to show help options
 */

function help() {
  const max_width = 20;
  console.log("Usage: spyc <yourfile.cpp> [options]");
  console.log("\nOPTIONS : \n");
  for (let key in help_option) {
    process.stdout.write(key);
    for (let count = 0; count < max_width - key.length; ++count) {
      process.stdout.write(".");
    }
    console.log(help_option[key]);
  }
  shutdown();
}

/*
 * This hash will store all the valid options
 */

const hash = new Set([
  "Wall",
  "Werror",
  "Wextra",
  "Wshadow",
  "O0",
  "O2",
  "O3",
  "i",
  "input",
  "std",
  "quick",
  "fsanitize"
]);

/*
 * file not found check
 */

function ifExists(file) {
  if (!fs.existsSync(file)) {
    print.error("[ERROR]", `File not found ${file}.`);
    shutdown();
  }
}

/*
 * input_hadler used to handle input provided at runtime
 */

function input_handler(line) {
  const cwd = process.cwd();
  //////////////////////////
  //Checking for quit option
  if (line === "quit") {
    unwatch(container.file_name);
    print.warn("[spyC]", "sayonara (0.o)");
    shutdown();
  }
  ///////////////////////////
  //Checking for stats option
  else if (line === "stats") {
    print.info("[INFO]", "STATS");
    print.warn("", ">>>>>");
    stats();
    print.warn("", ">>>>>");
    print.info("[INFO]", "Waiting for changes (0.o)");
  }
  ///////////////////////////
  //Checking for input option
  else if (line.startsWith("--input") || line.startsWith("-i")) {
    const arg = [line];
    const new_input = parse(arg);
    if (typeof (new_input["input"] || new_input["i"]) === "string") {
      const input_file = path.join(cwd, new_input["input"] || new_input["i"]);
      if (fs.existsSync(input_file)) {
        print.info("[INFO]", `Adding input ${input_file}`);
        container["input_file"] = new_input["input"] || new_input["i"];
        const command = createCommand();
        unwatch(command.file_name);
        execute(
          command.compile_command,
          command.exec_command,
          command.file_name
        );
        watch(command.compile_command, command.exec_command, command.file_name);
      }
    }
  }
  /////////////////////////
  //Checking for cat option
  else if (line.startsWith("--cat")) {
    const arg = [line];
    const parse_object = parse(arg);
    if (typeof parse_object["cat"] === "string") {
      const cat_path = path.join(cwd, parse_object["cat"]);
      if (fs.existsSync(cat_path)) {
        exec(`cat ${cat_path}`, (err, stdout, stderr) => {
          if (err || stderr) {
            print.error("[ERROR]", "");
            print.error("", stderr ? stderr : error);
          } else {
            print.warn("", ">>>>>");
            print.success("", stdout);
            print.warn("", ">>>>>");
          }
          print.info("[INFO]", "Waiting for changes (0.o)");
        });
      }
    }
  }
}

/*
 * listener : this module will listen to console input
 */

let listen;

function listener() {
  listen = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  listen.on("line", line => {
    input_handler(line, listen);
  });
}

/*
 * This funtion will create commad for execution
 */

function createCommand() {
  let compile_command = "";
  const cwd = process.cwd();
  const output_file = path.join(cwd, "output");

  //////////////////////////////////////
  //Generating basic compilation command
  if (container.file_name) {
    compile_command = `g++ ${container.file_name} -o ${output_file}`;
  }
  ///////////////////////////
  //Checking for quick option
  if (container.quick) {
    compile_command = `g++ -DLOCAL -std=c++17 -Wshadow -Wall -o ${output_file} ${container.file_name} -fsanitize=address -fsanitize=undefined -D_GLIBCXX_DEBUG -g`;
  }
  /////////////////////////////////
  //Adding gcc flags to the command
  else if (container.gcc_flag) {
    let flag_string = "";
    for (let flag of container.gcc_flag) {
      flag_string = flag_string + " -" + flag;
    }
    compile_command += flag_string;
  }

  let exec_command = output_file;
  /////////////////////////////
  //Adding input file if exists
  if (container.input_file) {
    exec_command = `${exec_command} < ${container.input_file}`;
  }

  const file_name = container.file_name;
  return {
    compile_command,
    exec_command,
    file_name
  };
}

/*
 * Parser Funtion that will parse command line arguments
 */

function parser(args) {
  const parse_object = parse(args);
  const cwd = process.cwd();

  ///////////////////
  //checking for help
  if (parse_object.h || parse_object.help) {
    help();
  }
  //////////////////////////
  //if no argument is passed
  if (args.length === 0) {
    print.error("[ERROR]", "Argument missing type -h, --help for help");
    shutdown();
  }

  const file = path.join(cwd, args[0]);
  /////////////////////////
  //checking if file exists
  ifExists(file);

  container.file_name = file;

  ////////////////////////////////////////
  //Adding input file location to container
  if (parse_object["input"] || parse_object["i"]) {
    const input_file = path.join(
      cwd,
      parse_object["input"] || parse_object["i"]
    );
    ifExists(input_file);
    container.input_file = input_file;
  }

  //////////////////////////
  //check if quick is select
  if (parse_object["quick"]) {
    container.quick = true;
  }

  //////////////////////////////
  //Addding gcc flag to container
  for (let key in parse_object) {
    if (key === "_" || key === "i" || key === "input" || !hash.has(key))
      continue;

    container["gcc_flag"].push(
      `${key}${
      typeof parse_object[key] !== "boolean" ? "=" + parse_object[key] : ""
      }`
    );
  }
}

/*
 * Main funtion : this is the main function
 */

function main(args) {
  /////////////////
  // start Listner
  listener();
  /////////
  // parser
  parser(args);

  return createCommand();
}

/*
 * exports statement
 */

module.exports = {
  main,
  listen
};
