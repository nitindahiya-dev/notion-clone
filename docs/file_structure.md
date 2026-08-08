notion-clone/
│
├── README.md
├── .env.example
├── .gitignore
│
├── backend/
│
├── config/
│   ├── env.ts
│   └── jwt.ts
│
├── controllers/
│   └── auth.controller.ts
│
├── services/
│   └── auth.service.ts
│
├── repositories/
│   └── user.repository.ts
│
├── routes/
│   ├── auth.routes.ts
│   └── index.ts
│
├── middlewares/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validate.middleware.ts
│
├── validators/
│   └── auth.validator.ts
│
├── utils/
│   ├── hash.ts
│   ├── jwt.ts
│   └── response.ts
│
├── types/
│
├── app.ts
├── server.ts
└── index.ts
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