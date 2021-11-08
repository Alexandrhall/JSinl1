window.onload = function () {
    createHTML();
    myList();
    cross();
    removeIt();
    document.getElementById("button").addEventListener("click", adinList);
    document.getElementById("inp").addEventListener("blur", blurIt);
    document.getElementById("saveBut").addEventListener("click", saveIt);
    document.querySelector("ul").addEventListener("click", checked);
    document.getElementById("sort").addEventListener("click", sortList);
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
    removeIt();
}

function myList() {
    let mylistUl = document.getElementById("myList");
    let button = document.createElement("button");
    button.innerHTML = "Sort name";
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
    for (let i = 0; i < list.length; i++) {
        console.log(list[i]);
    }
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
        e.target.classList.toggle("marked");
        console.log(e.target.className);

        list.classN = "checked";

        // for (let i = 0; i < list.length; i++) {
        //     if (list[e.target].classN === "checked") {
        //         list[e.target].classN = "checked";
        //     } else {
        //         list[e.target].classN = "task";
        //     }
        // }
    }
    false;
}

function removeIt() {
    let close = document.getElementsByClassName("close");

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            this.parentElement.remove();
        };
    }
}

function sortList() {
    let list, i, switching, b, shouldSwitch;
    list = document.getElementById("myList");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // start by saying: no switching is done:
        switching = false;
        b = list.getElementsByTagName("LI");
        // Loop through all list-items:
        for (i = 0; i < b.length - 1; i++) {
            // start by saying there should be no switching:
            shouldSwitch = false;
            /* check if the next item should
        switch place with the current item: */
            if (
                b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()
            ) {
                /* if next item is alphabetically
          lower than current item, mark as a switch
          and break the loop: */
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
        and mark the switch as done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
}
