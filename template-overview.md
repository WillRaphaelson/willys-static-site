# Deploy and Host Willys Static Restaurant Site on Railway

Willys is a fictional Italian-American restaurant website and a practical starting point for moving a static site to Railway. It includes a home page, menu, story, hours and visit page, printable menu, and a custom 404 page.

## About Hosting Willys Static Restaurant Site

One Caddy service serves plain HTML, CSS, and original SVG artwork. Railway builds the included Dockerfile. No database, persistent volume, secrets, framework build, or runtime npm installation is required. The site listens on port 8080. The generated public domain lets you inspect it before configuring a custom domain.

## Why Deploy Willys Static Restaurant Site on Railway?

Start with a simple site and keep room for a future API or database in the same Railway project. The starter preserves explicit file paths, includes a sample legacy redirect, and returns proper 404 responses. Replace the files under public/ with your own exported or generated static site.

## Common Use Cases

- Restaurant menus, small business sites, and portfolios.
- Learning a test-first migration from another static host.
- Starting with static pages before adding a backend.

## Dependencies for Willys Static Restaurant Site

- A Railway account with enough available usage credit or an appropriate plan.
- No required template input variables.
- A domain and access to DNS settings only if you want a custom domain.

### Deployment Dependencies

The public GitHub repository is WillRaphaelson/willys-static-site. The image uses official Caddy 2.11.9 Alpine. Willys is fictional and does not take orders or reservations. The Free plan includes $1 monthly usage credit; whether your deployment fits depends on actual resource usage and traffic.

To customize, fork the repository and connect your service to your fork, then replace public/ and adjust the sample redirect in Caddyfile. A template deploys the example; it does not import files from your current host. Provider-specific functions and form handlers need a separate migration.
