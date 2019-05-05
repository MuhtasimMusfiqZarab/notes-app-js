//read existing notes from local storage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");

  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

//generate the DOM structure for a not
const generateNoteDOM = note => {
  //this is the container element for p and button
  const noteElement = document.createElement("div");
  const textElement = document.createElement("span");
  //adding remove note button
  const button = document.createElement("button");
  button.textContent = "x";

  //adding button 1st
  noteElement.appendChild(button);
  //setup the note title text
  if (note.title.length > 0) {
    textElement.textContent = note.title;
  } else {
    textElement.textContent = "Unnamed Note ";
  }
  //appending text second
  noteElement.appendChild(textElement);
  return noteElement;
};

//rendering application notes
const renderNotes = (notes, filters) => {
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
