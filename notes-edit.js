//quering text
const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const buttonElement = document.querySelector("#remove-note");

// getting note id from URL
const noteId = location.hash.substring(1); //get whole id string from #id... excluding the hash
let notes = getSavedNotes(); //getting all the saved notes
let note = notes.find(note => {
  return note.id === noteId;
});

// no note is found
if (note === undefined) {
  location.assign("/index.html");
}

//default Value (input & text area)
titleElement.value = note.title;
bodyElement.value = note.body;

//editing title
titleElement.addEventListener("input", e => {
  note.title = e.target.value;
  saveNotes(notes);
});

//editing body
bodyElement.addEventListener("input", e => {
  note.body = e.target.value;
  saveNotes(notes);
});

//remove button event
buttonElement.addEventListener("click", e => {
  removeNote(note.id);
  saveNotes(notes);
  //redirect after removing
  location.assign("/index.html");
});

//window global event listener for storage change ( for live data sync)
//this code fires only for the other tab open-- not for the current tab where the chage is made
window.addEventListener("storage", e => {
  //checking if the change is made to notes
  if (e.key === "notes") {
    //JSON.parse(e.newValue) contains all of the notes including the changes
    notes = JSON.parse(e.newValue);
    note = notes.find(note => {
      return note.id === noteId;
    });

    // no note is found
    if (note === undefined) {
      location.assign("/index.html");
    }

    //default Value (input & text area)
    titleElement.value = note.title;
    bodyElement.value = note.body;
  }
});
