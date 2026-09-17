/* Contact Form */

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.querySelector('input[name="name"]').value;
    let email = document.querySelector('input[name="email"]').value;
    let phone = document.querySelector('input[name="phone"]').value;
    let message = document.querySelector('textarea[name="message"]').value;


    /* Sanitize */

    name = name.trim();
    email = email.trim();
    phone = phone.trim();
    message = message.trim();


    /* Store Contact Data */

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("message", message);


    alert("Your message has been sent!");

});


/* Burger Menu */

const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", function() {

    if (menu.style.display === "flex") {

        menu.style.display = "none";

    } else {

        menu.style.display = "flex";

    }

});


/* Go To Top */

const topButton = document.getElementById("topButton");

topButton.addEventListener("click", function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* Website Visitors */

let visitors = localStorage.getItem("visitors");

if (visitors === null) {

    visitors = 1;

} else {

    visitors = Number(visitors) + 1;

}

localStorage.setItem("visitors", visitors);

document.getElementById("visitorCount").textContent = visitors;


/* Carousel */

const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg",
    "image6.jpg",
    "image7.jpg"
];

let currentImage = 0;

const carouselImage = document.getElementById("carouselImage");

const nextButton = document.getElementById("nextButton");

const previousButton = document.getElementById("previousButton");


nextButton.addEventListener("click", function() {

    currentImage++;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    carouselImage.src = images[currentImage];

});


previousButton.addEventListener("click", function() {

    currentImage--;

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    carouselImage.src = images[currentImage];

});