// Initial static interaction only. No form data is sent or stored.
const form = document.querySelector("#case-review-form");
const status = document.querySelector("#form-status");

if (form && status) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    status.textContent = "This is a design preview only. The inquiry form is not connected yet; no information has been sent or saved.";
  });
}
