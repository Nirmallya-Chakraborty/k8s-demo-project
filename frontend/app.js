// Backend API URL
const API_URL = "http://192.168.1.185:30009";

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get input values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Clear previous message
    message.textContent = "";
    message.className = "";

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            message.textContent = "Login Successful!";
            message.classList.add("success");

            // Store username for welcome page
            localStorage.setItem("username", username);

            // Redirect after 1 second
            setTimeout(() => {
                window.location.href = "welcome.html";
            }, 1000);

        } else {
            message.textContent = data.message || "Invalid Username or Password";
            message.classList.add("error");
        }

    } catch (error) {
        console.error(error);

        message.textContent = "Cannot connect to backend server.";
        message.classList.add("error");
    }
});
