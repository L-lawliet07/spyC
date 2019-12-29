////////////////////////////////////////////////////////////
// @AUTHOR: Mandeep Bisht
////////////////////////////////////////////////////////////
    
'use strict'

const figlet = require('figlet');

const parser = require('./lib/parser');
const {watch} = require('./lib/watch');
const {heading, clear} = require('./util/view');
//Starting eagle

clear();
heading( '[eYe]', { verticalLayout: 'default', horizontalLayout: 'fitted' } );

const parse_result = parser.parser( process.argv.slice(2) );

watch( 
    parse_result.compile_command,
    parse_result.exec_command,
    parse_result.file
);
