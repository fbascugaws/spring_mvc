// stores springboot base endpoint
const API_URL = "http://localhost:8080/api/students";

// create a student
async function createStudent(studentData) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            alert("Student added successfully!");
            resetForm();
        } else {
            alert("Error adding student.");
        } 
    } catch (error) {
        console.error("Error creating student: ", error);
    }
}

// event listener for form submission
document.getElementById("studentForm").addEventListener("submit", function(e) {

    e.preventDefault();

    if (!validateStudentForm()) {
        return;
    }

    const id = document.getElementById("studentId").value;
    const studentData = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim()
    };

    createStudent(studentData);
    
});

// resert form state
function resetForm() {
    document.getElementById("studentId").value = "";
    document.getElementById("studentForm").reset();

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.textContent = "Add Student";
    submitBtn.style.backgroundColor = "#28a745";
}

// display all db data
async function getAllStudents() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Network response was not ok");

        const students = await response.json();
        const tableBody = document.getElementById("studentTableBody");
        tableBody.innerHTML = "";

        students.forEach(student => {
            const row = `
                <tr>
                    <td>${student.id}</d>
                    <td>${student.firstName}</d>
                    <td>${student.lastName}</d>
                    <td>${student.email}</d>
                    <td>
                        <button class="btn-edit" onclick="initializesStudentFormById(${student.id})">Edit</button>
                        <button class="btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
                    </d>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching students: ", error);
        alert("Failed to fetch students. Is your Spring Boot backend running?");        
    }
}

// event listener to load data from springboot
document.addEventListener("DOMContentLoaded", getAllStudents);