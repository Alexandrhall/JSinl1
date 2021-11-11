class taskList {
    constructor(task, classN) {
        let date = new Date();
        this.task = task;
        this.classN = classN;
        this.date = date;
        list.push(this);
    }
}

window.onload = function () {
    createHTML();
    document.getElementById("button").addEventListener("click", adinList);
    document.getElementById("inp").addEventListener("blur", blurIt);
    document.getElementById("sort").addEventListener("click", sortList);
    document.getElementById("dateSort").addEventListener("click", dateList);
    document.getElementById("inp").addEventListener("keyup", (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            adinList();
        }
    });
};

let list = [];
if ("tasks" in localStorage) {
    let listIt = localStorage.getItem("tasks");
    list = JSON.parse(listIt);
} else {
    new taskList("Train", "task");
    new taskList("Make food", "task");
    new taskList("Have a walk", "task");
    new taskList("Code", "task");
    saveIt();
}

function createHTML() {
    let input = document.createElement("input");
    input.className = "input" + " form-control";
    input.placeholder = "Write new..";
    input.type = "text";
    input.id = "inp";
    let headwrap = document.getElementById("headwrap");
    headwrap.appendChild(input);
    let button = document.createElement("button");
    button.innerHTML = "Add";
    button.id = "button";
    headwrap.appendChild(button);
    myList();
}

function adinList() {
    let task = document.getElementById("inp").value;
    let mylistUl = document.getElementById("myList");

    let li = document.createElement("li");

    if (task == "") {
        alert("Write someting");
    } else {
        new taskList(task, "task");
        li.innerHTML = list[list.length - 1].task;
        li.className = list[list.length - 1].classN;
        mylistUl.appendChild(li);
        saveIt();
    }
    myList();
}

function myList() {
    let mylistUl = document.getElementById("myList");
    let doneListUl = document.getElementById("doneList");

    mylistUl.innerHTML = "";
    doneListUl.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
        let li = document.createElement("li");
        let p = document.createElement("p");
        li.className = list[i].classN;
        p.innerHTML = list[i].task;
        li.appendChild(p);

        let span = document.createElement("span");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        span.addEventListener("click", () => {
            removeIt(i);
        });

        if (list[i].classN === "task") {
            mylistUl.appendChild(li);
        } else {
            doneListUl.append(li);
        }

        p.addEventListener("click", () => {
            checked(i);
        });
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

function saveIt() {
    let task = JSON.stringify(list);
    localStorage.setItem("tasks", task);
}

function checked(i) {
    if (list[i].classN === "task") {
        list[i] = {
            task: list[i].task,
            classN: "checked",
            date: list[i].date,
        };
    } else {
        list[i] = {
            task: list[i].task,
            classN: "task",
            date: list[i].date,
        };
    }
    saveIt();
    myList();
}

function removeIt(i) {
    list.splice(i, 1);
    saveIt();
    myList();
}

function sortList() {
    list.sort(function (a, b) {
        let nameA = a.task.toUpperCase();
        let nameB = b.task.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    myList();
}

function dateList() {
    list.sort(function (a, b) {
        let nameA = a.date;
        let nameB = b.date;
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    myList();
}
