const themeIcons = document.querySelectorAll(".theme-icon");
const body = document.querySelector("body");
const input = document.querySelector("input");
const listContainer = document.querySelector('.todo-list');

class TodoList {
    list = [];

    toggleTheme = function(e) {
        body.classList.toggle("light");
        body.classList.toggle("dark");
        themeIcons.forEach(icon => icon.classList.toggle("hidden"));
    }

    addItem = function(thingToDo, isCompleted) {
        const newItem = {thingToDo, isCompleted}
        this.list.push(newItem);
        this.render();
    }

    removeItem = function(itemIndex) {
        this.list.splice(itemIndex);
        this.render();
    }

    toggleIsCompleted = (i) => {
        this.list[i].isCompleted = !this.list[i].isCompleted;
        this.render();
    }

    reset = function() {
        this.list = [];
        this.render();
    }

    render = function(filter) {
        let html = "";
        this.list.forEach(({thingToDo, isCompleted}, i) => 
            html += 
            `<div class="todo-elem" id="${i}" onClick="todoList.toggleIsCompleted(${i})" draggable="true" ondragover="">
                <span class="icon ${isCompleted ? "checked-icon" : "unchecked-icon"}"></span>
                <p>${thingToDo}</p>
                <span class="clear-icon" onClick="removeItem(${i})"></span>
            </div>`
        )
        listContainer.innerHTML = html;
    }
};

const todoList = new TodoList();

themeIcons.forEach(icon => icon.addEventListener("click", todoList.toggleTheme));

input.addEventListener("keyup", function(e) {
    e.preventDefault();
    if ((e.key === 'Enter')) {
        todoList.addItem(e.target.value, false);
    }
});