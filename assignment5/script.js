document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const message = document.getElementById("formMessage");

    if (!email.includes("@")) {
        message.textContent = "Please enter a valid email.";
        message.style.color = "red";
        return;
    }

    if (password.length < 8) {
        message.textContent = "Password must be at least 8 characters.";
        message.style.color = "red";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        message.style.color = "red";
        return;
    }

    message.textContent = "Form submitted successfully!";
    message.style.color = "green";

    document.getElementById("popup-section").style.display = "block";
    document.getElementById("bg-section").style.display = "block";
    document.getElementById("datetime-section").style.display = "block";
    document.getElementById("form-section").style.display = "none";
    document.getElementById("backBtn").style.display = "inline-block";  
});

const acc = document.querySelectorAll(".accordion-btn");
acc.forEach(btn => {
    btn.addEventListener("click", function () {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;

        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
});

const popup = document.getElementById("popup");
document.getElementById("openPopup").onclick = () => popup.style.display = "block";
document.getElementById("closePopup").onclick = () => popup.style.display = "none";
window.onclick = (event) => {
    if (event.target === popup) popup.style.display = "none";
};

document.getElementById("changeColor").addEventListener("click", function () {
    const colors = [
        { "page": "#f4f4f9"},
        { "page": "#a7e1a9ff" }, 
        { "page": "#a0cff4ff"}, 
        { "page": "#ffe082"},
    ];
    const random = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = random.page;
    document.getElementById("datetime").style.backgroundColor = random.date;
});

function updateDateTime() {
    const now = new Date();
    const options = { month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" };
    document.getElementById("datetime").textContent = now.toLocaleString("en-US", options);
}
setInterval(updateDateTime, 1000);
updateDateTime();

document.getElementById("backBtn").addEventListener("click", function () {
    document.getElementById("popup-section").style.display = "none";
    document.getElementById("bg-section").style.display = "none";
    document.getElementById("datetime-section").style.display = "none";
    document.getElementById("form-section").style.display = "block";
    document.getElementById("backBtn").style.display = "none";  
});

document.getElementById("btnColor").addEventListener("click", function () {
    alert("Button Clicked!");
});