var addBtn = document.getElementById('addNote');
showNotes() 

addBtn.addEventListener('click', () => {
    let noteTitle = document.getElementById('noteTitle');
    let note = document.getElementById('noteText');
    let storage = localStorage.getItem('storage');

    showMsg();

    if (storage == null) {
        noteCont={
            'titleArr' : [],
            'noteArr' : []
       };
    }

    else {
        noteCont = JSON.parse(storage);
    }
    if (note.value!='' || noteTitle.value!=''){
    noteCont.titleArr.push(noteTitle.value);
    noteCont.noteArr.push(note.value);
    localStorage.setItem("storage", JSON.stringify(noteCont));
    note.value='';
    noteTitle.value='';
    showNotes();
    }
})

function showNotes() {
    let storage = localStorage.getItem('storage');
    let html = ` `;

    if (storage == null) {
        noteCont={
            'titleArr' : [],
            'noteArr' : []
       };
    }   
    else {
        noteCont = JSON.parse(storage);
    }  
    localStorage.setItem("storage", JSON.stringify(noteCont));

    noteCont.titleArr.forEach(function(element, index){
        const nelement = noteCont.noteArr[index]
        html += `
        <div class="col-sm-4 my-2" id="${index}">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${element}</h5>
                    <p class="card-text">${nelement}</p>
                    <button type="button" id="${index}"  onclick=deleteNote(this.id) class="btn btn-danger">Delete Note</button>
                </div>
            </div>
        </div>              
        `;

    });

    
    let userNotes = document.getElementById('userNotes');
    
    if(!storage){
        localStorage.setItem("storage", JSON.stringify(noteCont));
    }

    if (storage.length == 28) {
        html = `<h5 class="my-2">You can see or delete your notes here</h5>`;
        console.log("check")
    }
    if (storage.length != 0) {
        userNotes.innerHTML = html;
    }
    
}

function deleteNote(index){

    document.getElementById(index).remove();
    noteCont.titleArr.splice(index, 1);
    noteCont.noteArr.splice(index, 1);
    localStorage.setItem('storage', JSON.stringify(noteCont));
    console.log('removed', index)
    showNotes();
}

function showMsg(){
    let noteTitle = document.getElementById('noteTitle');
    let note = document.getElementById('noteText');
    let msgval = document.getElementById('warningmsg');
    let msg = ``;
    if (note.value=='' || noteTitle.value==''){
        msg = ` 
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <strong>Empty Fields!</strong> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `
    };
    msgval.innerHTML=msg;
}