const iamgesToLoad = document.querySelectorAll("img[data-src]")

const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px -50px 0px"
}

const loadImages = (image) => {
    image.setAttribute("src", image.getAttribute("data-src"));
    image.onload = () => {image.removeAttribute("data-src")}
    image.classList.add("loaded")
}


const imgObserver = new IntersectionObserver((items, observer) => {
    items.forEach(item => {
        if (!item.isIntersecting) {
            return
        } else {
            loadImages(item.target)
            observer.unobserve(item.target)
        }
    })
}, imgOptions)

iamgesToLoad.forEach(image => {
    imgObserver.observe(image)
})