"use strict";
var _a, _b;
(_a = document
    .getElementById("pic")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", function (event) {
    const target = event.target;
    const file = target.files ? target.files[0] : null;
    const reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        const result = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        const imgElement = document.getElementById("imagePreview");
        imgElement.src = result;
        imgElement.style.display = "block"; // Show the image preview
        const resumeImgElement = document.getElementById("resumePic");
        resumeImgElement.src = result;
    };
    if (file) {
        reader.readAsDataURL(file);
    }
});
function updatePreview() {
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput")
        .value;
    const phone = document.getElementById("phoneInput")
        .value;
    const linkedIn = document.getElementById("linkedinInput").value;
    const address = document.getElementById("addressInput")
        .value;
    const summary = document.getElementById("summaryInput")
        .value;
    const education = document.getElementById("educationInput").value;
    const skills = document.getElementById("skillsInput")
        .value;
    const experiences = document.getElementById("experiencesInput").value;
    document.getElementById("resumeName").textContent = name;
    document.getElementById("resumeEmail").textContent = email;
    document.getElementById("resumePhone").textContent = phone;
    document.getElementById("resumeLinkedIn").textContent =
        linkedIn;
    document.getElementById("resumeAddress").textContent =
        address;
    document.getElementById("resumeSummary").textContent =
        summary;
    document.getElementById("resumeEducation").textContent =
        education;
    document.getElementById("resumeSkills").textContent = skills;
    document.getElementById("resumeExperiences").textContent =
        experiences;
}
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    // Add the profile picture first
    const imgElement = document.getElementById("resumePic");
    if (imgElement && imgElement.src) {
        const imgData = imgElement.src;
        // Add image at the top of the page
        doc.addImage(imgData, "PNG", 10, 10, 50, 50); // Adjust x, y, width, height as needed
    }
    // Add resume information below the image
    let yOffset = 70; // Initial vertical offset below the image
    doc.text(`Name: ${document.getElementById("nameInput").value}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Email: ${document.getElementById("emailInput").value}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Phone: ${document.getElementById("phoneInput").value}`, 10, yOffset);
    yOffset += 10;
    doc.text(`LinkedIn: ${document.getElementById("linkedinInput").value}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Address: ${document.getElementById("addressInput").value}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Summary: ${document.getElementById("summaryInput").value}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Education: ${document.getElementById("educationInput").value}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Skills: ${document.getElementById("skillsInput").value}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Experiences: ${document.getElementById("experiencesInput").value}`, 10, yOffset);
    // Save the PDF
    doc.save("resume.pdf");
}
(_b = document.getElementById("toggleButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    const skillsElement = document.getElementById("resumeSkills");
    if (skillsElement.style.display === "none") {
        skillsElement.style.display = "block";
        this.textContent = "Hide Skills";
    }
    else {
        skillsElement.style.display = "none";
        this.textContent = "Show Skills";
    }
});
