document.addEventListener("DOMContentLoaded", () => {
    const studentNameElement = document.getElementById("student-name");
    const countdownElement = document.getElementById("exam-countdown");
    const assessmentListElement = document.getElementById("assessment-list");
    const dayTargetElement = document.getElementById("day-target");
    const resourceFilesButton = document.getElementById("resource-files-btn");

    // Retrieve and display the student's name
    const studentName = localStorage.getItem("studentName") || "Student";
    studentNameElement.textContent = studentName;

    // Countdown to final exam
    const finalExamDate = new Date(localStorage.getItem("finalExamDate") || "2025-06-01");
    const updateCountdown = () => {
        const now = new Date();
        const timeLeft = finalExamDate - now;
        const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        countdownElement.textContent = `${daysLeft} days remaining`;
    };
    updateCountdown();
    setInterval(updateCountdown, 1000 * 60 * 60);

    // Upcoming assessments
    const assessments = JSON.parse(localStorage.getItem("assessments")) || [];
    assessmentListElement.innerHTML = assessments
        .map(a => `<li>${a.subject} - ${a.date}</li>`)
        .join("");

    // Daily target
    const dayTarget = localStorage.getItem("dayTarget") || "Set your daily target.";
    dayTargetElement.textContent = dayTarget;

    // Resource files button
    resourceFilesButton.addEventListener("click", () => {
        window.location.href = "resources.html";
    });
});
