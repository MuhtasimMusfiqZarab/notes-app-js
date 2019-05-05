const notes = [
  {
    title: "my next trip",
    body: "I would like to go to Spain"
  },
  {
    title: "Habbits to work on",
    body: "Exercise. Eating a bit better."
  },
  {
    title: "Office modification",
    body: "Get a new seat"
  }
];

//filter object to store the latest filters
const filters = {
  searchText: ""
};

//rendering all the notes
const renderNotes = (notes, filters) => {
  const filteredNotes = notes.filter(note => {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  //clearing previous rendered notes
  document.querySelector("#notes").innerHTML = "";

  //add filteded notes to DOM
  filteredNotes.forEach(note => {
    const noteElement = document.createElement("p");
    noteElement.textContent = note.title;
    document.querySelector("#notes").appendChild(noteElement);
  });
};

//initial rendering without input change
renderNotes(notes, filters);

//adding event listener to button
document.querySelector("#create-note").addEventListener("click", e => {
  console.log("Did this worrk?");
  console.log(e);
  e.target.textContent = " Button is clicked";
});

//render as input changes
document.querySelector("#search-text").addEventListener("input", e => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

//event listener for form
document.querySelector("#name-form").addEventListener("submit", e => {
  //cancle the default behaviour  of the form (default: full page refresh, adding the value to the URL after submit(updating the URL))
  e.preventDefault();
  //e.target gets us to the DOM element of the form
  //elements contain all the input fields and is called by their name
  console.log(e.target.elements.firstName.value);
  //clearing the form field after submitting
  e.target.elements.firstName.value = "";
});
