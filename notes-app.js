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

const h1 = document.querySelector("h1");

console.log(h1.textContent);

//query all and replace/ remove
const ps = document.querySelectorAll("p");

ps.forEach(p => {
  p.textContent = " **********";
  // or p.remove()
});

//Adding a new element
//1. create it
const newParagraph = document.createElement("p");
//2.Assigning values
newParagraph.textContent = " This is a new element from javaScript";
//3. Pick a place to put it
document.querySelector("body").appendChild(newParagraph);
