// DOM
const inputTodo = document.getElementById('input');
const btn_addTodo = document.getElementById('addTodo');
const divTodos = document.getElementById('todos');
let todos = JSON.parse(localStorage.getItem("todos"));

// Changeur de Thème
const html = document.getElementsByTagName('html')[0];
const switchThemeBtn = document.getElementById('switchTheme');

switchThemeBtn.addEventListener('click', () => {
    html.classList.toggle('sombre');

    if(html.classList.contains('sombre')) {
        switchThemeBtn.innerHTML= '<ion-icon name="sunny"></ion-icon>';
    }
    else {
        switchThemeBtn.innerHTML = '<ion-icon name="moon"></ion-icon>';
    }
})

if (todos) {
    todos.forEach((todo) => {
        genTodo(todo);
    });
}

// génère un todo
function genTodo(todo) {

    let todoText;

    if(todo)
    {
        todoText = todo.text;
    } else{
        todoText = inputTodo.value;
        if(todoText == "")
        {
            return;
        }
    }
    
    var divTodo = document.createElement('div')

    if(todo && todo.completed) {
        divTodo.classList.add('todo-done');
    }

    divTodo.innerText = todoText;

    divTodo.classList.add('todo-style');

    divTodo.appendChild(createDeleteBtn())

    divTodos.appendChild(divTodo);

    inputTodo.value = "";

    updateLS();

    // au click sur le paragraphe il se faire barrer
    divTodo.addEventListener('click', function() {
        if(divTodo.classList == 'todo-style' ){
            divTodo.classList.add('todo-done');
            updateLS();
        } else {
            divTodo.classList.remove('todo-done');
            updateLS();
        }
    })

    // génère un bouton supprimer
    function createDeleteBtn() {
        let deleteButton = document.createElement('div');

        deleteButton.classList.add('btn');

        deleteButton.innerHTML = '<ion-icon name="trash" id="trash"></ion-icon>';
    
        deleteButton.addEventListener('click', function() {
            divTodo.remove();
            updateLS();
        })
        return deleteButton;
    }
}
btn_addTodo.addEventListener('click', () => {
    genTodo();
})

// fonction pour gérer le localStorage 
function updateLS() {
    const todosEl = document.querySelectorAll(".todo-style");

    const todosARRAY = [];

    todosEl.forEach((todoEl) => {
        todosARRAY.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("todo-done"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todosARRAY));
}

// Permet de génerer un todo lorsque l'utilisateur appuie sur entrer
document.addEventListener("keyup", (event) => {
    if (event.key === 'Enter') {
        if(inputTodo.value)
        {
            genTodo();
        };
    }
});