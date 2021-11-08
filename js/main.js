window.onload = function () {
    createHTML();
    myList();
    cross();

    document.getElementById("button").addEventListener("click", adinList);
    document.getElementById("inp").addEventListener("blur", blurIt);
    document.getElementById("saveBut").addEventListener("click", saveIt);
    document.querySelector("ul").addEventListener("click", checked);
    document.getElementById("sort").addEventListener("click", sortList);
    // document.querySelector("span").addEventListener("click", removeIt);
    removeIt();
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
    saveBut.id = "saveBut";
    headwrap.appendChild(saveBut);
}

function adinList() {
    let task = document.getElementById("inp").value;
    let mylistUl = document.getElementById("myList");

    let li = document.createElement("li");
    new taskList(task, "task");

    if (task == "") {
        alert("Write someting");
    } else {
        li.innerHTML = list[list.length - 1].task;
        li.className = list[list.length - 1].classN;
        mylistUl.appendChild(li);
    }

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
}

function myList() {
    let mylistUl = document.getElementById("myList");
    let button = document.createElement("button");
    button.innerHTML = "Sort";
    button.id = "sort";
    mylistUl.appendChild(button);

    if ("tasks" in localStorage) {
        let listIt = localStorage.getItem("tasks");
        list = JSON.parse(listIt);
    } else {
        new taskList("Train", "task");
        new taskList("Make food", "task");
        new taskList("Have a walk", "task");
        new taskList("Code", "task");
    }
    for (let i = 0; i < list.length; i++) {
        let a = document.createElement("li");
        a.className = list[i].classN;
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
    constructor(task, classN) {
        this.task = task;
        this.classN = classN;
        list.push(this);
    }
}

function saveIt() {
    let task = JSON.stringify(list);
    localStorage.setItem("tasks", task);
}

function cross() {
    let myNodelist = document.getElementsByTagName("LI");
    let i;
    for (i = 0; i < myNodelist.length; i++) {
        let span = document.createElement("span");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }
}

function checked(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("task");
        e.target.classList.toggle("checked");
        for (let i = 0; i < list.length; i++) {
            if (list.classN === "checked") {
                list.classN = "checked";
            } else {
                list.classN = "task";
            }
        }
    }
    false;
}

function removeIt() {
    let close = document.getElementsByClassName("close");

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            // div.style.display = "none";
            // list.splice(list[list.length - 1].task);
            div.remove();
        };
    }
}

function sortList() {
    let mylistUl = document.getElementById("myList");
    for (let i = 0; i < list.length; i++) {
        let mylistText = list[i].task;
        console.log(mylistText[i].innerHTML);
    }
}

function compare(a, b) {
    if (a.last_nom < b.last_nom) {
        return -1;
    }
    if (a.last_nom > b.last_nom) {
        return 1;
    }
    return 0;
}

function sortera() {}
