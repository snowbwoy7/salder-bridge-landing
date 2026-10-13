# Salder Bridge Landing Page — Project Specification

## Objective
Create an independent, conversion-focused landing page for Salder Bridge that encourages potential clients in the US, UK, and Europe to request an initial case review.

## Brand and content rules
- Preserve the existing Salder Bridge brand identity.
- Reuse the exact logo, colors, typography, imagery, and other brand assets from https://salderbridge.com/ wherever available.
- Do not invent a replacement logo or new brand identity.
- Use the contact information and address published on the existing website, as instructed by the client.
- Treat public-site details as client-provided information, not as independently verified facts.
- Do not invent testimonials, credentials, partnerships, recovery rates, client counts, case studies, or recovery guarantees.
- Do not publish existing testimonials or claims as verified evidence unless the client confirms and can substantiate them.
- Do not imply guaranteed recovery or certainty of outcome.

## Audience and conversion
- Audience: United States, United Kingdom, and Europe.
- Primary conversion: Request an initial case review.
- Contact channels: email and an inquiry form.

## First-release scope
- Responsive public landing page.
- Clear description of the service, subject to available client-provided information.
- Simple explanation of the inquiry/review process.
- FAQ and contact section.
- Email and inquiry-form conversion paths.
- Privacy notice and appropriate disclosures before collecting personal information.
- Accessible, responsive design and basic performance checks.
- Server-side validation, rate limiting, safe error responses, and secure email delivery before enabling the form.

## Explicit exclusions
- No custom admin portal for the initial release.
- No customer accounts or case-management dashboard.
- No fabricated trust signals.
- No upload field for sensitive evidence in the initial inquiry form.
- No real email credentials in source control.
- Do not modify the separate Business Landing System project.

## Content handling
The existing public website is the starting reference. Unknown facts should remain clearly marked as needing client confirmation. If a claim cannot be supported, omit it rather than manufacture evidence.

## Architecture plan
- Semantic HTML, CSS, and lightweight browser JavaScript.
- Node.js/Express inquiry endpoint only when the email-delivery configuration is selected and can be secured.
- Keep email credentials in environment variables on the server.
- Collect only the minimum information required for an initial inquiry.
- No sensitive documents, passwords, seed phrases, private keys, or payment credentials in the initial form.

## Current status
This is the initial scaffold. Branding assets and exact style values still need to be copied from the existing site before the visual design can be considered matched.
