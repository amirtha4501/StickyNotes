// if ("serviceWorker" in navigator) {
//   // register service worker
//   navigator.serviceWorker.register("service-worker.js");
// }

let count = Number(window.localStorage.getItem("count"));
if (!count) {
  window.localStorage.setItem("count", "0");
}

console.log(count);

function createNote(noteTitle, noteBody) {
  if (count > 0) {
    document.getElementById("no-notes").classList.add("hidden");
  }

  let li = document.createElement("li");
  let a = document.createElement("a");
  let h2 = document.createElement("h2");
  let p = document.createElement("p");
  let xButton = document.createElement("button");

  xButton.classList.add("delete");
  let xText = document.createTextNode("X");
  let h2TN = document.createTextNode(noteTitle);
  let pTN = document.createTextNode(noteBody);

  h2.appendChild(h2TN);
  p.appendChild(pTN);
  xButton.appendChild(xText);

  a.appendChild(h2);
  a.appendChild(xButton);
  a.appendChild(p);
  a.setAttribute("href", "#");

  li.appendChild(a);

  document.getElementById("notes").appendChild(li);
}

function createNoteFromInput(e) {
  e.preventDefault();
  let noteTitle = document.getElementById("new-note-title").value;
  let noteBody = document.getElementById("new-note-body").value;

  console.log("Linked", noteBody, noteTitle);

  document.getElementById("new-note-title").value = "";
  document.getElementById("new-note-body").value = "";

  if (!noteTitle || !noteBody) {
    alert("Both Title and body of the note must be provided");
    return;
  }

  count += 1;
  console.log("Adding count")
  window.localStorage.setItem("count", count);
  window.localStorage.setItem(noteTitle, noteBody);
  createNote(noteTitle, noteBody);
}

function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm('Are you sure to delete the "' + e.target.previousElementSibling.innerText + '" note?')) {
      let li = e.target.parentElement.parentElement;
      let ul = document.getElementById("notes");
      
      ul.removeChild(li);

      console.log("Removing count - 1", count);
      count -= 1;
      console.log("Removing count - 2", count);
    
      window.localStorage.setItem("count", count);
      console.log(e.target.previousElementSibiling);
      window.localStorage.removeItem(e.target.previousElementSibiling.innerText);
    
      if (count < 1) {
        document.getElementById("no-notes").className = "";
      }
    }
  }
  // if (ul.childNodes.length === 0) {
  //   document.getElementById("no-notes").classList.remove("hidden");
  // }
}

for (let i = 0; i < count + 1; i++) {
  let noteTitle = window.localStorage.key(i);
  let noteBody = window.localStorage.getItem(noteTitle);

  if (noteTitle !== "count" && noteTitle) {
    createNote(noteTitle, noteBody);
  }
}

document
  .getElementById("notesForm")
  .addEventListener("submit", createNoteFromInput, false);

document.getElementById("notes").addEventListener("click", removeItem);