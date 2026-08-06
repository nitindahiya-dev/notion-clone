notion-clone/
│
├── README.md
├── .env.example
├── .gitignore
│
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── prisma.config.ts
│   ├── skills-lock.json
│   ├── .env
│   ├── .gitignore
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │       └── 20260806080544_init/
│   │           └── migration.sql
│   └── src/
│       ├── app.ts
│       ├── index.ts
│       ├── server.ts
│       ├── config/
│       │   └── env.ts
│       ├── controllers/
│       ├── database/
│       ├── middlewares/
│       ├── repositories/
│       ├── routes/
│       ├── services/
│       ├── types/
│       ├── utils/
│       └── validators/
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
│   ├── .env
│   ├── .gitignore
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/
│   │       └── button.tsx
│   ├── lib/
│   │   └── utils.ts
│   └── public/
│       ├── file.svg
│       ├── globe.svg
│       ├── next.svg
│       ├── vercel.svg
│       └── window.svg
│
├── docs/
└── scripts/