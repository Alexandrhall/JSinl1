window.onload = function () {
    createHTML();
};

function createHTML() {
    let input = document.createElement("input");
    input.className = "input";
    let headwrap = document.getElementById("headwrap");
    headwrap.appendChild(input);
}
