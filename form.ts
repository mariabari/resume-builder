// Get form element with proper typing
const form = document.getElementById("resume-form") as HTMLFormElement | null;

form?.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  // Fetch input values with type annotations
  const name = (document.getElementById("name-input") as HTMLInputElement)?.value || "";
  const email = (document.getElementById("email-input") as HTMLInputElement)?.value || "";
  const phone = (document.getElementById("phone-input") as HTMLInputElement)?.value || "";
  const education = (document.getElementById("education-input") as HTMLInputElement)?.value || "";
  const skills = (document.getElementById("skills-input") as HTMLInputElement)?.value || "";
  const work = (document.getElementById("work-input") as HTMLInputElement)?.value || "";

  // Handle the profile picture file input
  const profilePicInput = document.getElementById("profile-pic-input") as HTMLInputElement | null;
  const profilePicFile = profilePicInput?.files?.[0] || null;

  const reader = new FileReader();

  // When file reading finishes, store data to localStorage and navigate
  reader.onloadend = () => {
    if (reader.result) {
      localStorage.setItem("profilePic", reader.result as string);
    }

    // Save form data to localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("education-text", education);
    localStorage.setItem("skills-text", skills);
    localStorage.setItem("work-text", work);

    // Redirect to the index page
    window.location.href = "index.html";
  };

  // If a profile picture is uploaded, read it, otherwise call onloadend directly
  if (profilePicFile) {
    reader.readAsDataURL(profilePicFile);
  } else {
reader.onloadend?.call(reader); // Trigger manually if no file is selected
  }
});
