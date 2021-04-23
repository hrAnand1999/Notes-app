const fs = require('fs');
const chalk = require('chalk');
const { check } = require('yargs');
const getNotes = () => {
    return 'Your Notes...';
}
const addNote = (title, body) => {
    const notes = loadNotes();
    
    const duplicateNote = notes.find((note) => note.title === title);
    
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes);
        console.log(chalk.green.inverse('Note Added Successfully!'));
    }
    else {
        console.log(chalk.red.inverse('Title already Present'));
    }

}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const data = dataBuffer.toString();
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}
const removeNote = (title) => {
     const notes = loadNotes();
     let check = false;
     notes.forEach((element, index, notes) => {
         if(element.title == title)
         {
             check = true;
             notes.splice(index, 1);
             console.log(chalk.bgGreen('Note Removed!'));
             saveNotes(notes);
             
             
         }
     });
     if(!check)
     {
         console.log(chalk.bgRed('No Note Found!'));
     }
}
const listNotes = () => {
     const notes = loadNotes();
     console.log(chalk.inverse.redBright(`Your Notes!`));
     notes.forEach((element) => console.log(element.title));
}
const readNote = (title) => {
    const notes = loadNotes();
    const findNote = notes.find((element) => element.title === title);
    
    if(findNote)
    {
        console.log(chalk.inverse.greenBright(findNote.title));
        console.log(findNote.body);
    }
    else
    {
        console.log(chalk.inverse.redBright('Note not found'));
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
};