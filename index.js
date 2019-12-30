////////////////////////////////////////////////////////////
// @AUTHOR: Mandeep Bisht
////////////////////////////////////////////////////////////


'use strict'

const figlet = require('figlet');

const parser = require('./lib/parser');
const {watch} = require('./lib/watch');
const {heading, clear} = require('./util/view');
const {execute} = require('./lib/execute');
//Starting eagle

module.exports = {

    start: (args) => {
        clear();
        heading( 'eagle', {font : 'Cosmike', verticalLayout: 'default', horizontalLayout: 'fitted' } );

        const parse_result = parser.parser( args );

        execute(
            parse_result.compile_command,
            parse_result.exec_command,
            parse_result.file 
        )

        watch( 
            parse_result.compile_command,
            parse_result.exec_command,
            parse_result.file
        );    

    }
}


