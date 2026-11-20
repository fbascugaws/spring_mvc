/**
 * Validates the student form fields (first name, last name, and email).
 * Displays inline error messages and applies invalid styling on failure.
 *
 * @returns {boolean} True if all form fields pass validation; otherwise false.
 */
function validateStudentForm() {
    let isValid = true;

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");

    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const emailError = document.getElementById("emailError");

    clearValidationStyles();

    // First Name Validation
    if (firstName.value.trim() === "") {
        firstNameError.textContent = "First name is required.";
        firstName.classList.add("invalid");
        isValid = false;
    } else if (firstName.value.trim().length < 2) {
        firstNameError.textContent 
            = "First name must be at least 2 characters long.";
        firstName.classList.add("invalid");
        isValid = false;
    }

    // Last Name Validation
    if (lastName.value.trim() === "") {
        lastNameError.textContent = "Last name is required.";
        lastName.classList.add("invalid");
        isValid = false;
    } else if (lastName.value.trim().length < 2) {
        lastNameError.textContent 
            = "Last name must be at least 2 characters long.";
        lastName.classList.add("invalid");
        isValid = false;
    }

    // Email Validation
    const emailValue = email.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.value.trim() === "") {
        emailError.textContent = "Email address is required.";
        email.classList.add("invalid");
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.textContent 
            = "Please enter a valid email address (e.g., name@example.com).";
        email.classList.add("invalid");
        isValid = false;
    }

    return isValid;
}

/**
 * Resets form fields by removing invalid CSS classes and clearing error text.
 */
function clearValidationStyles() {
    const fields = ["firstName", "lastName", "email"];
    fields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        const errorSpan = document.getElementById(`${fieldId}Error`);

        if (element) element.classList.remove("invalid");
        if (errorSpan) errorSpan.textContent = "";    
    });
}