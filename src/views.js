import moment from "moment";
import { getFilters } from "./filters";
import { sortNotes, getNotes } from "./notes";

//Generate the DOM structure for a not==========================
const generateNoteDOM = note => {
  //this is the container element for p and button
  const noteElement = document.createElement("a");
  const textElement = document.createElement("p");
  const statusEl = document.createElement("p");

  //setup the note title text
  if (note.title.length > 0) {
    textElement.textContent = note.title;
  } else {
    textElement.textContent = "Unnamed Note ";
  }
  textElement.classList.add("list-item__title");

  noteElement.appendChild(textElement);

  //setup the link
  noteElement.setAttribute("href", `/edit.html#${note.id}`);
  noteElement.classList.add("list-item");

  //setup the status message
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  noteElement.appendChild(statusEl);
  return noteElement;
};

//rendering application notes=======================================
const renderNotes = () => {
  const notesEl = document.querySelector("#notes");
  const filters = getFilters();
  //sorting notes before rendering
  const notes = sortNotes(filters.sortBy);
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  //clearing previous rendered notes
  notesEl.innerHTML = "";

  //if we are rendering any notes
  if (filteredNotes.length > 0) {
    //add filteded notes to DOM
    filteredNotes.forEach(note => {
      const noteElement = generateNoteDOM(note);
      notesEl.appendChild(noteElement);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = " No notes to show";
    //adding styles to this paragraph
    emptyMessage.classList.add("empty-message");
    notesEl.appendChild(emptyMessage);
  }
};

const initializeEditPage = noteId => {
  //quering text
  const titleElement = document.querySelector("#note-title");
  const bodyElement = document.querySelector("#note-body");
  const dateElement = document.querySelector("#last-edited");
  //getting all the saved notes
  const notes = getNotes();
  const note = notes.find(note => {
    return note.id === noteId;
  });

  if (!note) {
    location.assign("/index.html");
  }

  //default Value (input & text area)
  titleElement.value = note.title;
  bodyElement.value = note.body;
  dateElement.textContent = generateLastEdited(note.updatedAt);
};

//generate the last edited message====================================
const generateLastEdited = timestamp => {
  return `Last edited ${moment(timestamp).fromNow()}`; //moment(timestamp) returns the time
};

export { generateNoteDOM, generateLastEdited, renderNotes, initializeEditPage };
