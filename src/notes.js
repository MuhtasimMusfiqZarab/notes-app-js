import uuidv4 from "uuid/v4";
import moment from "moment";

//global notes array
let notes = [];

//read existing notes from local storage===================
const loadNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (error) {
    return []; //if unable to parse JSON data
  }
};

//saving notes==============================================
const saveNotes = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

//expose notes from module
const getNotes = () => notes;

//create note after button click (event listener)
const createNote = () => {
  const id = uuidv4();
  const timestamp = moment().valueOf();
  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp
  });
  saveNotes();

  return id;
};

//Remove a note from the list================================
const removeNote = id => {
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
    saveNotes();
  }
};

// //sorting the notes in one of the three ways==================
const sortNotes = sortBy => {
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

const updateNote = (id, updates) => {
  //note found
  const note = notes.find(note => {
    return note.id === id;
  });

  //note was note found
  if (!note) {
    return;
  }
  //continue here if found (update object)
  if (typeof updates.title === "string") {
    note.title = updates.title;
    note.updatedAt = moment().valueOf();
  }
  if (typeof updates.body === "string") {
    note.body = updates.body;
    note.updatedAt = moment().valueOf();
  }
  saveNotes();
  return note;
};

notes = loadNotes();

export { getNotes, createNote, removeNote, sortNotes, updateNote };
