// Get form element with proper typing
var form = document.getElementById("resume-form");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (e) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    e.preventDefault();
    // Fetch input values with type annotations
    var name = ((_a = document.getElementById("name-input")) === null || _a === void 0 ? void 0 : _a.value) || "";
    var email = ((_b = document.getElementById("email-input")) === null || _b === void 0 ? void 0 : _b.value) || "";
    var phone = ((_c = document.getElementById("phone-input")) === null || _c === void 0 ? void 0 : _c.value) || "";
    var education = ((_d = document.getElementById("education-input")) === null || _d === void 0 ? void 0 : _d.value) || "";
    var skills = ((_e = document.getElementById("skills-input")) === null || _e === void 0 ? void 0 : _e.value) || "";
    var work = ((_f = document.getElementById("work-input")) === null || _f === void 0 ? void 0 : _f.value) || "";
    // Handle the profile picture file input
    var profilePicInput = document.getElementById("profile-pic-input");
    var profilePicFile = ((_g = profilePicInput === null || profilePicInput === void 0 ? void 0 : profilePicInput.files) === null || _g === void 0 ? void 0 : _g[0]) || null;
    var reader = new FileReader();
    // When file reading finishes, store data to localStorage and navigate
    reader.onloadend = function () {
        if (reader.result) {
            localStorage.setItem("profilePic", reader.result);
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
    }
    else {
        (_h = reader.onloadend) === null || _h === void 0 ? void 0 : _h.call(reader); // Trigger manually if no file is selected
    }
});
