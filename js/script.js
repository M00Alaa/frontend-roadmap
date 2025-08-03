const steps = [
    {
        title: "HTML & CSS Basics", level: "Beginner", illustration: "🌐",
        resources: [
            { name: "Elzero HTML Course", url: "https://www.youtube.com/playlist?list=PLDoPjvoNmBAw_t_XWUFbBX-c9MafPk9ji" },
            { name: "Elzero CSS Course", url: "https://www.youtube.com/playlist?list=PLDoPjvoNmBAzAeIcXA3_JsmSkPKOs9W-Y" },
            { name: "W3Schools HTML", url: "https://www.w3schools.com/html/" }
        ],
        projects: ["Personal portfolio page", "Product card grid layout"]
    },
    {
        title: "SASS & Bootstrap", level: "Beginner", illustration: "🎨",
        resources: [
            { name: "Elzero SASS Course", url: "https://www.youtube.com/playlist?list=PLDoPjvoNmBAzlpyFHOaB3b-eubmF0TAV2" },
            { name: "Elzero Bootstrap 5 Course", url: "https://www.youtube.com/playlist?list=PLDoPjvoNmBAyvm7f--dc6XqkpfDcen_vQ" },
            { name: "W3Schools Bootstrap", url: "https://www.w3schools.com/bootstrap5/" }
        ],
        projects: ["Landing page using Bootstrap & SASS", "Multi-section business website"]
    },
    {
        title: "JavaScript (ES6)", level: "Intermediate", illustration: "⚡",
        resources: [
            { name: "Elzero JavaScript Course", url: "https://www.youtube.com/playlist?list=PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv" },
            { name: "W3Schools JavaScript", url: "https://www.w3schools.com/js/" }
        ],
        projects: ["Interactive to-do list", "Image slider with navigation"]
    },
    {
        title: "jQuery", level: "Intermediate", illustration: "🧩",
        resources: [
            { name: "Elzero jQuery Crash Course", url: "https://www.youtube.com/playlist?list=PLDoPjvoNmBAz0_Ujf9ZB9KceUzzSVYDci" },
            { name: "W3Schools jQuery", url: "https://www.w3schools.com/jquery/" }
        ],
        projects: ["jQuery form validator", "Dynamic FAQ accordion"]
    },
    {
        title: "TypeScript", level: "Intermediate", illustration: "📘",
        resources: [
            { name: "Elzero TypeScript Course", url: "https://www.youtube.com/playlist?list=PLDoPjvoNmBAzLyvrWPwMw6bbBlTwPxgLF" },
            { name: "W3Schools TypeScript", url: "https://www.w3schools.com/typescript/" }
        ],
        projects: ["Console-based student management system", "Simple task manager"]
    },
    {
        title: "Angular + NG Bootstrap + NG ZORRO", level: "Advanced", illustration: "🚀",
        resources: [
            { name: "Angular ", url: "https://www.youtube.com/playlist?list=PLkzso0fG0dbCIot9jtVReV-126k6fd6tu" },
            { name: "NG Bootstrap Docs", url: "https://ng-bootstrap.github.io/" },
            { name: "NG Zorro Docs", url: "https://ng.ant.design/docs/introduce/en" }
        ],
        projects: ["Blog app with CRUD", "Admin dashboard with authentication & state management"]
    }
];

let completedSteps = JSON.parse(localStorage.getItem("completedSteps") || "[]");

// Render Steps
function renderSteps() {
    const container = $("#steps-container");
    container.html("");
    steps.forEach((step, i) => {
        const locked = i > 0 && !completedSteps.includes(i - 1);
        let resourcesHTML = step.resources.map(r => `<li><a href="${r.url}" target="_blank">${r.name}</a></li>`).join("");
        let projectsHTML = step.projects.map(p => `<li>${p}</li>`).join("");
        container.append(`
      <div class="roadmap-card ${locked ? "locked" : ""}" data-index="${i}">
        <div class="step-title">${step.illustration} ${step.title} <span class="badge">${step.level}</span></div>
        <div class="resources"><h6>📚 Arabic Resources:</h6><ul>${resourcesHTML}</ul></div>
        <div class="projects"><h6>🛠 Mini-Projects:</h6><ul>${projectsHTML}</ul></div>
${completedSteps.includes(i)
                ? `<button class="btn btn-secondary completed-btn mt-3" disabled>✓ Completed</button>`
                : `<button class="btn btn-success mark-complete mt-3" ${locked ? "disabled" : ""}>Mark as Complete</button>`}
      </div>
    `);
    });
}
renderSteps();

function updateProgress() {
    const percent = Math.floor((completedSteps.length / steps.length) * 100);
    $("#progress-bar").css("width", `${percent}%`).text(`${percent}%`);
    // if (percent === 100) {
    //     const modal = new bootstrap.Modal(document.getElementById('certificateModal'));
    //     modal.show();
    // }
}
updateProgress();

$(document).on("click", ".mark-complete", function () {
    const index = $(this).closest(".roadmap-card").data("index");
    if (!completedSteps.includes(index)) {
        completedSteps.push(index);
        localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
        renderSteps();
        updateProgress();
        launchConfetti();
        Swal.fire({
            title: '🎉 Step Completed!',
            text: `Great job! You finished: ${steps[index].title}`,
            icon: 'success',
            confirmButtonText: 'Continue',
            background: '#1e1e2f',
            color: '#fff',
            confirmButtonColor: '#00f2fe'
        });
    }
});


function resizeQuestPath() {
    const path = document.getElementById("quest-line");
    const container = document.getElementById("steps-container");
    const height = container.scrollHeight + 200;
    path.setAttribute("d", `M150 0 L150 ${height}`);
}
window.addEventListener("resize", resizeQuestPath);
resizeQuestPath();

document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty("--x", `${x}%`);
    document.body.style.setProperty("--y", `${y}%`);
});



// Step Completion
$(document).on("click", ".mark-complete", function () {
    const index = $(this).closest(".roadmap-card").data("index");
    if (!completedSteps.includes(index)) {
        completedSteps.push(index);
        localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
        renderSteps();
        updateProgress();
        launchConfetti();
    }
});

// Confetti
function launchConfetti() {
    const duration = 1000;
    const end = Date.now() + duration;
    (function frame() {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.top = "-10px";
        confetti.style.width = "8px";
        confetti.style.height = "8px";
        confetti.style.background = `hsl(${Math.random() * 360},100%,50%)`;
        confetti.style.borderRadius = "50%";
        document.body.appendChild(confetti);
        setTimeout(() => document.body.removeChild(confetti), 2000);
        if (Date.now() < end) requestAnimationFrame(frame);
    })();
}

// Certificate
$("#downloadCert").click(() => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const name = $("#certName").val() || "Frontend Hero";
    doc.setFontSize(22);
    doc.text("Frontend Quest Completion Certificate", 20, 30);
    doc.setFontSize(16);
    doc.text(`Awarded to: ${name}`, 20, 60);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 80);
    doc.text("Congratulations on completing the journey!", 20, 100);
    doc.save("Frontend_Certificate.pdf");
});

// Floating particles
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
}));
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#00f2fe";
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();



// GSAP animations for landing
gsap.from(".hero h1", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });
gsap.from(".hero p", { y: -30, opacity: 0, delay: 0.3, duration: 1, ease: "power3.out" });
gsap.from(".start-btn", { y: 100, opacity: 0, delay: 0.8, duration: 1, ease: "bounce.out" });

// Subtle floating animation for button
gsap.to(".start-btn", { y: "+=10", repeat: -1, yoyo: true, duration: 1.5, ease: "sine.inOut" });
