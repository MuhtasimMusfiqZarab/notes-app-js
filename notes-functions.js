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
  const noteElement = document.createElement("p");
  if (note.title.length > 0) {
    noteElement.textContent = note.title;
  } else {
    noteElement.textContent = "Unnamed Note";
  }
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
