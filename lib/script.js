// Add your code here
function save(){
  console.info("Entering Save Function")
  // Get contents of tile and body texxtarea from DOM
  let title = document.getElementById('note-title');
  let body = document.getElementById('note-body');
  let note = { date: Date.now(), title : title.value , body : body.value };

  console.info("Title: " + note.title);
  console.info("Body: " + note.body);
  // save to local storage
  if (typeof(Storage) == "undefined") console.error("No local storage support");
  if (note.title == "" || note.body == "") console.error("NULL values in note"); 
  else{
    
    let jnotes = JSON.parse(localStorage.getItem("notes"));
    if(jnotes == null) jnotes = [note]
    else jnotes.push(note)

    localStorage.setItem("notes", JSON.stringify(jnotes));
  }
  updatePage();

}

function deleteAll(){
    localStorage.removeItem("notes");
    updatePage();
}

function updatePage(){
  // Get notes list from DOM
  let notesDOM = document.getElementById('notes');
  // load from local storage
  let jnotes = JSON.parse(localStorage.getItem("notes"));
  for (i = 0; i < jnotes.length; i++) {
        if (jnotes[i] == null) continue;
        // update DOM
        let html = `<div id='note-${i}' onmouseenter='selectNote(this)' onmouseleave='unselectNote(this)' >
            <h3>${jnotes[i].title}</h3>
            <br/>
            <p>${jnotes[i].body}</p> 
            <br/>
            <p>${new Date(jnotes[i].date)}</p>
            <div>
                <button onclick="deleteNote(${jnotes[i].date})" style="display: none;" id="del-note"/> Delete</button> 
            </div>
            </div>`
        console.info(html)
    notesDOM.innerHTML += html
   
  }
  document.append(notesDOM)
}

function selectNote(noteElement){
    noteElement.querySelectorAll("button").forEach(element => {
        element.style.display = "";
    });
}

function unselectNote(noteElement){
    noteElement.querySelectorAll("button").forEach(element => {
        element.style.display = "none";
    });
}

function deleteNote(id){
    let jnotes = JSON.parse(localStorage.getItem("notes"));
    if(jnotes == null) return
    else for(i=0;i<jnotes.length;i++){
        if (jnotes[i].date == id) jnotes[i] = null;
    }

    localStorage.setItem("notes", JSON.stringify(jnotes));
    updatePage();
}
