//variable
const noteList = document.querySelector('#note-list');
const date = new Date().toLocaleString();
let pageDate = document.querySelector('#date-save');
pageDate.appendChild(document.createTextNode(date));

//event listeners
eventListener();

function eventListener() {
    //add note
    document.querySelector('#form').addEventListener('submit', newNote);
    //delete note
    document.querySelector('#note-list').addEventListener('click', removeNote);
    //get data from local storage
    document.addEventListener('DOMContentLoaded', localStorageOnload)
}

//function
function newNote(e) {
    e.preventDefault();
    //Take notes from the user
    const note = document.querySelector('#note').value;
    //create div.note
    const noteStyle = document.createElement('div');
    const dataNote = document.createElement('span');
    const textNote = document.createElement('p');
    const trashSharp = document.createElement('div');
    // Take parent to the tags
    noteStyle.appendChild(dataNote);
    noteStyle.appendChild(textNote);
    noteStyle.appendChild(trashSharp);

    // add class to the tags
    noteStyle.classList = 'note-style';
    dataNote.classList = 'date-note';
    textNote.classList = 'text-note';
    trashSharp.classList = 'trash-sharp';
    trashSharp.innerHTML = '<i class="fa fa-trash icon"></i>';
    //---------
    if (note !== "") {
        //add note to the text note
        textNote.appendChild(document.createTextNode(note));
        //adding note-style to the note list
        noteList.appendChild(noteStyle);
        //alert
        alert("Your note was saved successfully");
        //adding note to the local storage
        addNoteLS(note);  
    } else {alert("You did not write anything!!")}
    
    //reset form
    this.reset();
}
//function remove note from note list
function removeNote(e) {
    if (e.target.classList.contains('icon')) {
        (e.target.parentElement).parentElement.remove();
        //also remove note from the local storage
        removeNoteFromLS((e.target.parentElement).parentElement.textContent);
    }
}
//adding note to the local storage
function addNoteLS(note) {
    const notes = getNoteFromLS();
    notes.push(note)
    localStorage.setItem('notes', JSON.stringify(notes));
}
//get note from local storage
function getNoteFromLS() {
    let notes;
    let getFromLS = localStorage.getItem('notes');
    if (getFromLS === null) {
        notes = [];
    } else {
        notes = JSON.parse(getFromLS);
    }
    return notes;
}
//get data from local storage onload
function localStorageOnload() {
    const notes = getNoteFromLS();
    notes.forEach(function(note) {
        //create div.note
        const noteStyle = document.createElement('div');
        const dataNote = document.createElement('span');
        const textNote = document.createElement('p');
        const trashSharp = document.createElement('div');
        // Take parent to the tags
        noteStyle.appendChild(dataNote);
        noteStyle.appendChild(textNote);
        noteStyle.appendChild(trashSharp);

        // add class to the tags
        noteStyle.classList = 'note-style';
        dataNote.classList = 'date-note';
        textNote.classList = 'text-note';
        trashSharp.classList = 'trash-sharp';
        trashSharp.innerHTML = '<i class="fa fa-trash icon"></i>';
        //---------
        //add note to the text note
        textNote.appendChild(document.createTextNode(note));
        //adding note-style to the note list
        noteList.appendChild(noteStyle);
    });
}
//also remove note from local storage
function removeNoteFromLS(noteContent) {
    const noteDelete = noteContent.substring(0, noteContent.length);
    const noteFromLS = getNoteFromLS();
    noteFromLS.forEach(function(note, index) {
        if (note === noteDelete) {
            noteFromLS.splice(index, 1);
        }
    });
    //set new array of notes to the local storage
    localStorage.setItem('notes', JSON.stringify(noteFromLS));
}