// console.log(module); //Tells all info about module of this file.
console.log("Starting app.js..");

//In-built node packages
const fs = require('fs');
// const os = require('os');

//User defined node packages
const notes = require('./notes');

//Third-party node packages (npm)
const _ = require('lodash');
const yargs = require('yargs');

//Used to get the user's name from the computer
// var user = os.userInfo();
// console.log(user); //Tells all info about user variable.

//Make new file with user' name and age.
// fs.appendFile("greeting.txt", `Hello ${user.username}\nYou are ${notes.age}\n`, function(err){
//     if(err){
//         console.log("Something wrong occured. File could not be made.");
//     }
// });

//Run the functions defined by user in another file and use them in this file
// console.log(notes.addNote());
// console.log(`The sum is ${notes.add(9, -2)}`);

//Using lodash package to make array unique
// var uniqueArray = _.uniq(['Mayank', 'Mayank', 1, 1, 2, 1, 3, 4]);
// console.log(uniqueArray);

//Taking input from the user and inputting a list of commands using process.argv
// console.log(process.argv);
// var command = process.argv[2];
// console.log(`Command: ${command}`);
//Taking input from the user and inputting a list of commands using "yargs" third-party npm package
var argv = yargs.argv;
var command = argv._[0];
// console.log(argv);

if(command == "add"){
    // console.log("Adding new note");
    var note = notes.addNote(argv.title, argv.body);
    if(note === undefined){
        console.log("Some error occured. Note was not added..");
    }
    else{
        notes.logNote(note);
    }
}
else if(command == "list"){
    // console.log("Listing all notes");
    var allNotes = notes.listAll();
    console.log(`Printing ${allNotes.length} note(s)..`);
    allNotes.forEach((note) => notes.logNote(note));
}
else if(command == "read"){
    // console.log("Reading note");
    var note = notes.getNote(argv.title);
    if(note){
        notes.logNote(note);
    }
    else{
        console.log("Note is not present..");
    }
}
else if(command == "remove"){
    // console.log("Removing note");
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? "Note was removed!!" : "Note not found!!";
    console.log(message);
}
else{
    console.log("Command not recognized");
}