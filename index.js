////////////////////////////////////////////////////////////
// @AUTHOR: Mandeep Bisht
////////////////////////////////////////////////////////////


'use strict'

/*
 * require statement
 */

const figlet = require('figlet');

const parser = require('./lib/parser');

const {watch, unwatch} = require('./lib/watch');

const {heading, clear} = require('./util/view');

const {execute} = require('./lib/execute');

const {exec} = require('child_process');

const path = require('path');

// test
const readLine = require('readline');


module.exports = {

    start: (args) => {
        clear();
        heading( 'O.O', {font : 'Bloody', verticalLayout: 'default', horizontalLayout: 'fitted' } );

        const parse_result = parser.parser( args );

        execute(
            parse_result.compile_command,
            parse_result.exec_command,
            parse_result.file 
        )
        const read = readLine.createInterface( {
            input: process.stdin,
            output: process.stdout
        } );

        read.on('line', (line) => {
            if( line==='quit' ) {
                unwatch(parse_result.file);
                read.close();
            }
            if ( line === 'cat' ) {
                exec( `cat ${ parse_result.file }`, ( err, stdout, stderr ) => {
                    console.log(stdout);
                } );                
            }
        })

        watch( 
            parse_result.compile_command,
            parse_result.exec_command,
            parse_result.file
        );    

    }
}
