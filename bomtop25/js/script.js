const listContainer = document.querySelector(".list")
const submitButton = document.querySelector("button")
const textInput = document.querySelector("#favchap")

function createElement() {
    let textValue = textInput.value
    if (textValue != ""){
        textInput.value = ""
        
        let liList = document.createElement("li")
        let spanList = document.createElement("span")
        let buttonList = document.createElement("button")
        
        spanList.textContent = textValue
        buttonList.textContent = "❌"
        buttonList.addEventListener("click", () => {
            liList.remove()
        })
        
        liList.appendChild(spanList)
        liList.appendChild(buttonList)
        
        listContainer.appendChild(liList)
        textInput.focus()
    } else {
        alert("Please enter the book name and the chapter.")
    }
}

submitButton.addEventListener("click", () => {
    createElement()
    console.log("clicked")
})