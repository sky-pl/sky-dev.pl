const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2;
        this.opacity = Math.random();
        this.speed = Math.random() * 0.02;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.opacity += this.speed;
        if (this.opacity > 1 || this.opacity < 0) {
            this.speed *= -1;
        }
    }
}

function createStars(count) {
    stars.length = 0; // Reset array to avoid growing unnecessarily
    for (let i = 0; i < count; i++) {
        stars.push(new Star());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

createStars(150);
animate();

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".menu-container a");

    function updateActiveLink() {
        let index = sections.length;

        while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

        navLinks.forEach(link => link.classList.remove("active"));
        navLinks[index]?.classList.add("active"); // Optional chaining to prevent errors if no index matches
    }

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink);
});
document.addEventListener("DOMContentLoaded", () => {
    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink);
});

function updateActiveLink() {
    // Zdobądź obecny URL
    const currentUrl = window.location.pathname;

    // Znajdź wszystkie linki w menu
    const menuLinks = document.querySelectorAll('.menu-container a');

    // Usuń klasę 'active' z każdego linku
    menuLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Dodaj klasę 'active' do linku, który pasuje do bieżącego URL
    menuLinks.forEach(link => {
        if (currentUrl.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}
