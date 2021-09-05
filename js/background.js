const images = [
  "0.jpg",
  "1.jpg",
  "2.jpg"
];
const chosenImage = images[Math.floor(Math.random() * images.length)];
const body = document.querySelector("body");
body.style.background = `url(img/${chosenImage})`;
// const image = document.createElement("img");
// image.src = `img/${chosenImage}`;
// document.body.appendChild(image);