let add = document.getElementById('add')
let input = document.getElementById('input')
let list = document.getElementById('list')
let edited = document.getElementById('edit_input')
let save_btn = document.getElementById('save_edit')
let edt = document.getElementById('for_edit')
    
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let edtid = null;
    
tasks.forEach(task => rendertask(task));
    
add.addEventListener('click', add_task)
input.addEventListener('keydown', (event) => {
    if(event.key == 'Enter'){
        event.preventDefault()
        add_task()
    }
})
    
function add_task(){
    let text = input.value.trim();
    if(text == ""){
        alert("You must Enter the task that need to be added.");
        return;
    }
    
    let dup = tasks.some(task => task.text.toLowerCase() == text.toLowerCase());
    if(dup){
        alert("The task is already there!");
        return;
    }
    
    let taskobj = {
        id : Date.now(),
        text : text,
        completed : false
    };
    
    tasks.push(taskobj);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    rendertask(taskobj);
    input.value = "";
}
    
function rendertask(taskobj){
    let task = document.createElement("p")
    task.style.display = "flex";
    task.style.justifyContent = "space-between"
    
    let span = document.createElement("span")
    span.textContent = taskobj.text;
    
    let btn = document.createElement("div")
    btn.style.display = "flex"
    btn.style.gap = "10px"
    
    let edit_btn = document.createElement("button")
    edit_btn.textContent = "Edit"
    edit_btn.style.backgroundColor = "black"
    edit_btn.style.border = "0"
    edit_btn.style.padding = "7px"
    edit_btn.style.color = "white"
    edit_btn.style.fontWeight = "600"
    edit_btn.style.borderRadius = "5px"
    edit_btn.style.cursor = "pointer"
    
    edit_btn.addEventListener("click", () => {
        edt.style.display = "block";
        edited.value = taskobj.text;
        edtid = taskobj.id;
    })
    
    let del_btn = document.createElement("button")
    del_btn.textContent = "Delete"
    del_btn.style.backgroundColor = "rgb(243, 15, 15)"
    del_btn.style.border = "0"
    del_btn.style.padding = "7px"
    del_btn.style.color = "white"
    del_btn.style.fontWeight = "600"
    del_btn.style.borderRadius = "5px"
    del_btn.style.cursor = "pointer"
    
    del_btn.addEventListener("click",() => {
        tasks = tasks.filter(t => t.id !== taskobj.id);
        localStorage.setItem("tasks",JSON.stringify(tasks))
        task.remove();
    })

    let comp_btn = document.createElement("button")
    comp_btn.textContent = "Done"
    comp_btn.style.backgroundColor = "rgb(69, 221, 39)"
    comp_btn.style.border = "0"
    comp_btn.style.padding = "7px"
    comp_btn.style.color = "white"
    comp_btn.style.fontWeight = "600"
    comp_btn.style.borderRadius = "5px"
    comp_btn.style.cursor = "pointer"

    if(taskobj.completed){
        span.style.textDecoration = "line-through";
        comp_btn.textContent = "Undone"
    }

    comp_btn.addEventListener("click", () => {
        taskobj.completed = !taskobj.completed;

        if(taskobj.completed){
            span.style.textDecoration = "line-through";
            comp_btn.textContent = "Undone";
        }else{
            span.style.textDecoration = "none";
            comp_btn.textContent = "Done"
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
    })


            
    btn.append(comp_btn) 
    btn.append(edit_btn)
    btn.append(del_btn)
    task.append(span)
    task.append(btn)
    list.append(task)
    
    list.style.boxShadow = '2px 2px 10px rgb(197, 194, 194)'
}
    
edited.addEventListener('keydown', (event) => {
    if(event.key == 'Enter'){
        event.preventDefault()
        save_edited_task()
     }
})

save_btn.addEventListener("click", save_edited_task);

function save_edited_task(){
    let new_text = edited.value.trim();
    
    if(new_text == ""){
        alert("Task cannot be empty");
        return;
    }
    
    let isdup = tasks.some(
        t => t.text.toLowerCase() === new_text.toLowerCase() && t.id !== edtid);
    
    if(isdup){
        alert("duplicate task found. You might already have one.")
        return;
    }
    
    let task = tasks.find(t => t.id === edtid);
    task.text = new_text;
    
    localStorage.setItem("tasks", JSON.stringify(tasks));

    list.innerHTML = "";
    tasks.forEach(rendertask);

    edt.style.display = "none";
    edited.value = "";
    edtid = null;
}
