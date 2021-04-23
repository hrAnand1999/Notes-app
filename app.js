
const chalk = require('chalk');
const validator = require('validator');
const yargs = require('yargs');
const notes = require('./notes.js');

// customize Yrags version
yargs.version('16.2.0');

// Adding command to yargs
yargs.command({
    command: 'add',
    describe: 'Add new Notes',
    builder: {
        title : {
            describe : 'Note Title',
            demandOption : 'true',
            type : 'string'
        },
        body : {
            describe : 'Note Body',
            demandOption : 'true',
            type : 'string'
        }
    },
    handler: (argv) => {
         notes.addNote(argv.title, argv.body);
        
    }
})
// Adding remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a Note',
    builder : {
       title : {
           describe : 'Note Title',
           demandOption : 'true',
           type : 'string'
       }
    },
    handler: (argv) => {
         notes.removeNote(argv.title);
       
    }
})
// Adding list command
yargs.command({
    command: 'list',
    describe: 'list all the notes',
    handler: () => {
        notes.listNotes();
    }
})
// Adding read command
yargs.command({
    command: 'read',
    describe: 'Read the notes',
    builder : {
        title : {
            describe : 'Note Title',
            demandOption : 'true',
            type : 'string'
        }
    },
    handler: (argv) => {
        notes.readNote(argv.title);
    }
})
yargs.parse();
