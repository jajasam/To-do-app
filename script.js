const themeIcons = document.querySelectorAll(".theme-icon");
const body = document.querySelector("body");
const input = document.querySelector("input");
const listContainer = document.querySelector('.todo-list');
const numItemsEl = document.getElementById("num-items");
const clearListEl = document.getElementById("clear-list");
const removeItem = document.querySelectorAll("remove-icon")

class TodoList {
    list = [
        {
            thingToDo: "Complete online JavaScript course",
            isCompleted: true
        },
        {
            thingToDo: "Jog around the park 3x",
            isCompleted: false
        },
        {
            thingToDo: "10 minutes meditation",
            isCompleted: false
        },
        {
            thingToDo: "Read for 1 hour",
            isCompleted: false
        },
        {
            thingToDo: "Pick up groceries",
            isCompleted: false
        },
        {
            thingToDo: "Complete Todo App on Frontend Mentor",
            isCompleted: false
        }
    ];
    draggedItemIndex;

    toggleTheme = function(e) {
        body.classList.toggle("light");
        body.classList.toggle("dark");
        themeIcons.forEach(icon => icon.classList.toggle("hidden"));
    }

    addItem = function(thingToDo, isCompleted) {
        const newItem = {thingToDo, isCompleted}
        this.list.unshift(newItem);
        this.render();
    }

    removeItem = function(itemIndex) {
        this.list.splice(itemIndex, 1);
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

    clearCompleted = function() {
        this.list = this.list.filter(elem => !elem.isCompleted);
        this.render();
    }

    render = function(filter) {
        let html = "";
        this.list.forEach(({thingToDo, isCompleted}, i) => 
            html += 
            `<div 
                class="todo-elem ${isCompleted ? "completed" : ""}"
                id="${i}"
                draggable="true"
                onClick="todoList.toggleIsCompleted(${i})"
                ondragover="todoList.dragOver(${i})"
                ondragstart="todoList.dragStart(${i})"
                ondrop="todoList.drop()"
                >
                    <span class="icon ${isCompleted ? "checked-icon" : "unchecked-icon"}"></span>
                    <p>${thingToDo}</p>
                    <span class="remove-icon" onClick="todoList.removeItem(${i})"></span>
            </div>`
        )
        listContainer.innerHTML = html;
        numItemsEl.textContent - `${this.list.length} items left`;
    }
};

const todoList = new TodoList();
todoList.render();

themeIcons.forEach(icon => icon.addEventListener("click", todoList.toggleTheme));

input.addEventListener("keyup", function(e) {
    e.preventDefault();
    if ((e.key === 'Enter')) {
        todoList.addItem(e.target.value, false);
        input.value = "";
    }
});

document.addEventListener("dragover", function(e) {
    e.preventDefault();
})

clearListEl.addEventListener("click", todoList.clearCompleted)