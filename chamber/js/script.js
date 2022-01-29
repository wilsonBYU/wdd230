const menuButton = document.querySelector("#menuButton")
const menu = document.querySelector("#menu")

document.querySelector(".time").innerHTML = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
	new Date()
);

document.querySelector("#last-update").innerHTML = document.lastModified

const togleMenu = (event) => {
    menu.classList.toggle("open")
    if (menu.classList.contains("open")) {
        event.target.innerText = "\u2715"
    } else {
        event.target.innerText = "\u2630"
    }
    console.log(event.target)
} 