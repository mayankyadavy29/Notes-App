// console.log(module); //Tells all info about module of this file.npm -v
// console.log("Runnng notes.js..");

//Making some functions to be used in other file. This is the old method to add functions in export object
module.exports.print = () => {
    console.log("Just trying out functions to be exported..");
};

const fs = require('fs');

//Fetching existing data from notes
var fetchNotes = () => {
    try{
        var notesString = fs.readFileSync("notes-data.json");
        return JSON.parse(notesString);
    } 
    catch(e){
        return [];
    }
}

//Saving data in notes
var saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
}

//This is the new way of adding functions in the export object (used in ES6)
var addNote = (title, body) => {
    // console.log(`Adding note with title ${title} and body ${body}`);
    var note = {
        title, 
        body
    };
    var notes = fetchNotes();
    var duplicateNotes = notes.filter((note) => note.title === title );
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var listAll = () => {
    // console.log("Listing all notes");
    return fetchNotes();
};

var getNote = (title) => {
    // console.log(`Reading note ${title}`);
    var notes = fetchNotes();
    var requiredNote = notes.filter((note) => note.title == title);
    if(requiredNote.length){
        return requiredNote[0];
    }
};

var removeNote = (title) => {
    // console.log(`Removing note ${title}`);
    var note = {
        title,
        body : "Anything"
    };
    notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title != title);
    saveNotes(filteredNotes);
    if(notes.length == filteredNotes){
        return false;
    }
    else{
        return true;
    }
};

var logNote = (note) => {
    debugger;
    console.log(`Note :\n Title : ${note.title}\n Body : ${note.body}\n -----------\n`);
}

//Sourcing all the functions to export
module.exports = {
    addNote, 
    listAll,
    getNote,
    removeNote,
    logNote
};




