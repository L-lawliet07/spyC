////////////////////////////////////////////////////////////
// @AUTHOR: Mandeep Bisht
// Date: 26-Dec-2019
////////////////////////////////////////////////////////////
    
'use strict'
const os = require('os');
const fs = require('fs');
const exec = require('child_process').exec 

const file = './sample.cpp';
let count = 0;

console.log('Eagle');

fs.watchFile( file, (curr, prev) => {
    ++count;
    console.log(`[${count}] :  is changed`);
    exec( `g++ ${file} -o test `, ( error, stdout, stderr ) => {
        exec('./test', ( error, stdout, stderr ) => {
            console.log(stdout);
        });
    } );
} );
