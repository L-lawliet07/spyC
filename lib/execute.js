////////////////////////////////////////////////////////////                                        
// @AUTHOR: Mandeep Bisht                                                                       
////////////////////////////////////////////////////////////

'use strict'    
const {exec} = require('child_process');
const {print} = require('./../util/view');

const stats = [];

module.exports = {
    
    execute: ( compile_command, exec_command, file ) => {

        print.info('[Executing]', compile_command);
        //const store = { time :  }
        exec( compile_command, ( error, stdout, stderr ) => {

            if(error) {
                print.error('[COMPILATION ERROR]', '');
                print.error('', error);
                print.info('[INFO]',' Waiting for change');
            } else if ( stderr ) {
                print.error('[COMPILATION ERROR]', '');
                print.error('', stderr);
                print.info('[INFO]',' Waiting for changes');
            }else {

                // If no error occurs in compilation then execute
                print.info('[Executing]', exec_command);
                console.time('Time Taken  ');
                exec( exec_command, ( error, stdout, stderr ) => {
                    if( error ) {
                        print.error('[RUNTIME ERROR]', '');
                        print.error('',error);
                    } 
                    else if( stderr ) {
                        print.error('[RUNTIME ERROR]', '');
                        print.error('', stderr)
                    } else {
                        print.warn('', '>>>>>');
                        print.success('[OUTPUT]', '');
                        print.success('', stdout);
                        console.timeEnd('Time Taken  ');
                        print.warn('', '>>>>>');

                    }
                    print.info('[INFO]','Waiting for changes');
                } );

            }

        } );
    }

};
