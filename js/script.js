// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("student-form");
    const studentsTableBody = document.querySelector("#students-table tbody");

    // Load students from local storage on page load
    loadStudents();

    // Handle form submission
    studentForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from refreshing the page

        // Get the values from the form inputs
        const studentName = document.getElementById("student-name").value;
        const studentGrade = document.getElementById("student-grade").value;

        // Add the student to the table
        addStudentToTable(studentName, studentGrade);

        // Save student data to local storage
        saveStudentToLocalStorage(studentName, studentGrade);

        // Reset the form
        studentForm.reset();
    });

    // Handle delete button clicks
    studentsTableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const row = event.target.parentElement.parentElement;
            const studentName = row.children[0].textContent;

            // Show confirmation popup
            const confirmation = confirm(`Are you sure you want to delete ${studentName}?`);

            if (confirmation) {
                // Remove the corresponding row
                row.remove();

                // Remove student from local storage
                removeStudentFromLocalStorage(studentName);
            }
        }
    });

    // Function to add student to the table
    function addStudentToTable(name, grade) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = name;

        const gradeCell = document.createElement("td");
        gradeCell.textContent = grade;

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(gradeCell);
        row.appendChild(deleteCell);

        studentsTableBody.appendChild(row);
    }

    // Function to save student to local storage
    function saveStudentToLocalStorage(name, grade) {
        let students = JSON.parse(localStorage.getItem("students")) || [];
        students.push({ name, grade });
        localStorage.setItem("students", JSON.stringify(students));
    }

    // Function to load students from local storage
    function loadStudents() {
        const students = JSON.parse(localStorage.getItem("students")) || [];
        students.forEach(student => addStudentToTable(student.name, student.grade));
    }

    // Function to remove student from local storage
    function removeStudentFromLocalStorage(name) {
        let students = JSON.parse(localStorage.getItem("students")) || [];
        students = students.filter(student => student.name !== name);
        localStorage.setItem("students", JSON.stringify(students));
    }
});
