// Submits the existing case-enquiry form through Web3Forms.
// This sends the form data to the configured recipient in the Web3Forms account.
const form = document.querySelector("#case-review-form");
const status = document.querySelector("#form-status");
const submitButton = form?.querySelector('button[type="submit"]');

if (form && status) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    // A filled honeypot field is likely automated spam; don't submit it.
    const honeypot = form.querySelector('[name="botcheck"]');
    if (honeypot && honeypot.value.trim() !== "") {
      status.textContent = "Your enquiry could not be submitted. Please try again.";
      return;
    }

    const originalButtonText = submitButton?.textContent || "Request a case review";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting…";
    }
    status.textContent = "Submitting your enquiry. Please wait…";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      const result = await response.json();
      if (response.ok && result.success) {
        status.textContent = "Thank you. Your enquiry was accepted by the form service. Salder Bridge should receive it at the recipient email configured in Web3Forms. If you need to follow up, contact support@salderbridge.com.";
        form.reset();
      } else {
        const detail = typeof result.message === "string" ? ` Details: ${result.message}` : "";
        status.textContent = `We couldn't submit your enquiry. Please try again or email support@salderbridge.com directly.${detail}`;
      }
    } catch (error) {
      status.textContent = "We couldn't connect to the form service. Please check your internet connection and try again, or email support@salderbridge.com directly.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}
