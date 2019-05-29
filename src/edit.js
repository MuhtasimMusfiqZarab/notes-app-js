import { initializeEditPage, generateLastEdited } from "./views";
import { updateNote, removeNote } from "./notes";

//quering text
const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const buttonElement = document.querySelector("#remove-note");
const dateElement = document.querySelector("#last-edited");
// getting note id from URL
const noteId = location.hash.substring(1); //get whole id string from #id... excluding the hash

//initializing the page
initializeEditPage(noteId);

//editing title
titleElement.addEventListener("input", e => {
  const note = updateNote(noteId, {
    title: e.target.value
  });
  dateElement.textContent = generateLastEdited(note.updatedAt);
});

//editing body
bodyElement.addEventListener("input", e => {
  const note = updateNote(noteId, {
    body: e.target.value
  });
  dateElement.textContent = generateLastEdited(note.updatedAt);
});

//remove button event
buttonElement.addEventListener("click", e => {
  removeNote(noteId);
  //redirect after removing
  location.assign("/index.html");
});

//live data sync to other opened tabs
window.addEventListener("storage", e => {
  //checking if the change is made to notes
  if (e.key === "notes") {
    initializeEditPage(noteId);
  }
});
