
const themeIcons = document.querySelectorAll(".theme-icon");
const body = document.querySelector("body");
const input = document.querySelector("input");
const listContainer = document.querySelector('.todo-list');

class TodoList {
    list = [];
    draggedItemIndex;

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

    toggleIsCompleted = function(id) {
        this.list[id].isCompleted = !this.list[id].isCompleted;
        this.render();
    }

    dragStart = function(id) {
        this.draggedItemIndex = id;
    }

    dragOver = function(id) {
        const elems = document.querySelectorAll(".todo-elem");
        elems.forEach(elem => elem.classList.remove("dragged-on"));
        document.getElementById(id).classList.add("dragged-on");
    }

    drop = function() {
        const elems = document.querySelectorAll(".todo-elem");
        let index;
        elems.forEach(elem => {
            elem.classList.contains("dragged-on") ? index = elem.id : elem
        });
        const item = this.list[this.draggedItemIndex];
        this.list.splice(this.draggedItemIndex, 1);
        this.list.splice(index, 0, item);

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
            `<div 
                class="todo-elem"
                id="${i}"
                draggable="true"

                onClick="todoList.toggleIsCompleted(${i})"
                ondragover="todoList.dragOver(${i})"
                ondragstart="todoList.dragStart(${i})"
                ondrop="todoList.drop()"
                >
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
        input.textContent = "";
    }
});

document.addEventListener("dragover", function(e) {
    e.preventDefault();
})