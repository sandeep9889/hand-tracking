var addBtn = document.getElementById('addNote');
showNotes() 

addBtn.addEventListener('click', () => {
    // let noteTitle = document.getElementById('noteTitle');
    let note = document.getElementById('noteText');
    let storage = localStorage.getItem('storage');
    // console.log(noteTitle.value);

    if (storage == null) {
        // titleObj = [];
        noteObj = [];
    }

    else {
        // titleObj = JSON.parse(noteTitle);
        noteObj = JSON.parse(storage);
    }

    // titleObj.push(noteTitle.value);
    noteObj.push(note.value);
    localStorage.setItem("storage", JSON.stringify(noteObj));
    note.value = '';
    showNotes();
})

function showNotes() {
    let storage = localStorage.getItem('storage');
   
    if (storage == null) {
        // titleObj = [];
        noteObj = [];
    }
    else {
        // titleObj = JSON.parse(noteTitle);
        noteObj = JSON.parse(storage);
    }

    html = `<h5 class="my-2">You can see or delete your notes here</h5>`
    
    noteObj.forEach(function(element, index){

        html += `
        <div class="col-sm-4 my-2" id="${index}">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">element${index}</h5>
                    <p class="card-text">${element}</p>
                    <button type="button" id="${index}" onclick=deleteNote(this.id) class="btn btn-primary deleteBtn">Delete Note</button>
                </div>
            </div>
        </div>              
        `;

    });
    let userNotes = document.getElementById('userNotes');
    
    if(!storage){
        localStorage.setItem("storage", JSON.stringify(noteObj));
    }

    if (storage.length == 0) {
        userNotes.innerHTML = html;
    }
    if (storage.length != 0) {
        userNotes.innerHTML = html;
    }
    
}

function deleteNote(index){

    document.getElementById(index).remove();
    noteObj.splice(index, 1);
    localStorage.setItem('storage', JSON.stringify(noteObj));
    console.log('removed', index)
    showNotes();
}

