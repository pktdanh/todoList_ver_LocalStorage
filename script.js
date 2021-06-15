const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".wrapper .footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value; //getting user entered
    // console.log(userData);
    if (userData.trim() != 0){
        addBtn.classList.add("active");
    } else{
        addBtn.classList.remove("active");
    }
}

showTasks();

addBtn.onclick = () => {
    let userData = inputBox.value; //getting user entered
    let getLocalStorage = localStorage.getItem("New Todo");//getting local storage
    if (getLocalStorage == null){
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage); // transforming json string into js obj
    }
    listArr.push(userData);//pushing or adding user;
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js obj into a json string
    showTasks();
    inputBox.value = "";
    addBtn.classList.remove("active");
}

function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");//getting local storage
    if (getLocalStorage == null){
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage); // transforming json string into js obj
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;
    if (listArr.length > 0){
        deleteAllBtn.classList.add("active");
    } else{
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = '';
    listArr.forEach((element,index) => {
        newLiTag += `<li>${element}<span onclick = "deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    
}

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");//getting local storage
    listArr = JSON.parse(getLocalStorage); // transforming json string into js obj
    listArr.splice(index,1); //delete or remove the particular indexed li 
    // after remove li again update the localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js obj into a json string
    showTasks();
}

// delete all tasks func
deleteAllBtn.onclick = () =>{
    listArr = []; // empty an array
    // after delete all tasks update the localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js obj into a json string
    showTasks();
   
}