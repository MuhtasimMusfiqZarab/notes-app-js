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

//adding event listener to button
document.querySelector("button").addEventListener("click", e => {
  console.log("Did this worrk?");
  console.log(e);
  e.target.textContent = " Button is clicked";
});
