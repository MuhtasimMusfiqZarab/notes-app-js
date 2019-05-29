import { createNote } from "./notes";
import { setFilters } from "./filters";
import { renderNotes } from "./views";

//initial rendering without input change
renderNotes();

//create note-------event listener to button
document.querySelector("#create-note").addEventListener("click", e => {
  const id = createNote();
  //redirect here after creating
  location.assign(`/edit.html#${id}`);
});

//render as input changes
document.querySelector("#search-text").addEventListener("input", e => {
  setFilters({
    searchText: e.target.value
  });
  renderNotes();
});

//dropdown filtering
document.querySelector("#filter-by").addEventListener("change", e => {
  setFilters({
    sortBy: e.target.value
  });
  renderNotes();
});
//here is a prob
//thi}s code fires only showes changes to other opened tabs
window.addEventListener("storage", e => {
  //checking if the change is made to notes
  if (e.key === "notes") {
    renderNotes();
  }
});
