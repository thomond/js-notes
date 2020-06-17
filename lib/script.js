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
  if (typeof(Storage) == "undefined"){
    console.error("No local storage support");
  }else{
    localStorage.setItem(localStorage.length, JSON.stringify(note));
  }  
  updatePage()

}

function updatePage(){
  // Get notes list from DOM
  let notesDOM = document.getElementById('notes');
  // load from local storage
  for (i = 0; i < localStorage.length; i++) {
     item = localStorage.getItem(String(i))
     if(Number.isInteger(parseInt(item)))
     {
       console.info("Element "+item)
       continue
     }else{// should be JSON
      item = JSON.parse(item);
      // update DOM
      let html = `<div>
          <h3>${item.title}</h3>
          <br/>
          <p>${item.body}</p> 
        </div>`
      console.info(html)
      
     }
  }
 
}
