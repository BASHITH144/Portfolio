/**
 * Contact Form EmailJS Integration
 * Target Email: bashithahamed79@gmail.com
 */

// EmailJS Credentials Configuration
const EMAILJS_CONFIG = {
  PUBLIC_KEY: "d9urbvFxgKIslnU_I",
  SERVICE_ID: "service_d63ullb",
  TEMPLATE_ID: "template_c32qcvb"
};

document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS with Public Key
  if (typeof emailjs !== "undefined" && EMAILJS_CONFIG.PUBLIC_KEY) {
    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    } catch (err) {
      console.warn("EmailJS init warning:", err);
    }
  }

  const form = document.getElementById("portfolio-contact-form");
  if (!form) return;

  const nameInput = document.getElementById("from_name");
  const emailInput = document.getElementById("from_email");
  const messageInput = document.getElementById("message");
  const submitBtn = document.getElementById("contact-submit-btn");
  const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;
  const toastNotification = document.getElementById("form-toast-notification");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  // Email format validation regex
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  // Toast Notification Handler (3 seconds duration, fade-in/fade-out)
  function showToast(title, subtitle, isSuccess = true) {
    if (!toastNotification) return;

    toastNotification.style.display = "block";
    toastNotification.style.opacity = "0";
    toastNotification.style.transform = "translateY(10px)";
    
    if (isSuccess) {
      toastNotification.style.backgroundColor = "rgba(40, 167, 69, 0.15)";
      toastNotification.style.border = "1px solid rgba(40, 167, 69, 0.4)";
      toastNotification.style.color = "#2ecc71";
      toastNotification.innerHTML = `<div><strong>${title}</strong></div><div style="font-size: 0.88rem; margin-top: 4px; opacity: 0.9;">${subtitle}</div>`;
    } else {
      toastNotification.style.backgroundColor = "rgba(220, 53, 69, 0.15)";
      toastNotification.style.border = "1px solid rgba(220, 53, 69, 0.4)";
      toastNotification.style.color = "#ff4d4d";
      toastNotification.innerHTML = `<div><strong>${title}</strong></div><div style="font-size: 0.88rem; margin-top: 4px; opacity: 0.9;">${subtitle}</div>`;
    }

    // Fade in
    setTimeout(() => {
      toastNotification.style.opacity = "1";
      toastNotification.style.transform = "translateY(0)";
    }, 10);

    // Auto fade out after 3 seconds
    setTimeout(() => {
      toastNotification.style.opacity = "0";
      toastNotification.style.transform = "translateY(10px)";
      setTimeout(() => {
        toastNotification.style.display = "none";
      }, 400);
    }, 3000);
  }

  // Clear validation styling on typing
  [nameInput, emailInput, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", function () {
      if (input === nameInput && nameError) nameError.style.display = "none";
      if (input === emailInput && emailError) emailError.style.display = "none";
      if (input === messageInput && messageError) messageError.style.display = "none";
      input.style.borderColor = "rgba(255, 255, 255, 0.1)";
    });
  });

  // Form Submission Handler
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    // Reset error messages
    if (nameError) nameError.style.display = "none";
    if (emailError) emailError.style.display = "none";
    if (messageError) messageError.style.display = "none";

    // Validate Name
    if (!nameInput || !nameInput.value.trim()) {
      if (nameError) nameError.style.display = "block";
      if (nameInput) nameInput.style.borderColor = "#ff4d4d";
      valid = false;
    }

    // Validate Email
    if (!emailInput || !emailInput.value.trim() || !isValidEmail(emailInput.value)) {
      if (emailError) emailError.style.display = "block";
      if (emailInput) emailInput.style.borderColor = "#ff4d4d";
      valid = false;
    }

    // Validate Message
    if (!messageInput || !messageInput.value.trim()) {
      if (messageError) messageError.style.display = "block";
      if (messageInput) messageInput.style.borderColor = "#ff4d4d";
      valid = false;
    }

    if (!valid) return;

    // Loading state: Disable button, show sending text & spinner
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.75";
    submitBtn.style.cursor = "not-allowed";

    const originalBtnText = btnText ? btnText.textContent : "submit message";
    if (btnText) {
      btnText.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" style="width: 1rem; height: 1rem; border-width: 0.15em; display: inline-block;"></span> Sending...`;
    }

    // Template parameters passed to EmailJS
    const templateParams = {
      from_name: nameInput.value.trim(),
      from_email: emailInput.value.trim(),
      message: messageInput.value.trim()
    };

    emailjs
      .send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      )
      .then(
        function (response) {
          form.reset();
          showToast(
            "✓ Message Sent Successfully",
            "Thank you for contacting me. I'll reply as soon as possible.",
            true
          );
        },
        function (error) {
          console.error("EmailJS Error:", error);
          showToast(
            "❌ Failed to send message.",
            "Please try again later.",
            false
          );
        }
      )
      .finally(function () {
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
        if (btnText) {
          btnText.textContent = originalBtnText;
        }
      });
  });
});
