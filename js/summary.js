document.addEventListener("DOMContentLoaded", () => {
    const subjectListElement = document.getElementById("subject-list");
    const addSubjectButton = document.getElementById("add-subject-btn");

    // Retrieve and display subjects
    const subjects = JSON.parse(localStorage.getItem("subjects")) || [
        { name: "Math", completed: 80, marks: 85 },
        { name: "Science", completed: 60, marks: 78 },
    ];
    const renderSubjects = () => {
        subjectListElement.innerHTML = subjects
            .map(
                subject =>
                    `<tr>
                        <td>${subject.name}</td>
                        <td>${subject.completed}%</td>
                        <td>${subject.marks}%</td>
                    </tr>`
            )
            .join("");
    };
    renderSubjects();

    // Add more subjects
    addSubjectButton.addEventListener("click", () => {
        const newSubject = prompt("Enter the new subject name:");
        if (newSubject) {
            subjects.push({ name: newSubject, completed: 0, marks: 0 });
            localStorage.setItem("subjects", JSON.stringify(subjects));
            renderSubjects();
        }
    });
});
