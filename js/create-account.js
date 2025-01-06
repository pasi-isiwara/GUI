document.addEventListener("DOMContentLoaded", function () {
    const createAccountForm = document.getElementById("create-account-form");
    const errorMessage = document.getElementById("error-message");

    createAccountForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("student-name").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        // Validation
        if (!username || !password || !name) {
            errorMessage.textContent = "All fields are required.";
            errorMessage.style.display = "block";
            return;
        }

        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match.";
            errorMessage.style.display = "block";
            return;
        }

        // Save account to localStorage
        let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        if (accounts.some((acc) => acc.username === username)) {
            errorMessage.textContent = "Username already exists. Choose a different one.";
            errorMessage.style.display = "block";
            return;
        }

        accounts.push({ name, username, password });
        localStorage.setItem("accounts", JSON.stringify(accounts));

        alert("Account created successfully! You can now log in.");
        window.location.href = "login.html";
    });
});
