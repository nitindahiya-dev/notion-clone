notion-clone/
│
├── README.md
├── .env.example
├── .gitignore
│
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── prisma.config.ts
│   ├── tsconfig.json
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │       ├── 20260806080544_init/
│   │       ├── 20260808082052_auth/
│   │       ├── 20260808160809_workspace/
│   │       ├── 20260810042942_page/
│   │       └── migration_lock.toml
│   │
│   └── src/
│       ├── index.ts
│       ├── app.ts
│       ├── server.ts
│       │
│       ├── config/
│       │   ├── env.ts
│       │   └── jwt.ts
│       │
│       ├── controllers/
│       │   ├── auth.controller.ts
│       │   ├── workspace.controller.ts
│       │   └── page.controller.ts
│       │
│       ├── database/
│       │   └── prisma.ts
│       │
│       ├── middlewares/
│       │   ├── auth.middleware.ts
│       │   ├── error.middleware.ts
│       │   ├── validate.middleware.ts
│       │   ├── workspace.middleware.ts
│       │   └── page.middleware.ts
│       │
│       ├── repositories/
│       │   ├── session.repository.ts
│       │   ├── user.repository.ts
│       │   ├── workspace.repository.ts
│       │   └── page.repository.ts
│       │
│       ├── routes/
│       │   ├── auth.routes.ts
│       │   ├── workspace.routes.ts
│       │   ├── page.routes.ts
│       │   └── index.ts
│       │
│       ├── services/
│       │   ├── auth.service.ts
│       │   ├── workspace.service.ts
│       │   └── page.service.ts
│       │
│       ├── types/
│       │   ├── express.d.ts
│       │   ├── workspace.ts
│       │   └── page.ts
│       │
│       ├── utils/
│       │   ├── app-error.ts
│       │   ├── hash.ts
│       │   ├── jwt.ts
│       │   └── response.ts
│       │
│       └── validators/
│           ├── auth.validator.ts
│           ├── workspace.validator.ts
│           └── page.validator.ts
│
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── eslint.config.mjs
│   ├── postcss.config.mjs
│   ├── components.json
│   │
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   │
│   │   ├── (auth)/
│   │   │   ├── layout.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   │
│   │   └── dashboard/
│   │       ├── page.tsx
│   │       │
│   │       ├── workspace/
│   │       │   └── new/
│   │       │       └── page.tsx
│   │       │
│   │       └── page/
│   │           └── [pageId]/
│   │               └── page.tsx
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   ├── auth-brand.tsx
│   │   │   ├── auth-divider.tsx
│   │   │   ├── google-button.tsx
│   │   │   ├── logout-button.tsx
│   │   │   ├── password-input.tsx
│   │   │   └── protected-route.tsx
│   │   │
│   │   ├── providers/
│   │   │   └── auth-provider.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── separator.tsx
│   │   │
│   │   ├── workspace/
│   │   │   ├── create-workspace-dialog.tsx
│   │   │   ├── workspace-card.tsx
│   │   │   ├── workspace-members.tsx
│   │   │   ├── workspace-settings.tsx
│   │   │   └── workspace-switcher.tsx
│   │   │
│   │   └── page/
│   │       ├── page-tree.tsx
│   │       ├── page-tree-item.tsx
│   │       ├── create-page-button.tsx
│   │       ├── page-actions.tsx
│   │       ├── page-header.tsx
│   │       └── page-empty-state.tsx
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── auth.ts
│   │   │   ├── client.ts
│   │   │   ├── workspace.ts
│   │   │   └── page.ts
│   │   │
│   │   ├── validations/
│   │   │   ├── auth.ts
│   │   │   ├── workspace.ts
│   │   │   ├── page.ts
│   │   │   └── validations/
│   │   │
│   │   └── utils.ts
│   │
│   ├── stores/
│   │   ├── auth.store.ts
│   │   ├── workspace.store.ts
│   │   └── page.store.ts
│   │
│   ├── types/
│   │   ├── auth.ts
│   │   ├── workspace.ts
│   │   └── page.ts
│   │
│   └── public/
│       ├── file.svg
│       ├── globe.svg
│       ├── next.svg
│       ├── vercel.svg
│       └── window.svg
│
├── docs/
│   ├── file_structure.md
│   ├── workspace.md
│   └── pages.md
│
└── scripts/




PHASE 3
│
├── 1. Prisma Page model
│
├── 2. Page repository
│
├── 3. Page service
│
├── 4. Page validation
│
├── 5. Page controller
│
├── 6. Page routes
│
├── 7. Page authorization
│
├── 8. Test API with curl
│
├── 9. Frontend page types
│
├── 10. Frontend API
│
├── 11. Zustand page store
│
├── 12. Page tree
│
├── 13. Create page
│
├── 14. Nested pages
│
├── 15. Dynamic page route
│
├── 16. Favorite
│
├── 17. Trash
│
└── 18. Restore





v0.1.0 → Project Foundation
v0.2.0 → Authentication
v0.3.0 → Workspace
v0.4.0 → Pages
v0.5.0 → Block System
v0.6.0 → Editor
v0.7.0 → Permissions
v0.8.0 → Comments
v0.9.0 → Realtime
v1.0.0 → Collaborative Editing
v1.1.0 → History
v1.2.0 → Search
v1.3.0 → Uploads
v1.4.0 → AI
v1.5.0 → Performance
v2.0.0 → Production Ready