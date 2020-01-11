///////////////////////////////////////////////////////////                                        
// @AUTHOR: Mandeep Bisht                                                                           
///////////////////////////////////////////////////////////

'use strict'

/*
 * require statements
 */

const parse = require('minimist');

const {print} = require('./../util/view');

const path = require('path');

const fs = require('fs');



/*
 * option: object to store commandline options
 */

const help_option = {

    '-h, --help': 'print command line options',
    '-i, --input': 'for giving input to the program. (eg. --input=location)',
    '--std': 'std - Specify the C++ version or ISO standard version.',
    '--Wall': 'Turns on lots of compiler warning flags.)',
    '--Werror': 'Turn any warning into a compilation error.',
    '--Wextra' : 'Enables extra flags not enabled by -Wall',
    '--Wshadow' : 'Enable warning for Variable Shadowing',
    '--O0' : 'No optmization.',
    '--O2' : '',
    '--O3' : 'Higher level of optmization.',
    '--fsanitize' : 'Sanitizer for runtime checks. (eg. --fsanitize=address)',
    '--quick' : 'admins personal settings [g++ -DLOCAL -std=c++17 -Wshadow -Wall -o file file.cpp -fsanitize=address -fsanitize=undefined -D_GLIBCXX_DEBUG -g]'
}



/*
 * help function used to display options 
 */

function help () {

    const max_width = 20;
    console.log('Usage: spyc <yourfile.cpp> [options]');
    console.log();
    console.log('OPTIONS : ')
    console.log();
    for ( let key in help_option ) {

        process.stdout.write(key);
        for ( let count = 0; count < max_width - key.length; ++count ) {
            process.stdout.write('.');
        }
        console.log(help_option[key]);
    }
    process.exit();
}



/*
 * file not found check
 */

function fileNotFoundCheck ( file ) {

    if (!fs.existsSync(file)) {
        print.error('[ERROR]', `File not found ${file}.`);
        process.exit();
    }
}




function checker ( args ) {


    const parse_object = parse(args);

    //Checking for help command
    if ( parse_object.h || parse_object.help ) {
        help();
    }

    //if no argument is passed
    if( args.length == 0 ) {
        print.error('[ERROR]', 'Arguments missing type -h, --help for help');
        process.exit();
    }

    //Checking for file existence
    fileNotFoundCheck(args[0]);


    //checking if input file path exists
    if ( parse_object['input'] || parse_object['i'] ) {
        fileNotFoundCheck(parse_object['input'] || parse_object['i']);
    }

    let flag_string = '';
    if ( parse_object.check ) {
            flag_string = ' -DLOCAL -std=c++17 -Wshadow -Wall -fsanitize=address -fsanitize=undefined -D_GLIBCXX_DEBUG -g'
    } else {
        for ( let key in parse_object ) {
            if( key === '_' || key ==='i' || key ==='input' ) continue;
            if ( option[`--${key}`] ) {
                flag_string += ` -${key}${ (typeof parse_object[key] !== 'boolean'? '='+parse_object[key]: '') }`;  
            } 
        }
    }
    return {flag_string, parse_object};
}


module.exports = {

    parser: ( args ) => {

        // Checker for validity and existence of files
        const {flag_string, parse_object} = checker(args);

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
        const compile_command = `g++ ${file} -o ${exec_file}${flag_string}`;

        // Ititial banner
        // print.warn('[COMPILE]', compile_command);
        // print.warn('[EXECUTE]', exec_command);

        return {
            compile_command,
            exec_command,
            file,
        };
    }
}
