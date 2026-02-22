# Contributing to CV CMS

Thank you for your interest in contributing to CV CMS! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates.

When filing a bug report, include:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node.js version, browser)

### Suggesting Features

Feature requests are welcome! Please:
- Search existing issues for similar suggestions
- Provide a clear use case and rationale

### Pull Requests

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cv-cms.git
   cd cv-cms
   npm install
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/issue-description
   ```

3. **Make Changes**
   - Follow existing code style
   - Write meaningful commit messages (Conventional Commits)
   - Add tests if applicable
   - Update documentation as needed

4. **Test Locally**
   ```bash
   npm run lint
   npm run build
   ```

5. **Submit PR**
   - Reference any related issues
   - Provide a clear description of changes
   - Be responsive to review feedback

## Development Setup

### Prerequisites
- Node.js 20+
- npm or pnpm

### Local Development
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start dev server
npm run dev
```

### Database Options

**Option 1: Anonymous only (no setup needed)**

Just run `npm run dev` — anonymous users get IndexedDB storage automatically.

**Option 2: Full Multi-Tenant (Turso)**
```bash
# In .env.local, configure all variables from .env.example:
# - TURSO_ADMIN_DB_* (admin DB)
# - TURSO_PLATFORM_API_TOKEN + TURSO_ORG_NAME (DB provisioning)
# - AUTH_SECRET + OAuth provider credentials
```

### Database Commands
```bash
npm run db:generate   # Generate migrations
npm run db:push       # Push schema (dev only)
npm run db:migrate    # Run migrations
npm run db:studio     # Open Drizzle Studio
npm run db:seed       # Seed test data
```

## Code Style

- **TypeScript** everywhere
- **ESLint** for linting (`npm run lint`)
- Use **Server Actions** for mutations (not API routes)
- Use **Zod** for validation on both client and server
- Follow existing patterns in the codebase

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(scope): add new feature
fix(scope): fix bug description
docs: update documentation
refactor(scope): refactor code
test: add tests
chore: maintenance tasks
```

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── actions.ts        # Server Actions (CRUD, export)
│   ├── actions/          # Additional server actions
│   ├── page.tsx          # Timeline view (main page)
│   ├── optimize/         # AI resume optimizer
│   └── settings/         # User settings
├── auth/                 # Auth.js config + admin schema
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── auth/             # Auth components
│   ├── profile/          # Profile editing
│   └── *.tsx             # Feature components
├── contexts/             # React contexts (DataContext)
├── db/
│   ├── schema.ts         # Drizzle schema (jobs, highlights, profile)
│   ├── index.ts          # Database connections
│   └── turso-platform.ts # Turso Platform API client
└── lib/
    ├── data-layer/       # DataLayer interface + implementations
    ├── types.ts          # Shared TypeScript types
    └── data-types.ts     # Composite types
```

## Need Help?

- Open a [Discussion](https://github.com/vladpr-com/cv-cms/discussions)
- Review [existing issues](https://github.com/vladpr-com/cv-cms/issues)

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
