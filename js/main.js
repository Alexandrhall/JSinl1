window.onload = function () {
    createHTML();
    myList();
    document.getElementById("button").addEventListener("click", adinList);
    document.getElementById("inp").addEventListener("blur", blurIt);
};

let list = [];

function createHTML() {
    let input = document.createElement("input");
    input.className = "input";
    input.placeholder = "Write new..";
    input.type = "text";
    input.id = "inp";
    let headwrap = document.getElementById("headwrap");
    headwrap.appendChild(input);
    let button = document.createElement("button");
    button.innerHTML = "Add";
    button.id = "button";
    headwrap.appendChild(button);
    let saveBut = document.createElement("button");
    saveBut.innerHTML = "Save";
    headwrap.appendChild(saveBut);
}

function adinList() {
    let task = document.getElementById("inp").value;
    let mylistUl = document.getElementById("myList");

    let li = document.createElement("li");
    let v = document.createTextNode(task);
    new taskList(task);

    if (task == "") {
        alert("Write someting");
    }

    li.innerHTML = list[list.length - 1].task;
    mylistUl.appendChild(li);
}

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

function blurIt() {
    let inp = document.getElementById("inp");
    let button = document.getElementById("button");
    button.onclick = function () {
        inp.value = "";
    };
    setTimeout(function () {
        inp.value = "";
    }, 300);
}

class taskList {
    constructor(task) {
        this.task = task;
        list.push(this);
    }
}
