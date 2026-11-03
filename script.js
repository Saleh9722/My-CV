/* Contact Form */

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {
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

menuButton.addEventListener("click", function () {
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
});

/* Go To Top */

const topButton = document.getElementById("topButton");

topButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
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
  "image7.jpg",
];

let currentImage = 0;

const carouselImage = document.getElementById("carouselImage");

const nextButton = document.getElementById("nextButton");

const previousButton = document.getElementById("previousButton");

nextButton.addEventListener("click", function () {
  currentImage++;

  if (currentImage >= images.length) {
    currentImage = 0;
  }

  carouselImage.src = images[currentImage];
});

previousButton.addEventListener("click", function () {
  currentImage--;

  if (currentImage < 0) {
    currentImage = images.length - 1;
  }

  carouselImage.src = images[currentImage];
});

/* Clock - FetchAPI */

const CLOCK_TIMEZONE = "Asia/Tokyo"; // غيّرها لأي مدينة، مثل Asia/Riyadh

async function getCityTime(timezone) {
  // الـ API الأساسي
  try {
    const response = await fetch(
      "https://worldtimeapi.org/api/timezone/" + timezone,
    );
    if (response.ok) {
      const data = await response.json();
      return { zone: data.timezone, local: data.datetime.slice(0, 19) };
    }
  } catch (error) {
    console.log("First time API failed");
  }

  // الـ API الاحتياطي
  const response = await fetch(
    "https://timeapi.io/api/Time/current/zone?timeZone=" + timezone,
  );
  const data = await response.json();
  return { zone: data.timeZone, local: data.dateTime.slice(0, 19) };
}

async function startClock() {
  const cityElement = document.getElementById("clockCity");
  const timeElement = document.getElementById("clockTime");
  const dateElement = document.getElementById("clockDate");

  try {
    const result = await getCityTime(CLOCK_TIMEZONE);

    // اسم المدينة من الـ API
    cityElement.textContent = result.zone.split("/").pop().replace(/_/g, " ");

    // الوقت المحلي للمدينة، ونكمّل عليه كل ثانية
    const baseTime = Date.parse(result.local + "Z");
    const startedAt = performance.now();

    function tick() {
      const now = new Date(baseTime + (performance.now() - startedAt));

      timeElement.textContent = now.toLocaleTimeString("en-GB", {
        timeZone: "UTC",
      });

      dateElement.textContent = now.toLocaleDateString("en-GB", {
        timeZone: "UTC",
        weekday: "long",
        day: "numeric",
        month: "long",
      });
    }

    tick();
    setInterval(tick, 1000);
  } catch (error) {
    cityElement.textContent = "Time unavailable";
    dateElement.textContent = "Please reload the page.";
    console.error(error);
  }
}

startClock();
