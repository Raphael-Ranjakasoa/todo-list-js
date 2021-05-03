
// Clear localStorage
// localStorage.clear();

// Selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list"); 
const filterOption = document.querySelector(".filter-todo");

//EventListener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Function
function addTodo(event){
    // Prevent form from submitting
    event.preventDefault();

    Create_Element(todoInput.value); 

    // Add todos to localStorage
    saveLocalTodos(todoInput.value);

    // Clear todoInput value
    todoInput.value = "";
}

function Create_Element(todo){
    // Create todo-div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Check mark button
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add('complete-btn');
    todoDiv.appendChild(completeBtn);

    // Check trash button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);

    // Append to list
    todoList.appendChild(todoDiv);
}

function deleteCheck(e){
    //console.log(e.target); 
    const item = e.target;

    // Delete todo
    if(item.classList[0] === 'trash-btn'){
        // Remove the parent of the item element
        const todo = item.parentElement;

        // Animation
        todo.classList.add('fall');

        //Remove localStorage
        removeLocalTodos(todo)

        //Remove the current element
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    // Check todo
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        let f = todo.classList.toggle('completed');
        console.log(f);
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;

    // Loop the todolists
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break; 
        }
    });
}

function saveLocalTodos(todo){
    // Check
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }   else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));       
}

function getTodos(){
    // Check
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        Create_Element(todo);
    });
}

function removeLocalTodos(todo){
    // Check
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1);
    localStorage.setItem("todos", JSON.stringify(todos)); 
}