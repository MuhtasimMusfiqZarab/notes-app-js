"use strict";

let notes = getSavedNotes();

//filter object to store the latest filters
const filters = {
  searchText: "",
  sortBy: "byEdited" //this is the default value
};

//initial rendering without input change
renderNotes(notes, filters);

//create note-------event listener to button
document.querySelector("#create-note").addEventListener("click", e => {
  const id = uuidv4();
  const timestamp = moment().valueOf();
  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp
  });
  //saving to storage
  saveNotes(notes);
  //redirect here after creating
  location.assign(`/edit.html#${id}`);
});

//render as input changes
document.querySelector("#search-text").addEventListener("input", e => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

//dropdown filtering
document.querySelector("#filter-by").addEventListener("change", e => {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});
//input vs change
// ==> input allowed us to get the new value for every keystock where change trows event after typing all the characters and then clicking away
//we can use change for chekboxs & dropdowns though

///window global event listener for storage change ( for live data sync)
//this code fires only for the other tab open-- not for the current tab where the chage is made
window.addEventListener("storage", e => {
  //checking if the change is made to notes
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});
