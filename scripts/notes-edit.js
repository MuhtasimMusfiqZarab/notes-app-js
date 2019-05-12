"use strict";

//quering text
const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const buttonElement = document.querySelector("#remove-note");
const dateElement = document.querySelector("#last-edited");

// getting note id from URL
const noteId = location.hash.substring(1); //get whole id string from #id... excluding the hash
let notes = getSavedNotes(); //getting all the saved notes
let note = notes.find(note => {
  return note.id === noteId;
});

if (!note) {
  location.assign("/index.html");
}

//default Value (input & text area)
titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt);

//editing title
titleElement.addEventListener("input", e => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf(); //update timestamp after edit
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

//editing body
bodyElement.addEventListener("input", e => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf(); //update timestamp after edit
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

//remove button event
buttonElement.addEventListener("click", e => {
  removeNote(note.id);
  saveNotes(notes);
  //redirect after removing
  location.assign("/index.html");
});

//live data sync to other opened tabs
window.addEventListener("storage", e => {
  //checking if the change is made to notes
  if (e.key === "notes") {
    //JSON.parse(e.newValue) contains all of the notes including the changes
    notes = JSON.parse(e.newValue);
    note = notes.find(note => {
      return note.id === noteId;
    });
    //!note equals note===undefined (no note found)
    if (!note) {
      location.assign("/index.html");
    }

    //default Value (input & text area)
    titleElement.value = note.title;
    bodyElement.value = note.body;
    dateElement.textContent = generateLastEdited(note.updatedAt);
  }
});
