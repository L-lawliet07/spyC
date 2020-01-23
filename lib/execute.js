////////////////////////////////////////////////////////////
// @AUTHOR: Mandeep Bisht
////////////////////////////////////////////////////////////

"use strict";

/*
 * require statement
 */

const { exec } = require("child_process");

const { print } = require("./../util/view");

const execution_stats = [];

/*
 * funtion used to show the stats
 */
function stats() {
  for (let obj of execution_stats) {
    print.error("", "->->->->->->->->->->->->->->->->->->->->->->->->->->->->");
    print.success(`${obj[0]}`);
    print.warn(`[Compilation Time]`, `${obj[1]}ms`);
    print.warn(`[Execution Time]`, `${obj[2]}ms`);
    print.error("", "->->->->->->->->->->->->->->->->->->->->->->->->->->->->");
  }
}

/*
 * execute function used to  compile  c++ code and execute them
 */

function execute(compile_command, exec_command, file) {
  print.info("[Executing]", compile_command);
  const compile_start = process.hrtime();

  ///////////////////
  // Compile c++ code
  exec(compile_command, (error, stdout, stderr) => {
    const compile_time = process.hrtime(compile_start)[1] / 1000000;

    ///////////////////////////////////////////
    // Checking for errors in compilation phase
    if (error || stderr) {
      print.error("[COMPILATION ERROR]", "");

      print.error("", stderr ? stderr : error);
    }

    /////////////////////////////////////////////////
    // If no error occurs in compilation then execute
    else {
      print.info("[Executing]", exec_command);

      console.time("Time Taken  ");

      const exec_start = process.hrtime();

      ///////////////////////////
      //executing executable file
      exec(exec_command, { timeout: 10000 }, (error, stdout, stderr) => {
        ///////////////////////////////////////
        //checking for error in execution phase
        if (error || stderr) {
          print.error("[RUNTIME ERROR]", "");
          print.error("", stderr ? stderr : error);
        }

        //////////////////////////////////////
        //Executes the file if not error found
        else {
          print.warn("", ">>>>>");
          print.success("[OUTPUT]", "");
          print.success("", stdout);
          const exec_time = process.hrtime(exec_start)[1] / 1000000;
          console.log(`Time Taken : ${exec_time}ms`);
          print.warn("", ">>>>>");
          const time = Date();

          ///////////////////
          //Collecting Stats
          execution_stats.push([time, compile_time, exec_time]);
        }
        print.info("[INFO]", "Waiting for changes (0.o)");
      });
    }
  });
}

/*
 * Export statement
 */

module.exports = {
  execute,
  stats
};
