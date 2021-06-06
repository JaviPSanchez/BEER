"use strict";

const carouselSlide = document.querySelector(".carousel-slide");
console.log(carouselSlide);
const carouselImages = document.querySelectorAll(".carousel-slide img");
console.log(carouselImages);
//Buttons
const prevBtn = document.querySelector(".slider__btn--left");
const nextBtn = document.querySelector(".slider__btn--right");
//Dots
const dotContainer = document.querySelector(".dots");

// Counter --> Para saber en que slide estamos
let counter = 1; //Empezamos en la primera imagen
// const size = carouselImages[0].clientWidth; //Para saber el ancho
// Podriamos haber usado:
let size = carouselImages[0].getBoundingClientRect().width;

console.log(size); //750px o el que sea en ese momento
// console.log(size2); //750px o el que sea en ese momento

carouselSlide.style.transform = `translateX(${-size * counter}px)`; //Para mover hacia la izquierda 750 px la primera imagen y quitarla de enmedio! Empezamos por la imagen original, no su clon!

//Button listeners

//Next Button
const nextSlide = function () {
  if (counter > carouselImages.length - 2) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter++; // Añadimos uno, o sea, estamos en 2 ahora.
  console.log(counter); //Al hacer click sobre el boton obtendremos 2 3 4 5 6 7 8 9 etc...
  carouselSlide.style.transform = `translateX(${-size * counter}px)`; //Cada vez que pulsemos el boton nos desplazamos hacia la derecha 750px
  activateDot(counter);
};

const prevSlide = function () {
  if (counter <= 0) return; //Evitar el bug de dar muchos clicks no dando tiempo al EVENT LISTENER transitionend a ejecutarse, cuando llegue a 0 se sale!
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter--; // quitamos uno, o sea, estamos en 2 ahora.
  console.log(counter); //Al hacer click sobre el boton obtendremos 0 -1 -2 -3 -4 -5 -6...
  carouselSlide.style.transform = `translateX(${-size * counter}px)`; //Cada vez que pulsemos el boton nos desplazamos hacia la izwuierda 750px!
  activateDot(counter);
};

carouselSlide.addEventListener("transitionend", () => {
  // console.log("Fired"); //Cada vez que realizamos una transicion y esta termina, se ejecuta este event listener!!
  console.log(carouselImages[counter]); // Nos dira que imagen esta activa
  // console.log(carouselImages.length); //7
  if (carouselImages[counter].id === "lastClone") {
    // Queremos que para cada imagen especifica, es decir, carouselImages[counter], si el id es "lastClone" quitamos el efecto de transicion y queremos que salte ademas a la imagen original del final sin hacer el efecto de transicion!
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - 2; // 5 , queremos estar en la diapo numero 4
    carouselSlide.style.transform = `translateX(${-size * counter}px)`; //Realiza el traslado de -size y el counter de 5
  }
  if (carouselImages[counter].id === "firstClone") {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - counter; // 7 - 5 = 2
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  }
});

// Creating the dots
const createDots = function () {
  for (let i = 0; i < carouselImages.length - 2; i++) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i + 1}"></button>`
    );
  }
};

const activateDot = function (slide) {
  if (slide > carouselImages.length - 2) slide = 1; // if 1 > 3 haz slide = 1
  if (slide < 1) slide = carouselImages.length - 2; // if 1 < 1 haz slide = 3
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const init1 = function () {
  createDots();
  activateDot(1); //Con esto seleccionamos el boton, 1 2 3 4 5
};
init1();

// Move the slides with the keyboard arrows

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

document.addEventListener("keydown", (event) => {
  // console.log(event.key);
  if (event.key === "ArrowLeft") prevSlide();
  if (event.key === "ArrowRight") nextSlide();
});

// dotContainer Listener
dotContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("dots__dot")) {
    const slideIndex = event.target.dataset.slide;
    goToSlide(slideIndex);
    activateDot(slideIndex);
  }
});

const goToSlide = function (slide) {
  if (counter >= carouselImages.length - 1) return;
  counter = slide;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
};
