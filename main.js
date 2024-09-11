// Get elements with proper type annotations
var toggleSkillsButton = document.getElementById("toggle-skills");
var skillsSection = document.getElementById("skills");
var profilePic = document.getElementById("profile-pic");
var shareButton = document.getElementById("share-button");
var downloadButton = document.getElementById("download-button");
// Toggle Skills section visibility
toggleSkillsButton === null || toggleSkillsButton === void 0 ? void 0 : toggleSkillsButton.addEventListener("click", function () {
    if (skillsSection) {
        skillsSection.style.display = skillsSection.style.display === "none" ? "block" : "none";
    }
});
// Save contentEditable changes to localStorage
document.querySelectorAll('[contenteditable="true"]').forEach(function (element) {
    element.addEventListener("input", function () {
        if (element.id) {
            localStorage.setItem(element.id, element.textContent || "");
        }
    });
});
// Load contentEditable values and profile picture from localStorage on DOMContentLoaded
window.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('[contenteditable="true"]').forEach(function (element) {
        var savedValue = localStorage.getItem(element.id);
        if (savedValue) {
            element.textContent = savedValue;
        }
    });
    var savedProfilePic = localStorage.getItem("profilePic");
    if (savedProfilePic && profilePic) {
        profilePic.src = savedProfilePic;
    }
});
// Share the current page URL by copying it to the clipboard
shareButton === null || shareButton === void 0 ? void 0 : shareButton.addEventListener("click", function () {
    var url = window.location.href;
    navigator.clipboard.writeText(url).then(function () {
        alert("Resume link copied to clipboard!");
    }).catch(function () {
        alert("Failed to copy link to clipboard.");
    });
});
// Download resume as PDF
downloadButton === null || downloadButton === void 0 ? void 0 : downloadButton.addEventListener("click", function () {
    var _a, _b, _c, _d;
    var jsPDF = jspdf.jsPDF;
    var doc = new jsPDF();
    // Add the profile picture if available
    if (profilePic) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        if (ctx) {
            canvas.width = profilePic.naturalWidth;
            canvas.height = profilePic.naturalHeight;
            ctx.drawImage(profilePic, 0, 0);
            var imgData = canvas.toDataURL("image/jpeg");
            doc.addImage(imgData, "JPEG", 10, 10, 50, 50); // Center the image at the top
        }
    }
    // Add personal information below the profile picture
    var personalInfo = ((_a = document.getElementById("personal-info")) === null || _a === void 0 ? void 0 : _a.innerText) || "";
    doc.setFontSize(16);
    doc.text(personalInfo, 10, 70);
    // Add education section below personal information
    var educationInfo = ((_b = document.getElementById("education")) === null || _b === void 0 ? void 0 : _b.innerText) || "";
    doc.setFontSize(14);
    doc.text(educationInfo, 10, 120);
    // Add skills section below education
    var skillsInfo = ((_c = document.getElementById("skills")) === null || _c === void 0 ? void 0 : _c.innerText) || "";
    doc.text(skillsInfo, 10, 140);
    // Add work experience section below skills
    var workExperience = ((_d = document.getElementById("work-experience")) === null || _d === void 0 ? void 0 : _d.innerText) || "";
    doc.text(workExperience, 10, 160);
    // Save the PDF
    doc.save("resume.pdf");
});
