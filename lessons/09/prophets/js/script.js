const requestURL = "https://byui-cit230.github.io/canvas-referenced/latter-day-prophets.json"
const cards = document.querySelector(".cards")
var prophets = []

fetch(requestURL)
    .then(response => {
        return response.json()
    })
    .then(jsonObject => {
        prophets = jsonObject["prophets"]
        prophets.forEach(displayProphets)
    })
    
console.log(prophets)
    
const displayProphets = (prophet) => {
    let card = document.createElement("section")
    let h2 = document.createElement("h2")
    let portrait = document.createElement("img")
    let dateOfBirth = document.createElement("p")
    let placeOfBirth = document.createElement("p")
    
    h2.textContent = `${prophet.name} ${prophet.lastname}`
    
    dateOfBirth.textContent = `Date of birth: ${prophet.birthdate}`
    placeOfBirth.textContent = `Place of birth: ${prophet.birthplace}`
    
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order} Latter-day President`)
    portrait.setAttribute("loading", "lazy")
    
    card.appendChild(h2)
    card.appendChild(dateOfBirth)
    card.appendChild(placeOfBirth)
    card.appendChild(portrait)
    
    cards.appendChild(card)
    
}



