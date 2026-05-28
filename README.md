# Yaswanth Reddy Jonnalagadda — Portfolio

Personal portfolio website for Yaswanth Reddy Jonnalagadda, Senior Network & Security Engineer. Built with TanStack Router, React, Vite, and Tailwind CSS v4. Features a dark navy design, sticky sidebar layout, content-driven sections, and a working contact form via Resend.

## Tech Stack

- **Framework**: TanStack Router (React + Vite, SPA mode)
- **Styling**: Tailwind CSS v4
- **Content**: Content Collections (Markdown files in `content/`)
- **Email**: Resend (via Vercel serverless function)
- **Hosting**: Vercel

## Local Development

```bash
npm install
npm run dev        # starts at http://localhost:3000
```

## Project Structure

- `content/jobs/` — Work experience entries (Markdown)
- `content/projects/` — Project showcase entries (Markdown)
- `content/education/` — Education entries (Markdown)
- `content/blog/` — Technical writing articles (Markdown)
- `src/routes/index.tsx` — Main portfolio page
- `src/routes/resume.tsx` — Resume page with PDF/Word download
- `src/routes/contact.tsx` — Contact form
- `api/contact.ts` — Vercel serverless function (Resend email delivery)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key for contact form email delivery |

## Deployment

Deployed on Vercel. Pushes to `main` auto-deploy to production.
