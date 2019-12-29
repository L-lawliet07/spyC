////////////////////////////////////////////////////////////                                        
// @AUTHOR: Mandeep Bisht                                                                       
////////////////////////////////////////////////////////////

'use strict'    
const fs = require('fs');
const {exec} = require('child_process');
const {print} = require('./../util/view');
const {execute} = require('./execute');
module.exports = {

    watch: ( compile_command, exec_command, file ) => {
        //Watching file for change
        fs.watchFile( file, {interval: 500}, ( cur, prev ) => {
            execute(compile_command, exec_command, file); 
        } );
    }
};

