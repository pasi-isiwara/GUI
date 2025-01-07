document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const examDateInput = document.getElementById("final-exam-date");
    const saveExamDateButton = document.getElementById("save-exam-date");
    const assessmentSubjectInput = document.getElementById("assessment-subject");
    const assessmentDateInput = document.getElementById("assessment-date");
    const addAssessmentButton = document.getElementById("add-assessment");
    const assessmentsList = document.getElementById("assessments-list");
    const dailyTargetInput = document.getElementById("daily-target");
    const saveTargetButton = document.getElementById("save-target");

    // Load saved data on page load
    loadSavedData();

    // =====================
    // EVENT LISTENERS
    // =====================

    // Save final exam date
    if (saveExamDateButton) {
        saveExamDateButton.addEventListener("click", () => {
            const examDate = examDateInput.value;
            if (examDate) {
                localStorage.setItem("finalExamDate", examDate);
                alert("Final exam date saved!");
            } else {
                alert("Please select a date.");
            }
        });
    }

    // Add assessment
    if (addAssessmentButton) {
        addAssessmentButton.addEventListener("click", () => {
            const subject = assessmentSubjectInput.value.trim();
            const date = assessmentDateInput.value;

            if (subject && date) {
                const assessments = getLocalStorageItem("assessments", []);
                // Check for duplicates
                if (assessments.some(a => a.subject === subject && a.date === date)) {
                    alert("This assessment already exists.");
                    return;
                }
                assessments.push({ subject, date });
                setLocalStorageItem("assessments", assessments);
                renderAssessments(assessments);

                assessmentSubjectInput.value = "";
                assessmentDateInput.value = "";
                alert("Assessment added!");
            } else {
                alert("Please fill in both fields.");
            }
        });
    }

    // Save daily target
    if (saveTargetButton) {
        saveTargetButton.addEventListener("click", () => {
            const dailyTarget = dailyTargetInput.value.trim();
            if (dailyTarget) {
                localStorage.setItem("dayTarget", dailyTarget);
                alert("Daily target saved!");
            } else {
                alert("Please enter a target.");
            }
        });
    }

    // =====================
    // FUNCTIONS
    // =====================

    function loadSavedData() {
        // Load exam date
        const savedExamDate = localStorage.getItem("finalExamDate");
        if (savedExamDate && examDateInput) {
            examDateInput.value = savedExamDate;
        }

        // Load assessments
        const savedAssessments = getLocalStorageItem("assessments", []);
        renderAssessments(savedAssessments);

        // Load daily target
        const savedDailyTarget = localStorage.getItem("dayTarget");
        if (savedDailyTarget && dailyTargetInput) {
            dailyTargetInput.value = savedDailyTarget;
        }
    }

    function renderAssessments(assessments) {
        assessmentsList.innerHTML = "";
        assessments.forEach((assessment, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${assessment.subject} - ${assessment.date} 
                <button class="delete-assessment" data-index="${index}">Delete</button>
            `;
            assessmentsList.appendChild(li);
        });

        // Add delete functionality to buttons
        document.querySelectorAll(".delete-assessment").forEach(button => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                deleteAssessment(index);
            });
        });
    }

    function deleteAssessment(index) {
        const assessments = getLocalStorageItem("assessments", []);
        assessments.splice(index, 1); // Remove the selected assessment
        setLocalStorageItem("assessments", assessments);
        renderAssessments(assessments);
        alert("Assessment removed!");
    }

    function getLocalStorageItem(key, defaultValue) {
        return JSON.parse(localStorage.getItem(key)) || defaultValue;
    }

    function setLocalStorageItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
});
