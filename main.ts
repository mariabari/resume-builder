// Declare jsPDF globally (since it comes from the CDN)
declare const jspdf: any;

// Get elements with proper type annotations
const toggleSkillsButton = document.getElementById("toggle-skills") as HTMLButtonElement | null;
const skillsSection = document.getElementById("skills") as HTMLElement | null;
const profilePic = document.getElementById("profile-pic") as HTMLImageElement | null;
const shareButton = document.getElementById("share-button") as HTMLButtonElement | null;
const downloadButton = document.getElementById("download-button") as HTMLButtonElement | null;

// Toggle Skills section visibility
toggleSkillsButton?.addEventListener("click", () => {
  if (skillsSection) {
    skillsSection.style.display = skillsSection.style.display === "none" ? "block" : "none";
  }
});

// Save contentEditable changes to localStorage
document.querySelectorAll('[contenteditable="true"]').forEach((element) => {
  element.addEventListener("input", () => {
    if (element.id) {
      localStorage.setItem(element.id, element.textContent || "");
    }
  });
});

// Load contentEditable values and profile picture from localStorage on DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[contenteditable="true"]').forEach((element) => {
    const savedValue = localStorage.getItem(element.id);
    if (savedValue) {
      element.textContent = savedValue;
    }
  });

  const savedProfilePic = localStorage.getItem("profilePic");
  if (savedProfilePic && profilePic) {
    profilePic.src = savedProfilePic;
  }
});

// Share the current page URL by copying it to the clipboard
shareButton?.addEventListener("click", () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert("Resume link copied to clipboard!");
  }).catch(() => {
    alert("Failed to copy link to clipboard.");
  });
});

// Download resume as PDF
downloadButton?.addEventListener("click", () => {
  const { jsPDF } = jspdf;
  const doc = new jsPDF();

  // Add the profile picture if available
  if (profilePic) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx) {
      canvas.width = profilePic.naturalWidth;
      canvas.height = profilePic.naturalHeight;
      ctx.drawImage(profilePic, 0, 0);
      const imgData = canvas.toDataURL("image/jpeg");
      doc.addImage(imgData, "JPEG", 10, 10, 50, 50); // Center the image at the top
    }
  }

  // Add personal information below the profile picture
  const personalInfo = document.getElementById("personal-info")?.innerText || "";
  doc.setFontSize(16);
  doc.text(personalInfo, 10, 70);

  // Add education section below personal information
  const educationInfo = document.getElementById("education")?.innerText || "";
  doc.setFontSize(14);
  doc.text(educationInfo, 10, 120);

  // Add skills section below education
  const skillsInfo = document.getElementById("skills")?.innerText || "";
  doc.text(skillsInfo, 10, 140);

  // Add work experience section below skills
  const workExperience = document.getElementById("work-experience")?.innerText || "";
  doc.text(workExperience, 10, 160);

  // Save the PDF
  doc.save("resume.pdf");
});
