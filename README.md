# Sféra pro domov — services website

A Czech services website presenting home climate and energy solutions. It combines service pages, project references, editorial content and enquiry interfaces with a Sanity content integration.

**Status:** Portfolio website source; deployment, analytics and enquiry delivery have not been revalidated in this review.

## Scope

- Dedicated pages for air conditioning, heat pumps, ventilation, photovoltaics and electrical installation.
- Blog and reference routes, including detail pages.
- Sanity client and embedded Studio route for content management.
- Reusable service/product presentation, contact forms, cookie-consent and analytics components.

## Technology

Next.js, React, TypeScript, Tailwind CSS, Sanity.

## Architecture and source map

- `app/` — service, blog, reference and Studio routes
- `components/` — layout, enquiry forms and reusable UI
- `app/lib/sanity.client.ts` — Sanity client configuration
- `SANITY_SETUP.md` — existing CMS setup notes

## Local development

Requires Node.js and npm. From the repository root:

```sh
npm install
npm run dev
```

Build command declared by this checkout: `npm run build`.

These are the repository scripts, not a claim of a passing build. Dependency installation, build and live integrations were not executed during the documentation review.

## Configuration and limitations

The Sanity client reads `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and `SANITY_API_TOKEN`. Supply configuration through local/hosting settings and keep private tokens server-side. Review `SANITY_SETUP.md` and the analytics-specific documentation before enabling integrations. Contact-form components exist, but delivery needs a separately verified destination.

Generated `dist/` and `.sanity/runtime/` content is present. Treat the source directories as the implementation reference; generated assets have not been cleaned in this documentation change.

## Portfolio relevance

Demonstrates maintainable page composition, CMS integration and the practical configuration work involved in operating a business website.

## Documentation next steps

Capture screenshots using synthetic data, document a reproducible test run, and record which integrations have been verified. Keep credentials and deployment-specific configuration outside version control.
