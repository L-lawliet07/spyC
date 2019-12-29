//////////////////////////////////////////////////////////////
// @AUTHOR: Mandeep Bisht                                                                           
//////////////////////////////////////////////////////////////

'use strict'
const chalk = require('chalk');
const figlet = require('figlet');
const {spawn} = require('child_process');

module.exports = {

    heading: ( msg, options = undefined ) => {
        console.log( chalk.bold.cyan('-----------------------------------------------') );
        console.log( chalk.bold.yellow( figlet.textSync( msg, options ) ) );
        console.log( chalk.bold.cyan('-----------------------------------------------') );
    },
    print: { 
        success: ( msg ) => {
            console.log( chalk.green.bold(msg) );   
        },
        error: (msg) => {
            console.log( chalk.red.bold(msg) )
        },

        warn: (msg) => {
            console.log( chalk.yellow.bold(msg) );
        },

        info: (msg) => {
            console.log( chalk.blue.bold(msg) );
        } 

    },
    clear: () => {
        console.clear();
    }
}
