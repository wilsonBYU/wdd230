// Script to control the menu behavior
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
}

// Script to control if a message should display or not
const displayMessage = () => {
    let today = new Date()
    if ((today.getDay() !== 2) && (today.getDay() !== 4)) {
        document.querySelector("#announce").classList.toggle("anounceOpen")
        document.querySelector("#announce").classList.toggle("anounceClose")
    }
}

// Get the weather from an api and render it in the page
const getWeather = () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?id=3598132&units=metric&appid=2f4da8fb1f6d9955ed9fe6bd18c92e85")
        .then(response => response.json())
        .then(data => {
            const icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
            let weatherCity = document.querySelector("#weatherCity")
            let weatherTemperature = document.querySelector("#weatherTemperature")
            let description = document.querySelector("#description")
            let weatherIcon = document.querySelector("#weatherIcon")
            let windspeed = document.querySelector("#windspeed")
            let windChill = document.querySelector("#windChill")

            weatherIcon.setAttribute("src", icon)
            weatherCity.textContent = data.name
            weatherTemperature.textContent = `${data.main.temp}°c`
            description.textContent = data.weather[0].main
            windspeed.textContent = data.wind.speed
            windChill.textContent = calcWindChill(data.main.temp, data.wind.speed)
        })
} 

const calcWindChill = (degi, windi) => {
    const deg = parseFloat(degi)
    const wind = parseFloat(windi)
    if (deg <= 10 && wind > 3) {
        return `${13.12 + 0.6215*deg - 11.37 (wind^0.16) + 0.3965*deg (wind^0.16)}m/s`
    } else {
        return "N/A"
    }
}


//Modal handler
const modalContainer = document.querySelectorAll(".modalToggler")

modalContainer.forEach(element => {
    element.addEventListener("click", () => {
        document.querySelector(".memberModal").classList.toggle("hide")
    })
})

//Date to input
const addDate = () => {
    document.getElementById('#formLoadDate').defaultValue = Date().toDateInputValue();
}

//Controls the api call for the business info
const cardData = document.querySelector(".cardData")
const tableData = document.querySelector(".tableData")
const cardButton = document.querySelector("#viewCards")
const tableButton = document.querySelector("#viewTable")

const handleCards = () => {
    
    let jsonData
    let apiAddress = "https://wilsonbyu.github.io/wdd230/chamber/data/data.json"
    
    fetch(apiAddress)
    .then(res => res.json())
    .then(data => {
        updateCards(data)
        updateTable(data)
    })
}



const updateCards = (dataset) => {
    dataset.data.forEach(data => {
        const cardContainer = document.createElement("section")
        const cardImage = document.createElement("img")
        const cardName = document.createElement("h3")
        const cardAddress = document.createElement("p")
        const cardPhone = document.createElement("p")
        const cardWebsite = document.createElement("a")
        
        
        cardContainer.classList.add("cardContainer")
        cardImage.setAttribute("src", data.logo)
        cardName.textContent = data.name
        cardAddress.textContent = data.address
        cardPhone.textContent = data.phone
        cardWebsite.textContent = "Visit page"
        cardWebsite.setAttribute("href", data.website)
        
        cardContainer.append(cardImage, cardName, cardAddress, cardPhone, cardWebsite)
        cardData.appendChild(cardContainer)
    })
}

const updateTable = (dataset) => {
    const table = document.createElement("table")
    dataset.data.forEach(data => {
        const tr = document.createElement("tr")
        const nameTd = document.createElement("td")
        const addressTd = document.createElement("td")
        const phoneTd = document.createElement("td")
        const webUrl = document.createElement("a")
        const websiteTd = document.createElement("td")
        
        nameTd.textContent = data.name
        addressTd.textContent = data.address
        
        webUrl.setAttribute("href", data.website)
        webUrl.textContent = data.website
        websiteTd.appendChild(webUrl)
        phoneTd.textContent = data.phone
        
        tr.append(nameTd, addressTd, phoneTd, websiteTd)
        table.appendChild(tr)
        
    })
    tableData.appendChild(table)
}

const togleDirectoryCards = () => {
    cardData.classList.toggle("hidden")
    tableButton.classList.toggle("hidden")
}

const togleDirectoryTables = () => {
    cardButton.classList.toggle("hidden")
    tableData.classList.toggle("hidden")
}

const initialTogle = () => {
    if (window.innerWidth > 960) {
        togleDirectoryTables()
    } else {
        togleDirectoryCards()
    }
}

const toggle = () => {
    togleDirectoryCards()
    togleDirectoryTables()
}

const getRandomData = () => {
    let apiAddress = "https://wilsonbyu.github.io/wdd230/chamber/data/data.json"
    
    const random = (data) => {
        let randomNumber = Math.floor(Math.random() * data.length)
        return randomNumber
    } 
    
    const addInfo = (spotName, datas) => {
        const data = datas[0]
        const el = document.querySelector("#"+spotName)
        const img = document.createElement("img")
        img.setAttribute("src", data.logo)
        img.setAttribute("alt", data.name)
        
        const slogan = document.createElement("p")
        slogan.textContent = data.slogan
        
        const phone = document.createElement("p")
        phone.textContent = data.phone
        
        const address = document.createElement("p")
        address.textContent = data.address
        
        const website = document.createElement("a")
        website.setAttribute("href", data.website)
        website.textContent = "more info"
        
        el.appendChild(img)
        el.appendChild(slogan)
        el.appendChild(address)
        el.appendChild(phone)
        el.appendChild(website)
    }
    
    fetch(apiAddress)
    .then(res => res.json())
    .then(data => {
        const filtered = data.data.filter(buss => buss.status === "gold" || buss.status === "silver")
        const spot1 = filtered.splice(random(filtered), 1)
        const spot2 = filtered.splice(random(filtered), 1)
        const spot3 = filtered.splice(random(filtered), 1)
        addInfo("spotlight1", spot1)
        addInfo("spotlight2", spot2)
        addInfo("spotlight3", spot3)
        
    })
}