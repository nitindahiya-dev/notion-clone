notion-clone/
├── README.md                         # Project overview and setup instructions
├── .env.example                       # Root environment-variable template
├── .gitignore
│
├── backend/                           # Express API and database layer
│   ├── package.json
│   ├── package-lock.json               # Locked backend dependencies
│   ├── prisma.config.ts               # Prisma CLI configuration
│   ├── tsconfig.json
│   ├── prisma/
│   │   ├── schema.prisma              # Database schema and relations
│   │   └── migrations/                # Versioned database migrations
│   │       ├── 20260806080544_init/
│   │       │   └── migration.sql
│   │       ├── 20260808082052_auth/
│   │       │   └── migration.sql
│   │       └── migration_lock.toml
│   └── src/
│       ├── index.ts                   # Application entry point
│       ├── app.ts                     # Express app and middleware setup
│       ├── server.ts                  # HTTP server startup
│       ├── config/
│       │   ├── env.ts                 # Environment-variable loading
│       │   └── jwt.ts                 # JWT configuration
│       ├── controllers/               # HTTP request/response handlers
│       │   └── auth.controller.ts
│       ├── database/
│       │   └── prisma.ts              # Shared Prisma client
│       ├── middlewares/               # Reusable request middleware
│       │   ├── auth.middleware.ts
│       │   ├── error.middleware.ts
│       │   └── validate.middleware.ts
│       ├── repositories/              # Database access functions
│       │   ├── session.repository.ts
│       │   └── user.repository.ts
│       ├── routes/                    # API route definitions
│       │   ├── auth.routes.ts
│       │   └── index.ts
│       ├── services/                  # Business logic
│       │   └── auth.service.ts
│       ├── types/                     # TypeScript type declarations
│       │   └── express.d.ts
│       ├── utils/                     # Shared backend helpers
│       │   ├── app-error.ts
│       │   ├── hash.ts
│       │   ├── jwt.ts
│       │   └── response.ts
│       └── validators/                # Request validation schemas
│           └── auth.validator.ts
│
├── frontend/                          # Next.js web application
│   ├── package.json
│   ├── package-lock.json               # Locked frontend dependencies
│   ├── tsconfig.json
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── eslint.config.mjs
│   ├── postcss.config.mjs
│   ├── components.json                # UI component-library configuration
│   ├── app/                           # App Router pages and layouts
│   │   ├── globals.css
│   │   ├── favicon.ico
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── (auth)/
│   │   │   ├── layout.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   └── dashboard/page.tsx
│   ├── components/
│   │   ├── auth/                      # Authentication-specific components
│   │   │   ├── auth-brand.tsx
│   │   │   ├── auth-divider.tsx
│   │   │   ├── google-button.tsx
│   │   │   └── password-input.tsx
│   │   ├── providers/
│   │   │   └── auth-provider.tsx      # Client-side auth context/provider
│   │   └── ui/                        # Reusable UI primitives
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── separator.tsx
│   ├── lib/
│   │   ├── api/                       # API client and endpoint functions
│   │   │   ├── auth.ts
│   │   │   └── client.ts
│   │   ├── validations/               # Frontend validation schemas
│   │   │   ├── auth.ts
│   │   │   └── validations/            # Reserved for shared validation helpers
│   │   └── utils.ts
│   ├── stores/
│   │   └── auth.store.ts              # Client-side authentication state
│   ├── types/
│   │   └── auth.ts                    # Frontend auth types
│   └── public/                        # Static assets served as-is
│       ├── file.svg
│       ├── globe.svg
│       ├── next.svg
│       ├── vercel.svg
│       └── window.svg
│
├── docs/
│   └── file_structure.md              # This document
└── scripts/                           # Project maintenance scripts

## Notes

- Local environment files such as `backend/.env` and `frontend/.env` are intentionally not listed because they contain machine-specific or secret values.
- Generated directories such as `node_modules/` and `frontend/.next/` are intentionally omitted.
- Tool-specific instruction directories are also omitted because they do not belong to the application runtime structure.