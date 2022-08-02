// anno footer sempre aggiornato
const annoEl = document.querySelector(".anno");
annoEl.textContent = new Date().getFullYear();



const headerEl = document.querySelector(".header");
const btnMobile = document.querySelector(".btn-mobile-nav");

///////////////////////////////////////////////////////////
//attivazione menu mobile
btnMobile.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
//smooth scrolling
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    //scroll to top
    if (href === "#") window.scrollTo({ top: 0, behavior: "smooth" });

    //scroll alle section
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    //chiudi menu mobile se clicco su link
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// STICKY NAV
const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  // console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/




/*  -----------------------------------------------------------------------------------------------*/
 /* ! GSAP */
/*--------------------------------------------------------------------------------------------------- */




// general


ScrollTrigger.batch(".fade-in", {
  start: "top 80%",
  // markers: true,
  onEnter: batch => {
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 1,
    });
  },
});






//hero section

let tlHero = gsap.timeline();

tlHero.from(".hero-fade-in", {delay: 0.5, duration: 1, opacity: 0, y: 50, stagger: 0.3, ease: "power3.out"})
.from(".hero-fade", {duration: 1, opacity:0, ease: "power3.out"})
.from(".delivered-imgs > img", {duration: 1 , y: 50, scale: 0.5, stagger:0.2, opacity: 0,ease: "back"}, "<")
.from(".hero-grow-img", {duration: 2, scale: 0.5, opacity: 0}, "0.5")


// how it works


// step 1
let tlStep1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".step1",
    start: "top 60%",
    // markers: true,
  }
});

tlStep1.to(".fade-in-step1", {opacity: 1, x: 0, duration: 2, ease: "power3.out",})
.to(".slide-right-step1", {opacity: 1, x: 0, duration: 2, ease: "power3.out",}, "0.5")



// step 2
let tlStep2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".step2",
    start: "top 60%",
    // markers: true,
  }
});

tlStep2.to(".fade-in-step2", {opacity: 1, x: 0, duration: 2, ease: "power3.out",})
.to(".slide-left-step", {opacity: 1, x: 0, duration: 2, ease: "power3.out",}, "0.5")




// step 3
let tlStep3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".step3",
    start: "top 60%",
    // markers: true,
  }
});

tlStep3.to(".fade-in-step3", {opacity: 1, x: 0, duration: 2, ease: "power3.out",})
.to(".slide-right-step2", {opacity: 1, x: 0, duration: 2, ease: "power3.out",}, "0.5")



//meals

gsap.from(".list-item > span, .list-icon", {
  x: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.08,
  scrollTrigger: {
    trigger: ".list",
    start: "top center",
    markers: true,
  } 
})

//testimonials

ScrollTrigger.batch(".gallery-item > img", {
  start: "top 80%",
  // markers: true,
  onEnter: batch => gsap.to(batch, {opacity: 1, stagger: 0.1}),
  // onEnterBack: batch => gsap.to(batch, {opacity: 1, stagger: 0.1}),
});


// ScrollTrigger.batch(".box", {
//   onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: 0.15, grid: [1, 3]}, overwrite: true}),
//   onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
//   onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
//   onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true})
// });




