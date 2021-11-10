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
    document.getElementById("saveBut").addEventListener("click", saveIt);
    document.getElementById("sort").addEventListener("click", sortList);
    document.getElementById("inp").addEventListener("keyup", (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            adinList().click;
            blurIt().click;
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
    let sortIt = document.createElement("button");
    let mainwrap = document.getElementById("mainwrap");
    sortIt.innerHTML = "Sort name";
    sortIt.id = "sort";
    mainwrap.appendChild(sortIt);
    let saveBut = document.createElement("button");
    saveBut.innerHTML = "Save";
    saveBut.id = "saveBut";
    headwrap.appendChild(saveBut);
    myList();
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
    myList();
}

function myList() {
    let mylistUl = document.getElementById("myList");

    mylistUl.innerHTML = "";

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

        mylistUl.appendChild(li);

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
    for (let i = 0; i < list.length; i++) {
        console.log(list[i]);
    }
}

function checked(i) {
    if (list[i].classN === "task") {
        list[i] = {
            task: list[i].task,
            classN: "checked",
        };
    } else {
        list[i] = {
            task: list[i].task,
            classN: "task",
        };
    }
    myList();
}

function removeIt(i) {
    list.splice(i, 1);
    myList();
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

// array.sort(function (a, b) {
//     // Turn your strings into dates, and then subtract them
//     // to get a value that is either negative, positive, or zero.
//     return new Date(b.date) - new Date(a.date);
// });

// array.sort(function (o1, o2) {
//     if (sort_o1_before_o2) return -1;
//     else if (sort_o1_after_o2) return 1;
//     else return 0;
// });

// function sortList(o1, o2) {
//     if (sort_o1_before_o2) return -1;
//     else if (sort_o1_after_o2) return 1;
//     else return 0;
// }
