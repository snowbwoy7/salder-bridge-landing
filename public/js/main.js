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
        // Send only a generic lead event after successful submission; never send form contents or contact details to Analytics.
        window.salderBridgeAnalyticsTrackLead?.();
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

// Optional Google Analytics 4. Load only after explicit visitor consent.
(() => {
  const measurementId = "G-ZJ6KEXW01D";
  const consentKey = "salderBridgeAnalyticsConsent";
  const banner = document.querySelector("#analytics-consent-banner");
  const acceptButton = document.querySelector("#analytics-accept");
  const rejectButton = document.querySelector("#analytics-reject");
  const settingsButton = document.querySelector("#analytics-settings");

  function readConsent() {
    try { return window.localStorage.getItem(consentKey); }
    catch (error) { return null; }
  }

  function saveConsent(value) {
    try { window.localStorage.setItem(consentKey, value); }
    catch (error) { /* Consent can still apply for this page view if storage is blocked. */ }
  }

  function loadAnalytics() {
    if (window.__salderBridgeAnalyticsLoaded) {
      window['ga-disable-' + measurementId] = false;
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", { analytics_storage: "granted" });
      }
      return;
    }
    // Allow measurement only after the visitor has explicitly accepted analytics.
    window['ga-disable-' + measurementId] = false;
    window.__salderBridgeAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    script.onerror = () => { window.__salderBridgeAnalyticsLoaded = false; };
    document.head.appendChild(script);
  }

  window.salderBridgeAnalyticsTrackLead = function () {
    if (readConsent() === "accepted" && typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", { form_name: "case_review_form" });
    }
  };

  function choose(value) {
    saveConsent(value);
    if (banner) banner.hidden = true;

    if (value === "accepted") {
      if (window.__salderBridgeAnalyticsLoaded && typeof window.gtag === "function") {
        window.gtag("consent", "update", { analytics_storage: "granted" });
      } else {
        loadAnalytics();
      }
    } else {
      // Hard-disable future Google Analytics measurement if consent is rejected or withdrawn.
      // This is stricter than relying only on analytics_storage=denied, which can allow cookieless pings.
      window['ga-disable-' + measurementId] = true;
      if (window.__salderBridgeAnalyticsLoaded && typeof window.gtag === "function") {
        window.gtag("consent", "update", { analytics_storage: "denied" });
      }
    }
  }

  const savedChoice = readConsent();
  if (banner) {
    banner.hidden = savedChoice === "accepted" || savedChoice === "rejected";
    acceptButton?.addEventListener("click", () => choose("accepted"));
    rejectButton?.addEventListener("click", () => choose("rejected"));
    settingsButton?.addEventListener("click", () => { banner.hidden = false; });
  }
  // On the landing page, load analytics only for a choice already explicitly granted.
  if (savedChoice === "accepted") loadAnalytics();
})();
