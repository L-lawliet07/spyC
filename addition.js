////////////////////////////////////////////////////////////   
// @AUTHOR: Mandeep Bisht                                                                     
//////////////////////////////////////////////////////////// 

'use strict'

/*
 * require statement
 */

const fs = require('fs');

const readline = require('readline');

const parse = require('minimist');

const {print} = require('./../util/view');


/*
 * option : object to store command line option
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
      '--quick' : 'admins personal settings [g++ -DLOCAL -std=c++17 -Wshadow -Wall -o file file.cpp -fsan  itize=address -fsanitize=undefined -D_GLIBCXX_DEBUG -g]'
}



/*
 * This hash will store all the valid options
 */

const hash = new Set(

    [
        'Wall'     ,
        'Werror'   ,
        'Wextra'   ,
        'Wshadow'  ,
        'O0'       ,
        'O2'       ,
        'O3'       ,
        'i'        , 
        'input'    , 
        'std'      , 
        'quick'    ,
        'fsanitize'
    ]
);



/*
 * file not found check
 */

function ifExists ( file ) {

    if (!fs.existsSync(file)) {
        print.error('[ERROR]', `File not found ${file}.`);
        process.exit();
    }
}

const container = { 
    file_name : '',
    gcc_flag: [],
    input_file: ''
}

function input_handler ( input ) {

    //////////////////////////
    //Checking for quit option
    if ( line === 'quit' ) {
        
        unwatch();
        listen.close()
        process.exit(0);
    } 
    ///////////////////////////
    //Checking for stats option
    else if ( line === 'stats' ) {
        const data = stats();
        print.warn('', '>>>>>');
        print.success('', data);
        print.warn('', '>>>>>');
    }
    ///////////////////////////
    //Checking for input option
    else if ( line.startWith('--input') || line.startWith('-i') ) {

        const new_added = parse(line);
        if ( new_added['input'] || new_added['i']) {
            container['input_file'] =  new_added['input'] || new_added['i'];
        }
        createCommand();

    } 
    /////////////////////////
    //Checking for cat option
    else if ( line.startWith === '--cat' ) {

        const parse_object = parse(line);
        const cwd = process.cwd();
        const cat_path = path.join( cwd, parse_object['cat'] );
        if ( fs.existSync(cath_path) ) {
            exec( `cat ${ cat_path }`, ( err, stdout, stderr ) => {
                if ( err || stderr ) {

                    print.error('[ERROR]', '');
                    print.error('', (stderr) ? stderr : error);
                } 
                else {

                    print.warn('', '>>>>>');
                    print.success('', stdout);
                    print.warn('', '>>>>>');

                }
                print.info('[INFO]','Waiting for changes');
            } )
        }
    } 
}


/*
 * listener : this module will listen to console input
 */

function listener() {

    listen = readline.createInterface( {
        input: process.stdin,
        output: process.stdout
    } );

    listen.on('line', (line) => {
        input_handler(line);
    } );
}


//create command
function createCommand () {

    let compile_command = '';
    const cwd = process.cwd();
    const output_file = path.join(cwd, 'output');

    //////////////////////////////////////
    //Generating basic compilation command
    if ( container.file_name ) {

        compile_command = `g++ ${compile_command} -o ${output}`
    } 
    ////////////////////////////
    //Checking for quick option
    if ( container.quick ) {

        compile_command = `g++ -DLOCAL -std=c++17 -Wshadow -Wall -o ${output} ${container.file_name} -fsanitize=address -fsanitize=undefined -D_GLIBCXX_DEBUG -g`

    } 
    /////////////////////////////////
    //Adding gcc flags to the command
    else if ( container.gcc_flags ) {

        let flag_string = '';
        for ( let flag of container.gcc_flags ) {
            flag_string  = flag_string + ' -' + flag;     
        }
        compile_command += flag_string;

    }

    const exec_command = output_file;
    /////////////////////////////
    //Adding input file if exists
    if ( container.input_file ) {
        exec_command = `${exec_command} < ${input_file}`;
    }

    return {
        container.file_name,
        compile_command,
        exec_command
    } 
}



/*
 * Parser Funtion that will parse command line arguments
 */

function parser ( args ) {

    const parse_object = parse(args);
    const cwd = process.cwd();
    
    ///////////////////
    //checking for help
    if ( parse_object.h || parse_object.help() ) {
        help();
    }
    //////////////////////////
    //if no argument is passed
    if ( args.length === 0 ) {
        print.error('[ERROR]', 'Argument missing type -h, --help for help');
        process.exit();
    } 

    const file = path.join( cwd, args[0] );
    ////////////////////////
    //checking if file exists
    ifExists(file);

    container.file_name = file;

    ////////////////////////////////////////
    //Adding input file location to container
    if ( parse_object['input'] || parse_object['i'] ) {
        const input_file = path.join(cwd, parse_object['input'] || parse_object['i']);
        ifExists( input_file );
        container.input_file = input_file;
    }

    //////////////////////////
    //check if quick is select
    if ( parse_object['quick'] ) {
        container.quick = true;
    }

    //////////////////////////////
    //Addding gcc flag to container
    for ( let key in parse_object ) {

        if( key === '_' || key === 'i' || key === 'input' || !hash.has(key) ) continue;

        container['gcc_flag'].push( `${key}${ ( typeof parse_object[key] !== 'boolean'? '='+parse_object[key]: '' ) }` );
    }
}



/*
 * Main funtion : this is the main function 
 */

function main (args) {

    // start Listner
    listener(args);

    // parser
    parser(args);

    // direct call command 

    return createCommand();
}
