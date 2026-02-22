# CV CMS

A multi-tenant Headless CMS for managing professional career data. Store atomic "highlights" (achievements, projects, responsibilities) with rich metadata, and generate AI-tailored resumes.

**[Demo](https://cv.vladpr.com)**

## Features

- **Atomic Highlights** — Break down experience into granular, reusable units with metrics, skills, domains, and keywords
- **Timeline View** — Visualize career progression chronologically, grouped by job
- **Smart Search** — Filter by type, skills, domains, and metrics
- **Multi-Tenant** — Each authenticated user gets a dedicated Turso database
- **Anonymous Mode** — Works without an account using IndexedDB in the browser
- **OAuth Sign-In** — GitHub and Google via Auth.js, with automatic local-to-cloud data migration on first login
- **Profile & Contacts** — Store name, email, phone, location, LinkedIn, GitHub, website, Telegram
- **AI Resume Optimizer** — Paste a job posting, get a tailored resume via n8n webhook integration
- **Inline Editing** — Edit generated resumes directly in the browser before exporting to PDF
- **Backup & Restore** — Full JSON export/import with idempotent slug-based IDs

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Auth:** Auth.js v5 (next-auth) — GitHub + Google OAuth, JWT sessions
- **Database:** Turso (libSQL/SQLite edge) + Drizzle ORM
- **Client Storage:** Dexie (IndexedDB) for anonymous users
- **Data Fetching:** TanStack Query (React Query)
- **Styling:** Tailwind CSS + shadcn/ui
- **Validation:** Zod
- **Deployment:** Vercel (or any Node.js host)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/vladpr-com/cv-cms.git
cd cv-cms

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Architecture

### DataLayer Pattern

All data operations go through a `DataLayer` interface (`src/lib/data-layer/types.ts`), with three implementations:

| Implementation | Storage | Used When |
|---------------|---------|-----------|
| `ClientDataLayer` | IndexedDB (Dexie) | Anonymous users in browser |
| `ServerDataLayer` | Turso (Drizzle) | Server-side for authenticated users |
| `ServerActionProxy` | Calls Server Actions | Client-side for authenticated users |

A `DataContext` React context provides `useDataLayer()` to components, automatically selecting the right implementation.

### Multi-Tenant Database

- **Admin DB** — Auth.js tables (users, accounts, sessions) + `userDatabases` mapping table
- **Per-user DBs** — Provisioned via Turso Platform API on first login

### Data Model

Three tables (`src/db/schema.ts`):

- **Jobs** — Employment contexts (company, role, dates)
- **Highlights** — Atomic experience units with type, tags (domains/skills/keywords), metrics, and soft delete
- **Profile** — Single-row table for name and contact info

## Database Setup

### Option 1: Anonymous Only (no setup)

Just run `npm run dev`. Anonymous users get IndexedDB storage automatically — no database configuration needed.

### Option 2: Full Multi-Tenant (Turso)

```bash
# In .env.local, configure all variables from .env.example:
# - TURSO_ADMIN_DB_URL + TURSO_ADMIN_DB_TOKEN (admin DB)
# - TURSO_PLATFORM_API_TOKEN + TURSO_ORG_NAME (DB provisioning)
# - AUTH_SECRET + OAuth provider credentials

# Push schema to admin DB
npx dotenv -e .env.local -- npm run db:admin:push
```

## Environment Variables

See [`.env.example`](.env.example) for the full list with section comments. Key groups:

| Group | Variables | Required For |
|-------|-----------|-------------|
| Multi-tenant | `TURSO_ADMIN_DB_*`, `TURSO_PLATFORM_API_TOKEN`, `TURSO_ORG_NAME` | Per-user DB provisioning |
| Auth | `AUTH_SECRET`, `AUTH_GITHUB_*`, `AUTH_GOOGLE_*` | OAuth sign-in |

The n8n webhook URL is stored in the user's browser (`localStorage`), not as a server env var.

## n8n Integration

The `/optimize` page integrates with an external n8n workflow for AI resume generation:

1. User pastes a job description and clicks "Generate Resume"
2. Server action fetches user's career data (profile, jobs, highlights)
3. Data is sent to the n8n webhook URL (configured in Settings)
4. n8n workflow processes the data with an LLM and returns a structured JSON resume
5. Server action injects contact info from the profile DB (personal data is never sent to the LLM)

You can build any n8n workflow that accepts `{ vacancyText, highlightsData }` via webhook POST and returns a JSON resume. See the `ResumeData` type in `src/app/actions/optimize.ts` for the expected response format.

## Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run lint             # ESLint

# User Data DB (Drizzle + Turso)
npm run db:generate      # Generate migrations
npm run db:migrate       # Apply migrations
npm run db:push          # Push schema (dev only)
npm run db:studio        # Open Drizzle Studio GUI
npm run db:seed          # Seed test data

# Admin DB (auth, user metadata)
npm run db:admin:generate
npm run db:admin:migrate
npm run db:admin:push
```

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

For security vulnerabilities, please see the [Security Policy](SECURITY.md).

## License

[MIT](LICENSE)
