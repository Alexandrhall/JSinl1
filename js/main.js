window.onload = function () {
    createHTML();
    myList();
    let button = document.getElementById("button");
    button.addEventListener("click", adinList);
};

let list = [];

function createHTML() {
    let input = document.createElement("input");
    input.className = "input";
    input.placeholder = "Write new..";
    let headwrap = document.getElementById("headwrap");
    headwrap.appendChild(input);
    let button = document.createElement("button");
    button.innerHTML = "Add";
    button.id = "button";
    headwrap.appendChild(button);
}

function adinList() {}

function myList() {
    let mylistUl = document.getElementById("myList");
    new taskList("Train");
    new taskList("Make food");
    new taskList("Have a walk");
    new taskList("Code");

    for (let i = 0; i < list.length; i++) {
        let a = document.createElement("li");
        a.innerHTML = list[i].task;
        mylistUl.appendChild(a);
    }
}

class taskList {
    constructor(task) {
        this.task = task;
        list.push(this);
    }
}
