////////////////////////////////////////////////////////////                                        
// @AUTHOR: Mandeep Bisht                                                                       
////////////////////////////////////////////////////////////

'use strict'    
const fs = require('fs');
const os = require('os');
const {exec} = require('child_process');
const {print} = require('./../util/view');

module.exports = {

    watch: ( compile_command, exec_command, file ) => {

        print.info(`[Executing] : ${compile_command}`);

        //Watching file for change
        fs.watchFile( file, {interval: 500}, ( cur, prev ) => {
            // Compiling C++ file
            exec( compile_command, ( error, stdout, stderr ) => {
                if(error) {
                    print.error(error);
                }
                if ( stderr ) {
                    print.error(stderr);
                }else {

                    // If no error occurs in compilation then execute
                    exec( exec_command, ( error, stdout, stderr ) => {
                        if( error ) {
                            print.error(error);
                        } 
                        if( stderr ) {
                            print.error(stderr)
                        } else {
                            print.info('-----------------------------------------------------');
                            print.success(stdout);
                            print.info('-----------------------------------------------------');
                        }
                        print.info('[Waiting for file change]'); 

                    } );

                }

            } );

        } );

    }

};

