# Security Notes

This file records planned controls, not a certification or guarantee of security.

## Planned controls
- Server-side input validation for inquiries.
- Request size limits and rate limiting.
- Safe, non-sensitive error messages.
- Email provider credentials held in server-side environment variables.
- HTTPS in deployment.
- Minimal collection and retention of personal data.
- No sensitive document uploads in the initial inquiry form.
- No passwords, seed phrases, private keys, or payment credentials requested.

## Unresolved before launch
- Select an email delivery provider and confirm the authorized receiving inbox.
- Define how inquiry data is stored, transmitted, accessed, and deleted.
- Publish an appropriate privacy notice based on the actual data workflow and applicable requirements.
- Test the complete inquiry path, including failure handling and abuse limits.
- Confirm hosting, HTTPS, and environment configuration.

Do not describe the form as secure until the chosen implementation and operational controls have been tested.
