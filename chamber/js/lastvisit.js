const lastVistSaved = localStorage.getItem("lastVisit")
if (lastVistSaved && lastVistSaved > 1 ) {
    const lastVisit = new Date(lastVistSaved)
    const todayDate = new Date()
    
    const differentTime = Math.abs(todayDate - lastVisit)
    const differentDays = Math.ceil(differentTime/ (1000 * 60 * 60 * 24))
    document.querySelector("#lastvisit").innerText = `Last visit: ${differentDays}`
} else {
    document.querySelector("#lastvisit").innerText = "This is your first visit!"
    const today = new Date()
    localStorage.setItem("lastVisit", today)
}