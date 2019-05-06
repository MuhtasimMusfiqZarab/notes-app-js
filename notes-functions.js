//read existing notes from local storage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");

  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

//saving notes
const saveNotes = notes => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

//Remove a note from the list
const removeNote = id => {
  const noteIndex = notes.findIndex(note => {
    return note.id === id;
  });
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

//Generate the DOM structure for a not
const generateNoteDOM = note => {
  //this is the container element for p and button
  const noteElement = document.createElement("div");
  const textElement = document.createElement("a");
  //adding remove note button
  const button = document.createElement("button");
  button.textContent = "x";

  //adding button 1st
  noteElement.appendChild(button);
  //delete event listener for this button
  button.addEventListener("click", e => {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters); //re-rendering notes
  });
  //setup the note title text
  if (note.title.length > 0) {
    textElement.textContent = note.title;
  } else {
    textElement.textContent = "Unnamed Note ";
  }
  //appending text second
  textElement.setAttribute("href", `/edit.html#${note.id}`);
  noteElement.appendChild(textElement);
  return noteElement;
};

// //sorting the notes in one of the three ways
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1; //-1 means that a should come before b
      } else if (a.updatedAt < b.updatedAt) {
        return 1; //1 means that b should come before a
      } else {
        return 0; //that means they are equal
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (b.createdAt > a.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byAlphabetical") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (b.title.toLowerCase() < a.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

//rendering application notes
const renderNotes = (notes, filters) => {
  //sorting notes before rendering
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter(note => {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  //clearing previous rendered notes
  document.querySelector("#notes").innerHTML = "";

  //add filteded notes to DOM
  filteredNotes.forEach(note => {
    const noteElement = generateNoteDOM(note);
    document.querySelector("#notes").appendChild(noteElement);
  });
};

//generate the last edited message
const generateLastEdited = timestamp => {
  return `Last edited ${moment(timestamp).fromNow()}`; //moment(timestamp) returns the time
};
