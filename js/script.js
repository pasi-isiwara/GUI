// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("student-form");
    const studentsTableBody = document.querySelector("#students-table tbody");
    const subjectForm = document.getElementById("subject-form");
    const progressList = document.getElementById("progress-list");

    // Load students and subjects from local storage on page load
    loadStudents();
    loadSubjects();
    loadProgress();

    // =====================
    // STUDENT MANAGEMENT
    // =====================
    // Handle student form submission
    if (studentForm) {
        studentForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const studentName = document.getElementById("student-name").value;
            const studentGrade = document.getElementById("student-grade").value;

            addStudentToTable(studentName, studentGrade);
            saveStudentToLocalStorage(studentName, studentGrade);
            studentForm.reset();
        });
    }

    // Handle delete button clicks for students
    if (studentsTableBody) {
        studentsTableBody.addEventListener("click", function (event) {
            if (event.target.classList.contains("delete-btn")) {
                const row = event.target.parentElement.parentElement;
                const studentName = row.children[0].textContent;

                if (confirm(`Are you sure you want to delete ${studentName}?`)) {
                    row.remove();
                    removeStudentFromLocalStorage(studentName);
                }
            }
        });
    }

    // =====================
    // SUBJECT MANAGEMENT
    // =====================
    // Handle subject form submission
    if (subjectForm) {
        subjectForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const subjectName = document.getElementById("subject-name").value;
            const subjectWeight = document.getElementById("subject-weight").value;
            const inclassDate = document.getElementById("inclass-date").value;
            const reportDate = document.getElementById("report-date").value;
            const examDate = document.getElementById("exam-date").value;

            const subject = {
                name: subjectName,
                weight: subjectWeight,
                inclassDate,
                reportDate,
                examDate,
                progress: 0
            };

            saveSubjectToLocalStorage(subject);
            loadSubjects();
            subjectForm.reset();
        });

    
    }

    // =====================
    // PROGRESS TRACKER
    // =====================
    function loadProgress() {
        const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
        progressList.innerHTML = "";

        subjects.forEach((subject) => {
            const progressItem = document.createElement("div");
            progressItem.className = "progress-item";
            progressItem.innerHTML = `
                <h4>${subject.name}</h4>
                <p>Progress: ${subject.progress}%</p>
                <button onclick="updateProgress('${subject.name}')">Update Progress</button>
            `;
            progressList.appendChild(progressItem);
        });
    }

    window.updateProgress = function (subjectName) {
        const newProgress = prompt(`Enter your progress for ${subjectName} (0-100)%:`);
        if (newProgress !== null) {
            let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
            subjects = subjects.map((subject) => {
                if (subject.name === subjectName) {
                    subject.progress = Math.min(100, Math.max(0, parseInt(newProgress)));
                }
                return subject;
            });
            localStorage.setItem("subjects", JSON.stringify(subjects));
            loadProgress();
        }
    };

    // =====================
    // LOCAL STORAGE FUNCTIONS
    // =====================
    // Students
    function saveStudentToLocalStorage(name, grade) {
        let students = JSON.parse(localStorage.getItem("students")) || [];
        students.push({ name, grade });
        localStorage.setItem("students", JSON.stringify(students));
    }

    function loadStudents() {
        const students = JSON.parse(localStorage.getItem("students")) || [];
        students.forEach((student) => addStudentToTable(student.name, student.grade));
    }

    function addStudentToTable(name, grade) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>${grade}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        studentsTableBody.appendChild(row);
    }

    function removeStudentFromLocalStorage(name) {
        let students = JSON.parse(localStorage.getItem("students")) || [];
        students = students.filter((student) => student.name !== name);
        localStorage.setItem("students", JSON.stringify(students));
    }

    // Subjects
    function saveSubjectToLocalStorage(subject) {
        let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
        subjects.push(subject);
        localStorage.setItem("subjects", JSON.stringify(subjects));
    }

    function loadSubjects() {
        const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
        const subjectList = document.getElementById("subject-list");
        if (subjectList) {
            subjectList.innerHTML = "";
            subjects.forEach((subject) => {
                const li = document.createElement("li");
                li.textContent = `${subject.name} - ${subject.weight}%`;
                subjectList.appendChild(li);
            });
        }
    }

    // =====================
    // AUTHENTICATION
    // =====================
    function isLoggedIn() {
        return localStorage.getItem("isLoggedIn") === "true";
    }

    if (!isLoggedIn() && !window.location.pathname.includes("login.html")) {
        window.location.href = "login.html";
    }

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "admin" && password === "password123") {
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "index.html";
            } else {
                document.getElementById("error-message").style.display = "block";
            }
        });
    }

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "login.html";
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    // Handle login form submission
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "password123") {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "index.html";
        } else {
            errorMessage.style.display = "block";
        }
    });

    // Show Password Toggle
    const showPasswordCheckbox = document.getElementById("show-password");
    const passwordInput = document.getElementById("password");

    showPasswordCheckbox.addEventListener("change", function () {
        passwordInput.type = this.checked ? "text" : "password";
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const examDate = new Date("2025-06-15T00:00:00"); // Example exam date
    const countdownElement = document.getElementById("exam-countdown");

    function updateCountdown() {
        const now = new Date();
        const timeDifference = examDate - now;

        if (timeDifference <= 0) {
            countdownElement.textContent = "The exam date has passed.";
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});
document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
});
