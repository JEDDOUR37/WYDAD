/* BUTTON EFFECT */

const btn = document.querySelector(".btn");

btn.addEventListener("mouseenter", function(){

    btn.innerHTML = "WELCOME ❤️";

});

btn.addEventListener("mouseleave", function(){

    btn.innerHTML = "CLICK HERE";

});


/* HERO EFFECT */

const heroBox = document.querySelector(".hero-box");

document.addEventListener("mousemove", function(e){

    let x = (window.innerWidth / 2 - e.pageX) / 40;

    let y = (window.innerHeight / 2 - e.pageY) / 40;

    heroBox.style.transform =
    `rotateY(${x}deg) rotateX(${-y}deg)`;

});
/* BACKGROUND MOVE EFFECT */

const box = document.querySelector(".hero-box");

let position = 0;

setInterval(() => {

    position += 1;

    box.style.backgroundPosition =
    `${position}px ${position}px`;

},30);