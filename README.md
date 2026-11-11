# Willys — a static restaurant site on Railway

A fictional Italian-American neighborhood restaurant, built with plain HTML, CSS, and an original SVG illustration. Includes a home page, menu, story, visit page, printable menu, and custom 404 page. No framework, JavaScript runtime, database, external fonts, or third-party image requests are needed to serve the site.

Willys does not accept orders or reservations. All menu items, prices, hours, and address details are illustrative.

## Run locally

Install Caddy 2.11.9 from the official Caddy distribution, then run from this directory:

```sh
caddy run --config Caddyfile --adapter caddyfile
```

Open http://localhost:8080. To check the routes with Node 22 or newer:

```sh
node scripts/verify.mjs http://localhost:8080
```

## Deploy on Railway

Deploy this repository as a GitHub service. Railway detects the Dockerfile and starts Caddy on port 8080. Generate a Railway-provided domain targeting port 8080. No environment variables, volumes, databases, or secrets are required.

For repeatable project configuration, this repository also includes `.railway/railway.ts`. With Railway CLI 5.71.0 and the pinned SDK installed:

```sh
npm ci
npm run check
railway login
railway init --name willys-static-site
railway config plan
railway config apply --yes
railway domain --service willys --port 8080
```

The definition creates a service sourced from this public repository. **If you fork the repository, change the GitHub source in `.railway/railway.ts` to your fork before applying.** Apply only to a dedicated new project: an IaC file describes the resources it manages, and removing managed resources from the file can remove them from Railway.

## Replace Willys with your site

1. Back up the old site and inventory URLs, redirects, forms, and host-specific behavior.
2. Replace `public/` with your exported or built static files. Keep a `404.html` error page, or adjust the Caddy error handler.
3. Preserve existing paths. Remove the sample `/food.html` redirect or replace it with your own exact redirect mappings.
4. Commit and push your changes. Test the Railway-provided domain before changing live DNS.
5. Add your own custom domain in Railway and follow the exact DNS records shown there. Preserve email records and the old host until verification is complete.

For frameworks, deploy the built static output, not server-rendered code. A backend, PHP runtime, Cloudflare Function, Vercel Function, or Netlify form processor is not recreated by copying HTML files. Translate provider-specific redirects and headers to the server configuration.

## Server behavior

- Caddy 2.11.9 in the official Alpine container; Railway terminates public TLS.
- Only `public/` is served; source configuration is outside the web root.
- Real files and directory indexes are served without an SPA catch-all.
- `/food.html` returns a 301 redirect to `/menu.html` as a migration example.
- Unknown paths return the custom page with a true 404 status.
- Conservative revalidation headers prevent long-lived stale menus and unversioned assets.
- JSON access logs go to stdout.
- `PORT` defaults to 8080; `SITE_ROOT` defaults to `public` locally and `/srv/public` in the container.

The application has no runtime npm dependencies. The pinned Railway package and TypeScript are development tools for the optional infrastructure definition.

## Costs and caching

Railway's Free plan includes $1 of monthly usage credit. Actual compute and traffic determine whether your site fits. This sample is not a promise of a particular monthly bill. CDN caching is an optional Railway service setting; it is not enabled by this starter. Check current plan and CDN documentation before relying on limits or cache behavior.

## License

MIT. All artwork in this repository is original illustrative demo artwork.
