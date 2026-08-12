# Project structure

```text
notion-clone/
├── README.md                         # Project overview and setup instructions
├── .env.example                      # Environment-variable template; no secrets
├── .gitignore
│
├── backend/                          # Express API and Prisma database layer
│   ├── .gitignore                    # Backend-specific ignore rules
│   ├── package.json                  # Backend scripts and dependencies
│   ├── package-lock.json             # Locked backend dependency versions
│   ├── prisma.config.ts              # Prisma CLI configuration
│   ├── tsconfig.json
│   ├── prisma/
│   │   ├── schema.prisma             # Database models and relationships
│   │   └── migrations/               # Applied, versioned database changes
│   │       ├── 20260806080544_init/
│   │       │   └── migration.sql
│   │       ├── 20260808082052_auth/
│   │       │   └── migration.sql
│   │       ├── 20260808160809_workspace/
│   │       │   └── migration.sql
│   │       ├── 20260810042942_page/
│   │       │   └── migration.sql
│   │       ├── 20260811041723_add_blocks/
│   │       │   └── migration.sql
│   │       └── migration_lock.toml
│   └── src/
│       ├── index.ts                  # Backend entry point
│       ├── app.ts                    # Express app and middleware setup
│       ├── server.ts                 # HTTP server startup
│       ├── config/                   # Runtime configuration
│       │   ├── env.ts
│       │   └── jwt.ts
│       ├── controllers/              # Translate HTTP requests into service calls
│       │   ├── auth.controller.ts
│       │   ├── block.controller.ts
│       │   ├── page.controller.ts
│       │   └── workspace.controller.ts
│       ├── database/
│       │   └── prisma.ts             # Shared Prisma client instance
│       ├── middlewares/              # Cross-cutting request processing
│       │   ├── auth.middleware.ts
│       │   ├── error.middleware.ts
│       │   ├── page.middleware.ts
│       │   ├── validate.middleware.ts
│       │   └── workspace.middleware.ts
│       ├── repositories/             # Database queries and persistence logic
│       │   ├── block.repository.ts
│       │   ├── page.repository.ts
│       │   ├── session.repository.ts
│       │   ├── user.repository.ts
│       │   └── workspace.repository.ts
│       ├── routes/                   # API route definitions
│       │   ├── auth.routes.ts
│       │   ├── block.routes.ts
│       │   ├── index.ts
│       │   ├── page.routes.ts
│       │   └── workspace.routes.ts
│       ├── services/                 # Application and business logic
│       │   ├── auth.service.ts
│       │   ├── block.service.ts
│       │   ├── page.service.ts
│       │   └── workspace.service.ts
│       ├── types/                    # Shared backend TypeScript declarations
│       │   ├── block.ts
│       │   ├── express.d.ts
│       │   ├── page.ts
│       │   └── workspace.ts
│       ├── utils/                    # Reusable backend helpers
│       │   ├── app-error.ts
│       │   ├── hash.ts
│       │   ├── jwt.ts
│       │   ├── request.ts
│       │   └── response.ts
│       └── validators/               # Request validation schemas
│           ├── auth.validator.ts
│           ├── page.validator.ts
│           └── workspace.validator.ts
│
├── frontend/                         # Next.js web application
│   ├── .gitignore                    # Frontend-specific ignore rules
│   ├── package.json                  # Frontend scripts and dependencies
│   ├── package-lock.json             # Locked frontend dependency versions
│   ├── tsconfig.json
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── eslint.config.mjs
│   ├── postcss.config.mjs
│   ├── components.json               # UI component-library configuration
│   ├── app/                          # Next.js App Router pages and layouts
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Landing page
│   │   ├── (auth)/                   # Auth route group; does not affect URLs
│   │   │   ├── layout.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   └── dashboard/                # Authenticated application area
│   │       ├── page.tsx
│   │       ├── workspace/
│   │       │   └── new/page.tsx       # Create-workspace page
│   │       └── page/
│   │           └── [pageId]/
│   │               └── page.tsx       # Dynamic page route
│   ├── components/                   # Reusable React components
│   │   ├── auth/                     # Authentication UI and route guards
│   │   │   ├── auth-brand.tsx
│   │   │   ├── auth-divider.tsx
│   │   │   ├── google-button.tsx
│   │   │   ├── logout-button.tsx
│   │   │   ├── password-input.tsx
│   │   │   └── protected-route.tsx
│   │   ├── page/                     # Page tree and page actions
│   │   │   ├── create-page-button.tsx
│   │   │   ├── page-actions.tsx
│   │   │   ├── page-empty-state.tsx
│   │   │   ├── page-header.tsx
│   │   │   ├── page-tree-item.tsx
│   │   │   └── page-tree.tsx
│   │   ├── providers/
│   │   │   └── auth-provider.tsx     # Supplies authentication state to the app
│   │   ├── ui/                       # Generic UI primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── separator.tsx
│   │   └── workspace/                # Workspace-specific UI
│   │       ├── create-workspace-dialog.tsx
│   │       ├── workspace-card.tsx
│   │       ├── workspace-members.tsx
│   │       ├── workspace-settings.tsx
│   │       └── workspace-switcher.tsx
│   ├── lib/                          # Shared client utilities and API access
│   │   ├── api/
│   │   │   ├── auth.ts
│   │   │   ├── client.ts             # Configured HTTP client
│   │   │   ├── page.ts
│   │   │   └── workspace.ts
│   │   ├── validations/               # Client-side request validation
│   │   │   ├── auth.ts
│   │   │   ├── page.ts
│   │   │   └── workspace.ts
│   │   └── utils.ts
│   ├── stores/                       # Client-side state stores
│   │   ├── auth.store.ts
│   │   ├── page.store.ts
│   │   └── workspace.store.ts
│   ├── types/                        # Frontend TypeScript types
│   │   ├── auth.ts
│   │   ├── page.ts
│   │   └── workspace.ts
│   └── public/                       # Static assets served without processing
│       ├── file.svg
│       ├── globe.svg
│       ├── next.svg
│       ├── vercel.svg
│       └── window.svg
│
├── docs/                             # Project documentation
│   ├── file_structure.md
│   └── workspace.md
└── scripts/                          # Reserved for project automation scripts
```

## Notes

- Local `.env` files are intentionally omitted because they contain machine-specific or secret values.
- Generated directories such as `node_modules/` and `frontend/.next/` are intentionally omitted.
- Tool-specific instruction folders and metadata are omitted because they are not part of the application runtime structure.
- Empty folders are omitted. The phase checklist and version roadmap belong in separate planning documentation, not in this file tree.
