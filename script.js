const themeIcons = document.querySelectorAll(".theme-icon");
const body = document.querySelector("body");
const input = document.querySelector("input");
const listContainer = document.querySelector('.todo-list');
const numItemsEl = document.getElementById("num-items");
const clearListEl = document.getElementById("clear-list");
const filters = document.querySelectorAll(".filter");

let list = [
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

let draggedItemIndex;

function toggleTheme() {
    body.classList.toggle("light");
    body.classList.toggle("dark");
    themeIcons.forEach(icon => icon.classList.toggle("hidden"));
};

function addItem (thingToDo, isCompleted) {
    const newItem = {thingToDo, isCompleted};
    list.unshift(newItem);
    render();
};

function removeItem (itemIndex) {
    list.splice(itemIndex, 1);
    render();
};

function toggleIsCompleted (id) {
    list[id].isCompleted = !list[id].isCompleted;
    render();
};

function dragStart (id) {
    draggedItemIndex = id;
};

function dragOver(id) {
    const elems = document.querySelectorAll(".todo-elem");
    elems.forEach(elem => elem.classList.remove("dragged-on"));
    document.getElementById(id).classList.add("dragged-on");
};

function drop() {
    const elems = document.querySelectorAll(".todo-elem");
    let index;
    elems.forEach(elem => {
        elem.classList.contains("dragged-on") ? index = elem.id : elem
    });
    const item = list[draggedItemIndex];
    list.splice(draggedItemIndex, 1);
    list.splice(index, 0, item);

    render();
};

clearCompleted = function() {
    list = list.filter(elem => !elem.isCompleted);
    
    render();
};

function render (filter = "all") {
    let listToRender;
    if (filter === "active") {
        listToRender = list.filter(elem => !elem.isCompleted);
    } else if (filter === "completed") {
        listToRender = list.filter(elem => elem.isCompleted);
    } else {
        listToRender = list;
    }
    filters.forEach(el => el.id === filter ? el.classList.add("current") : el.classList.remove("current"));

    let html = "";
    listToRender.forEach(({thingToDo, isCompleted}, i) => 
        html += 
        `<div 
            class="todo-elem ${isCompleted ? "completed" : ""}"
            id="${i}"
            draggable="true"
            ondragover="dragOver(${i})"
            ondragstart="dragStart(${i})"
            ondrop="drop()"
            >
                <span class="icon ${isCompleted ? "checked-icon" : "unchecked-icon"}" onclick="toggleIsCompleted(${i})"
                ></span>
                <p onclick="toggleIsCompleted(${i})"
                >${thingToDo}</p>
                <span class="remove-icon" onClick="removeItem(${i})"></span>
        </div>`
    )
    listContainer.innerHTML = html;
    numItemsEl.innerHTML = `${list.length} items left`;
};

render();

clearListEl.addEventListener("click", clearCompleted);
themeIcons.forEach(icon => icon.addEventListener("click", toggleTheme));
document.addEventListener("dragover", (e) => e.preventDefault());
filters.forEach(filter => filter.addEventListener("click", () => render(filter.id)));
input.addEventListener("keyup", function(e) {
    e.preventDefault();
    if ((e.key === 'Enter')) {
        addItem(e.target.value, false);
        input.value = "";
    }
});