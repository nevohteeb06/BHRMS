// DOM Elements
const departmentsList = document.getElementById("departments");
const newDepartmentForm = document.getElementById("new-department-form");

// Load departments when the page loads
window.addEventListener("load", () => {
    loadDepartments();
});

// Load departments from the backend
function loadDepartments() {
    fetch("http://localhost:3000/departments")
        .then(response => response.json())
        .then(departments => {
            departmentsList.innerHTML = departments.map(department => `
                <li>${department.name} - ${department.abbr}</li>
            `).join("");
        })
        .catch(error => console.error("Error loading departments:", error));
}

// Handle form submission
newDepartmentForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = newDepartmentForm.name.value;
    const abbr = newDepartmentForm.abbr.value;

    const departmentData = {
        name,
        abbr
    };

    fetch("http://localhost:3000/departments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(departmentData)
    })
    .then(response => response.json())
    .then(response => {
        console.log("Department created successfully:", response);
        loadDepartments();
    })
    .catch(error => console.error("Error creating department:", error));
});
