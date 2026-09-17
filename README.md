# Finbus v3

Production-oriented static website for Finbus Global Consulting.

## Cloudflare Pages
- Framework preset: None
- Build command: leave blank
- Build output directory: `/`
- Custom domains: `finbus.org` and `www.finbus.org`

## Contact form
The UI is complete, but email delivery is intentionally disabled until a mail provider is configured. The included Cloudflare Pages Function supports Resend. Configure these environment variables in Cloudflare Pages:
- `RESEND_API_KEY`
- `CONTACT_FROM` (a verified sender such as `Finbus Website <website@finbus.org>`)

Messages are sent to the confirmed address `info@finbus.org`.

## Before launch
1. Review privacy, terms and cookie drafts against the final production configuration.
2. Configure and test contact-form email delivery.
3. Connect `finbus.org` and `www.finbus.org`.
4. Verify SSL and redirect behaviour.
5. Submit `https://finbus.org/sitemap.xml` to search engines after launch.
6. Add analytics only after selecting the analytics platform and updating the privacy/cookie notice.
