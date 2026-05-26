# Elara Voss — Portfolio

A minimalist personal portfolio website built with TanStack Start, React, and Tailwind CSS v4. Features a dark navy design system with a clean single-column layout, content-driven sections, and smooth hover interactions.

## Tech Stack

- **Framework**: TanStack Start (React + Vite)
- **Styling**: Tailwind CSS v4
- **Content**: Content Collections (Markdown files in `content/`)
- **Hosting**: Netlify

## Local Development

```bash
npm install
npm run dev        # starts at http://localhost:3000
```

## Project Structure

- `content/jobs/` — Work experience entries (Markdown frontmatter)
- `content/projects/` — Project showcase entries
- `content/education/` — Education entries
- `src/routes/index.tsx` — Main portfolio page (About, Experience, Projects, Contact)
- `src/routes/resume.tsx` — Full résumé page
- `src/routes/projects.tsx` — All projects grid

## Customisation

Edit the Markdown files in `content/` to update experience, projects, and education. The site rebuilds automatically on deploy.
