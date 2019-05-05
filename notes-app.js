let notes = getSavedNotes();

//filter object to store the latest filters
const filters = {
  searchText: ""
};

//initial rendering without input change
renderNotes(notes, filters);

//create note-------event listener to button
document.querySelector("#create-note").addEventListener("click", e => {
  notes.push({
    title: "",
    body: ""
  });
  //saving to storage
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes(notes, filters);
});

//render as input changes
document.querySelector("#search-text").addEventListener("input", e => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

//dropdown filtering
document.querySelector("#filter-by").addEventListener("change", e => {
  console.log(e.target.value);
});
//input vs change
// ==> input allowed us to get the new value for every keystock where change trows event after typing all the characters and then clicking away
//we can use change for chekboxs & dropdowns though
