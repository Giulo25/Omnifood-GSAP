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

/*  -----------------------------------------------------------------------------------------------*/
/* ! GSAP */
/*--------------------------------------------------------------------------------------------------- */

// general

//test per rendere fade in ripetibile al onEnterBack
// let fadeIn = gsap.to(".fade-in", {opacity: 1,y: 0,stagger: 0.15,duration: 1,});

// ScrollTrigger.batch(".fade-in", {
//   start: "top 80%",
//   end: "top 100%",
//   markers: true,
//   onEnter: () => { fadeIn.play()},
//   onEnterBack: () => { fadeIn.reset()}
//   },
// );

// back-up fade-in
ScrollTrigger.batch(".fade-in", {
	start: "top 80%",
	onEnter: (batch) => {
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

tlHero
	.from(".hero-fade-in", {
		delay: 0.5,
		duration: 1,
		opacity: 0,
		y: 50,
		stagger: 0.3,
		ease: "power3.out",
	})
	.from(".hero-fade", { duration: 1, opacity: 0, ease: "power3.out" })
	.from(
		".delivered-imgs > img",
		{ duration: 1, y: 50, scale: 0.5, stagger: 0.2, opacity: 0, ease: "back" },
		"<"
	)
	.from(".hero-grow-img", { duration: 2, scale: 0.5, opacity: 0 }, "0.5");

// how it works

// step 1
let tlStep1 = gsap.timeline({
	scrollTrigger: {
		trigger: ".step1",
		start: "top 60%",
		// markers: true,
	},
});

tlStep1
	.to(".fade-in-step1", { opacity: 1, x: 0, duration: 2, ease: "power3.out" })
	.to(
		".slide-right-step1",
		{ opacity: 1, x: 0, duration: 2, ease: "power3.out" },
		"0.2"
	);

// step 2
let tlStep2 = gsap.timeline({
	scrollTrigger: {
		trigger: ".step2",
		start: "top 60%",
		// markers: true,
	},
});

tlStep2
	.to(".fade-in-step2", { opacity: 1, x: 0, duration: 2, ease: "power3.out" })
	.to(
		".slide-left-step",
		{ opacity: 1, x: 0, duration: 2, ease: "power3.out" },
		"0.2"
	);

// step 3
let tlStep3 = gsap.timeline({
	scrollTrigger: {
		trigger: ".step3",
		start: "top 60%",
		// markers: true,
	},
});

tlStep3
	.to(".fade-in-step3", { opacity: 1, x: 0, duration: 2, ease: "power3.out" })
	.to(
		".slide-right-step2",
		{ opacity: 1, x: 0, duration: 2, ease: "power3.out" },
		"0.2"
	);

//meals

// da rivedere triggera anche schede prezzo
gsap.from(".list-item > span, .list-icon", {
	x: 80,
	opacity: 0,
	duration: 1,
	stagger: 0.1,
	scrollTrigger: {
		trigger: ".list",
		start: "top 70%",
		toggleActions: "play none none reset",
		// markers: true,
	},
});

//testimonials

ScrollTrigger.batch(".gallery-item > img", {
	start: "top 80%",
	// markers: true,
	onEnter: (batch) => gsap.to(batch, { opacity: 1, stagger: 0.1 }),
});

// price

let features = gsap.timeline({
	scrollTrigger: {
		trigger: ".feature",
		start: "top 75%",
		toggleActions: "play none none reset",
		 markers: true,
		 scrub: true,
	},
});

features
	.from(".feature-icon", {
		duration: 1.5,
		stagger: 0.2,
		xPercent: 200,
		opacity: 0,
		ease: "power3.out",
	})
	.from(
		".feature-title",
		{ duration: 1.5, stagger: 0.2, y: 80, opacity: 0, ease: "power3.out" },
		0
	)
	.from(
		".feature-text",
		{ duration: 1.5, stagger: 0.2, y: 150, opacity: 0, ease: "power3.out" },
		0
	);
