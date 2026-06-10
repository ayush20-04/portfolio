/* =====================================
   SPLASH SCREEN
===================================== */

window.addEventListener("load", () => {

    const splash =
        document.getElementById("splash");

    setTimeout(() => {

        splash.classList.add("hide");

        setTimeout(() => {
            splash.style.display = "none";
        }, 700);

    }, 1800);

});

/* =====================================
   THEME TOGGLE
===================================== */

const themeBtn =
    document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {

    const html =
        document.documentElement;

    const currentTheme =
        html.getAttribute("data-theme");

    if (currentTheme === "dark") {

        html.setAttribute(
            "data-theme",
            "light"
        );

        themeBtn.textContent = "☀️";

        localStorage.setItem(
            "theme",
            "light"
        );

    } else {

        html.setAttribute(
            "data-theme",
            "dark"
        );

        themeBtn.textContent = "🌙";

        localStorage.setItem(
            "theme",
            "dark"
        );
    }

});

/* =====================================
   LOAD SAVED THEME
===================================== */

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme) {

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

    themeBtn.textContent =
        savedTheme === "dark"
            ? "🌙"
            : "☀️";
}

/* =====================================
   MOBILE MENU
===================================== */

const menuBtn =
    document.getElementById("menu-btn");

const mobileMenu =
    document.getElementById("mobile-menu");

const closeBtn =
    document.getElementById("close-btn");

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.add("active");

});

closeBtn.addEventListener("click", () => {

    mobileMenu.classList.remove("active");

});

document
.querySelectorAll(".mobile-menu a")
.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            mobileMenu.classList.remove(
                "active"
            );

        }
    );

});

/* =====================================
   TYPING ANIMATION
===================================== */

const roles = [

    "Frontend Developer",

    "React Developer",

    "UI Enthusiast",

    "Web Designer",

    "Content Creator"

];

const typingText =
    document.querySelector(
        ".typing-text"
    );

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole =
        roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(
                0,
                charIndex + 1
            );

        charIndex++;

        if (
            charIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(
                0,
                charIndex - 1
            );

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            roleIndex++;

            if (
                roleIndex >=
                roles.length
            ) {
                roleIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 60 : 120
    );

}

typeEffect();

/* =====================================
   REVEAL ON SCROLL
===================================== */

const revealElements =
    document.querySelectorAll(
        "section, .project-card, .service-card, .timeline-item, .stat"
    );

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "reveal",
                        "active"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );

revealElements.forEach(el => {

    revealObserver.observe(el);

});

/* =====================================
   ACTIVE NAVIGATION
===================================== */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );

window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 200;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollY >= sectionTop &&
                scrollY <
                sectionTop +
                sectionHeight
            ) {

                current =
                    section.getAttribute(
                        "id"
                    );
            }

        });

        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );

            if (
                link.getAttribute(
                    "href"
                ) === `#${current}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);

/* =====================================
   NAVBAR SCROLL EFFECT
===================================== */

const navbar =
    document.querySelector(
        ".navbar"
    );

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 50
        ) {

            navbar.style.padding =
                "15px 6%";

            navbar.style.boxShadow =
                "0 5px 20px rgba(0,0,0,.15)";

        } else {

            navbar.style.padding =
                "20px 6%";

            navbar.style.boxShadow =
                "none";

        }

    }
);

/* =====================================
   PARTICLE BACKGROUND
===================================== */

const canvas =
    document.getElementById(
        "bg-canvas"
    );

const ctx =
    canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

class Particle {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        this.radius =
            Math.random() * 2 + 1;

        this.speedX =
            Math.random() * 0.6 - 0.3;

        this.speedY =
            Math.random() * 0.6 - 0.3;
    }

    update() {

        this.x += this.speedX;

        this.y += this.speedY;

        if (
            this.x < 0 ||
            this.x > canvas.width
        ) {
            this.speedX *= -1;
        }

        if (
            this.y < 0 ||
            this.y > canvas.height
        ) {
            this.speedY *= -1;
        }

    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(0,229,255,.5)";

        ctx.fill();

    }

}

function createParticles() {

    particles = [];

    const count =
        window.innerWidth < 768
            ? 40
            : 80;

    for (
        let i = 0;
        i < count;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}

createParticles();

function connectParticles() {

    for (
        let a = 0;
        a < particles.length;
        a++
    ) {

        for (
            let b = a;
            b < particles.length;
            b++
        ) {

            const dx =
                particles[a].x -
                particles[b].x;

            const dy =
                particles[a].y -
                particles[b].y;

            const distance =
                dx * dx + dy * dy;

            if (
                distance <
                120 * 120
            ) {

                ctx.strokeStyle =
                    "rgba(0,229,255,.05)";

                ctx.lineWidth = 1;

                ctx.beginPath();

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {

        p.update();

        p.draw();

    });

    connectParticles();

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();

/* =====================================
   SMOOTH SCROLL
===================================== */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
        "click",
        function (e) {

            e.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute(
                        "href"
                    )
                );

            if (target) {

                target.scrollIntoView({

                    behavior:
                        "smooth"

                });

            }

        }
    );

});

/* =====================================
   PARALLAX HERO
===================================== */

window.addEventListener(
    "mousemove",
    e => {

        const image =
            document.querySelector(
                ".hero-image"
            );

        if (!image) return;

        const x =
            (window.innerWidth / 2 -
                e.pageX) /
            40;

        const y =
            (window.innerHeight / 2 -
                e.pageY) /
            40;

        image.style.transform =
            `translate(${x}px, ${y}px)`;

    }
);

console.log(
    "🚀 Portfolio Loaded Successfully"
);