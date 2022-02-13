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

const displayMessage = () => {
    let today = new Date()
    if ((today.getDay() !== 2) && (today.getDay() !== 4)) {
        document.querySelector("#announce").classList.toggle("anounceOpen")
        document.querySelector("#announce").classList.toggle("anounceClose")
    }
}

const getWeather = () => {
    fetch("https://fcc-weather-api.glitch.me/api/current?lat=14.628434&lon=-90.522713")
        .then(response => response.json())
        .then(data => {
            let weatherCity = document.querySelector("#weatherCity")
            let weatherTemperature = document.querySelector("#weatherTemperature")
            let description = document.querySelector("#description")
            let weatherIcon = document.querySelector("#weatherIcon")
            let windspeed = document.querySelector("#windspeed")
            let winddeg = document.querySelector("#winddeg")

            weatherIcon.setAttribute("src", data.weather[0].icon)
            weatherCity.textContent = data.name
            weatherTemperature.textContent = `${data.main.temp}°`
            description.textContent = data.weather[0].description
            windspeed.textContent = data.wind.speed
            winddeg.textContent = data.wind.deg

        })
} 