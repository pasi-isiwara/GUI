// report.js

document.addEventListener("DOMContentLoaded", function () {
    const reportContainer = document.getElementById("report-container");

    // Retrieve student data from local storage
    const students = JSON.parse(localStorage.getItem("students")) || [];

    if (students.length === 0) {
        reportContainer.innerHTML = "<p>No student data available.</p>";
    } else {
        // Display students and their grades
        let reportHtml = "<ul>";
        students.forEach(student => {
            reportHtml += `<li>${student.name} - Grade: ${student.grade}</li>`;
        });
        reportHtml += "</ul>";

        reportContainer.innerHTML = reportHtml;
    }
});
