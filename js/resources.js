document.addEventListener("DOMContentLoaded", () => {
    const subjectNameDropdown = document.getElementById("subject-name");
    const resourceList = document.getElementById("resource-list");
    const uploadForm = document.getElementById("upload-resource-form");

    // Load subjects into dropdown
    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    subjects.forEach(subject => {
        const option = document.createElement("option");
        option.value = subject.name;
        option.textContent = subject.name;
        subjectNameDropdown.appendChild(option);
    });

    // Load resources
    const resources = JSON.parse(localStorage.getItem("resources")) || [];
    const renderResources = () => {
        resourceList.innerHTML = resources
            .map(
                resource =>
                    `<li>
                        ${resource.subject}: <a href="${resource.filePath}" target="_blank">${resource.fileName}</a>
                    </li>`
            )
            .join("");
    };
    renderResources();

    // Handle file upload
    uploadForm.addEventListener("submit", event => {
        event.preventDefault();

        const selectedSubject = subjectNameDropdown.value;
        const fileInput = document.getElementById("resource-file");

        if (!selectedSubject || !fileInput.files.length) {
            alert("Please select a subject and a file.");
            return;
        }

        const file = fileInput.files[0];
        const filePath = URL.createObjectURL(file); // Simulate file storage
        const resource = {
            subject: selectedSubject,
            fileName: file.name,
            filePath,
        };

        resources.push(resource);
        localStorage.setItem("resources", JSON.stringify(resources));
        renderResources();
        uploadForm.reset();
        alert("File uploaded successfully!");
    });
});
