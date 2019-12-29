///////////////////////////////////////////////////////////                                        
// @AUTHOR: Mandeep Bisht                                                                           
///////////////////////////////////////////////////////////

'use strict'

const parse = require('minimist');
const {print} = require('./../util/view');
const path = require('path');


const option = {
    '-h, --help': 'print command line options',
    '-i, --input': 'for giving input to the program. (eg. --input=location)',
    '--std': 'std - Specify the C++ version or ISO standard version.',
    '--Wall': 'Turns on lots of compiler warning flags, specifically (-Waddress, -Wcomment, -Wformat, -Wbool-compare, -Wuninitialized, -Wunknown-pragmas, -Wunused-value, -Wunused-value …)',
    '--Werror': 'Turn any warning into a compilation error.',
    '--Wextra' : 'Enables extra flags not enabled by -Wall, such as -Wsign-compare (C only), -Wtype-limits, -Wuninitialized',
    '--Wshadow' : 'Enable warning for Variable Shadowing',
    '--O0' : 'No optmization, faster compilation time, better for debugging builds.',
    '--O2' : '',
    '--O3' : 'Higher level of optmization. Slower compile-time, better for production builds',
    '--fsanitize' : 'Sanitizer for runtime checks. (eg. --fsanitize=address, --fsanitize=undefined)',
    '--db-check' : 'user setting g++ -DLOCAL -std=c++17 -Wshadow -Wall -o file file.cpp -fsanitize=address -fsanitize=undefined -D_GLIBCXX_DEBUG -g'
}

const mapping = {
    
}

function help () {

    const max_width = 30;
    
    for ( let key in option ) {
        process.stdout.write(key);
        for ( let count = 0; count < max_width - key.length; ++count ) {
            process.stdout.write(' ');
        }
        console.log(option[key]);
        console.log();
    }
}

function checkIfExists ( file ) {
    return fs.existSync(file);
}

module.exports = {

    parser: ( args ) => {

        if( args.length == 0 ) {
            print.warn('Arguments Missing type -h, --help for help');
            process.exit();
        }
        
        const parse_object = parse(args);  

        const cwd = process.cwd();
        const file = path.join( cwd, args[0] );

        //Executing command
        const exec_file = path.join(path.dirname(file), path.parse(args[0]).name);        
        let exec_command = exec_file;

        //checking if there is any input
        if ( parse_object.i || parse_object.input ) {
            exec_command= `${exec_command} < ${path.join(cwd, parse_object.i || parse_object.input)}`
        }

        //Final Command 
        const compile_command = `g++ ${file} -o ${exec_file}`;

        return {
            compile_command,
            exec_command,
            file,
        };
    },
}
