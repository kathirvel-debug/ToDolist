let tasking=[];
const taskinput=document.getElementById("add")
const list=document.getElementById('list')
document.addEventListener('click',handleclick)
let count=document.getElementById("tasks-counter")
taskinput.addEventListener('keyup',inputGet);
console.log(count);
// ENTER KEY PRESS FUNCTION
function inputGet(e){
    if(e.key=="Enter"){
        const text=e.target.value;
        if(!text){
            showMsg("Please enter the task")
            return
        }  
        const inputTask={
            title:text,
            id:Date.now(),
            completed:false
        }
       
        e.target.value=''
        add(inputTask)
    }
    
}
// CLICK FUNCTION OF DOM
function handleclick(e){
        const target=e.target
    console.log(target);
    if(target.className=='custom-checkbox'){
        const taskid=target.id
        console.log(taskid);
        markTaskCompelete(taskid)
        return
    }
    else if(target.id=='delete'){
    const deleteid=target.dataset.id
    console.log(deleteid);
    deletetask(deleteid);
    return
    }
    else if(target.className=='Allcompleted'){
        console.log("hiii");
         marked();
         return
        
    }
    } 
//DOM 
function Dom(task){
    const li=document.createElement('li')
    li.innerHTML=`
    <input type="checkbox" id="${task.id}" data-id="12" ${task.completed ?'checked':" "}class="custom-checkbox">
    
    <label for="${task.id}">${task.title}</label>
    
  
    <i id="delete"  class="fa-solid fa-trash delete" data-id="${task.id}"></i>
  `

  list.appendChild(li);
  
}
//RENDERING LIST
function updatelist(){
list.innerHTML=''
console.log("hi");
count.innerHTML=tasking.length
for (let i=0;i<=tasking.length;i++){
    Dom(tasking[i])
}
}

// API CALL GET THE LIST 
 async function toDoList(){
   const todolist= await fetch('https://jsonplaceholder.typicode.com/todos/')
   const json=await todolist.json();
   tasking=json.slice(0,10)
   updatelist()
   console.log(json);
   console.log("hi");
}
toDoList();
// ADD THE TASK 
function add(task){
    if(task){
        tasking.push(task)
        updatelist();
        showMsg("ADDED the Task")
        
        return

    }

}
function showMsg(text){
alert(text)
}
// DELTEING TASK
function deletetask(deleteid){
    console.log(deleteid);
let newArray=tasking.filter(function(task){
    return task.id !==Number(deleteid)
})
tasking=newArray;
updatelist();
}
//marked
function marked(){
    let newArrays=tasking.filter(function(task){
        return task.completed ==false
    })
    tasking=newArrays
    updatelist();
    
}
//MARK IT OUT
function markTaskCompelete(taskId){
const firsttask=tasking.filter(function(task){
    return task.id==Number(taskId)
})
if(firsttask.length>0){
    let currentTask=firsttask[0];
    currentTask.completed=!currentTask.completed;
    showMsg("Toggle Task")
    return

}
showMsg("Could not Toggle Task")
}

