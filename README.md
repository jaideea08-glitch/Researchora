# Researchora: AI-Powered Research Community

Researchora is a frontend-first research and knowledge-sharing platform built with Next.js. It brings research discovery, publishing, discussion, reading history, following, and AI-assisted exploration into one polished experience.

## Core Features

- **Research discovery:** Browse a focused home experience for research content and community activity.
- **Post publishing:** Create and submit research posts through the integrated post composer.
- **AI assistant:** Ask research-related questions through the AI assistant experience and API route.
- **AI demonstration:** Explore the product's AI capabilities through a dedicated interactive demo.
- **Personalized reading:** Track reading history and follow research or community content that matters to you.
- **Authentication-ready workflows:** Connect user accounts and profile data through Supabase authentication.
- **Responsive product experience:** Use the platform across desktop and mobile layouts with light and dark mode support.

---

## Tech Stack

- **Application Framework:** Next.js 16 with the App Router
- **Language:** TypeScript
- **UI and Styling:** React, Tailwind CSS, and custom global styles
- **Motion and Icons:** Framer Motion and Lucide React
- **Backend Services:** Supabase database and authentication
- **Deployment:** Vercel or another platform that supports Next.js

---

## Getting Started

### Prerequisites

- Node.js and npm
- A Supabase project
- Written permission from the repository owner

### Installation and Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create the local environment file:**

   Create a file named `.env.local` in the project root and add the required values below. Do not commit this file to source control.

3. **Configure Supabase:**

   Create a Supabase project and add the required values to `.env.local`:

   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   The application also accepts the public equivalents `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` where applicable.

4. **Create the database tables:**

   Run the SQL in `supabase-schema.sql` in the Supabase SQL editor. The application expects the `posts` and `profiles` tables for its primary content and authentication workflows.

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_URL` | Public Supabase project URL alternative |
| `SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public Supabase key alternative |
| `OPENAI_API_KEY` | Optional key for enabling additional AI functionality |

Never commit `.env.local` or expose private credentials in source control.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Build the production application
npm run start    # Start the production server
npm run lint     # Run the configured lint command
npm run python:install # Install the Python API dependencies
npm run python:dev     # Start the equivalent Python API on port 5000
```

## Python API

The `python_service` directory contains a Flask implementation of the same API contracts as the Next.js route handlers:

- `GET /api/posts`
- `POST /api/posts`
- `POST /api/ai-assistant`

It uses the same Supabase and Gemini environment variables. Install its dependencies with `npm run python:install`, then start it with `npm run python:dev`. The Next.js frontend continues to use its local route handlers by default; deploy the Python service separately when a Python backend is preferred.

## Project Structure

```text
app/
├── api/                 # API routes for posts and the AI assistant
├── ai-assistant/        # AI assistant experience
├── ai-demo/             # Interactive AI demonstration
├── blog/                # Blog view
├── features/            # Feature overview
├── following/           # Followed content view
├── home/                # Main application home view
├── pricing/             # Pricing view
└── reading-history/     # Reading history view
components/              # Shared navigation, auth, composer, and home components
lib/                     # Supabase client setup
supabase-schema.sql      # Database schema
```

## Deployment

1. Push the approved repository to a Git provider.
2. Import the project into Vercel or another Next.js-compatible host.
3. Configure the required Supabase environment variables in the hosting provider.
4. Deploy the application using the provider's standard Next.js build settings.

Deployment and production use also require explicit written permission from the repository owner.

## License

This repository is not released under an open-source license. All rights are reserved. Any use outside personal evaluation requires prior written permission.
