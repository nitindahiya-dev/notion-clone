notion-clone/
│
├── README.md
├── .env.example
├── .gitignore
│
├── backend/
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── prisma.config.ts
│   ├── tsconfig.json
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   └── src/
│       │
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
│       │   └── workspace.controller.ts       
│       │
│       ├── database/
│       │   └── prisma.ts
│       │
│       ├── middlewares/
│       │   ├── auth.middleware.ts
│       │   ├── error.middleware.ts
│       │   ├── validate.middleware.ts
│       │   └── workspace.middleware.ts        
│       │
│       ├── repositories/
│       │   ├── session.repository.ts
│       │   ├── user.repository.ts
│       │   └── workspace.repository.ts        
│       │
│       ├── routes/
│       │   ├── auth.routes.ts
│       │   ├── workspace.routes.ts             
│       │   └── index.ts
│       │
│       ├── services/
│       │   ├── auth.service.ts
│       │   └── workspace.service.ts            
│       │
│       ├── types/
│       │   ├── express.d.ts
│       │   └── workspace.ts                    
│       │
│       ├── utils/
│       │   ├── app-error.ts
│       │   ├── hash.ts
│       │   ├── jwt.ts
│       │   └── response.ts
│       │
│       └── validators/
│           ├── auth.validator.ts
│           └── workspace.validator.ts          
│
├── frontend/
│   │
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
│   │       └── page.tsx
│   │
│   ├── components/
│   │   │
│   │   ├── auth/
│   │   │   ├── auth-brand.tsx
│   │   │   ├── auth-divider.tsx
│   │   │   ├── google-button.tsx
│   │   │   └── password-input.tsx
│   │   │
│   │   ├── workspace/                     
│   │   │   ├── workspace-switcher.tsx
│   │   │   ├── workspace-card.tsx
│   │   │   ├── create-workspace-dialog.tsx
│   │   │   ├── workspace-settings.tsx
│   │   │   └── workspace-members.tsx
│   │   │
│   │   ├── providers/
│   │   │   └── auth-provider.tsx
│   │   │
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── separator.tsx
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── auth.ts
│   │   │   ├── client.ts
│   │   │   └── workspace.ts              
│   │   │
│   │   ├── validations/
│   │   │   ├── auth.ts
│   │   │   └── workspace.ts               
│   │   │
│   │   └── utils.ts
│   │
│   ├── stores/
│   │   ├── auth.store.ts
│   │   └── workspace.store.ts             
│   │
│   ├── types/
│   │   ├── auth.ts
│   │   └── workspace.ts                   
│   │
│   └── public/
│
├── docs/
│   ├── file_structure.md
│   └── workspace.md                        
│
└── scripts/