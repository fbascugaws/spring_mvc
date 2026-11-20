// stores springboot base endpoint
const API_URL = "http://localhost:8080/api/students";
const API_AUTH = "http://localhost:8080/api/auth";

// create a student
async function createStudent(studentData) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData),
            credentials: "include"
        });

        if (response.ok) {
            alert("Student added successfully!");
            resetForm();
            getAllStudents();
        } else {
            alert("Error adding student.");
        } 
    } catch (error) {
        console.error("Error creating student:", error);
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

    if (id) {
        updateStudent(id, studentData);
    } else {
        createStudent(studentData);
    }
    
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
        const response = await fetch(API_URL, {
            credentials: "include"
        });
        
        if (response.status === 401 || response.status === 403) {
            await loginUser();
            return;
        }

        if (!response.ok) throw new Error("Network response was not ok");

        const students = await response.json();
        const tableBody = document.getElementById("studentTableBody");
        tableBody.innerHTML = "";

        students.forEach(student => {
            const row = `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.firstName}</td>
                    <td>${student.lastName}</td>
                    <td>${student.email}</td>
                    <td>
                        <button class="btn-edit" onclick="initializeStudentFormById(${student.id})">Edit</button>
                        <button class="btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        alert("Failed to fetch students. Is your Spring Boot backend running?");        
    }
}

// event listener to load data from springboot
document.addEventListener("DOMContentLoaded", getAllStudents);

// display initial values of student form when edit btn is clicked
async function initializeStudentFormById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            credentials: "include"
        });
        if (!response.ok) throw new Error("Could not fetch student details");

        const student = await response.json();

        document.getElementById("studentId").value = student.id;
        document.getElementById("firstName").value = student.firstName;
        document.getElementById("lastName").value = student.lastName;
        document.getElementById("email").value = student.email;

        // button changes when edit button is triggered
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.textContent = "Update";
        submitBtn.style.backgroundColor = "#007bff";

        // clear old error highlights
        clearValidationStyles();

    } catch (error) {
        console.error("Error fetching student details:", error);        
    }
}

// update a student
async function updateStudent(id, studentData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData),
            credentials: "include"
        });

        if (response.ok) {
            alert("Student updated successfully!");
            resetForm();
            getAllStudents();
        } else {
            alert("Error updating student.");
        }

    } catch (error) {
        console.error("Error updating student:", error);        
    }
}

// delete a student
async function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                credentials: "include"
            });

            if (response.ok) {
                const message = await response.text();
                alert(message);
                getAllStudents();
            } else {
                alert("Error deleting student.");
            }

        } catch (error) {
            console.error("Error deleting student:", error);     
        }
    }
}

// login a user
async function loginUser(loginDto) {
    try {
        const response = await fetch(`${API_AUTH}/auth_login_session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginDto),
            credentials: "include"
        });

        if (response.ok) {
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert("Invalid credentials.");
        }

    } catch (error) {
        console.error("Login error:", error);        
    }    
}