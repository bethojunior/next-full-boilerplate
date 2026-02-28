# Next Full Stack Boilerplate

Boilerplate full stack com **Next.js 15**, **React 19**, **Prisma**, **PostgreSQL** e autenticação JWT. Inclui dashboard com sidebar, formulários validados com Zod e UI baseada em Radix + Tailwind.

---

## 🛠 Stack

| Camada | Tecnologia |
|--------|------------|
| **Framework** | Next.js 15 (App Router) |
| **UI** | React 19, Tailwind CSS, Radix UI, shadcn/ui |
| **Backend** | API Routes, Prisma ORM |
| **Banco** | PostgreSQL |
| **Auth** | JWT (jsonwebtoken), bcryptjs |
| **Validação** | Zod |
| **HTTP Client** | Axios |
| **Forms** | React Hook Form + @hookform/resolvers |

---

## ✨ Funcionalidades

- **Autenticação**: login e registro de usuários com JWT
- **Contexto de auth**: `AuthContext` + hook `useAuth` com persistência em `localStorage`
- **Rotas protegidas**: layout dashboard com redirect para login se não autenticado
- **API**: use cases por rota (login, register), validação com Zod
- **Dashboard**: sidebar (shadcn), páginas Dashboard e Settings
- **Docker**: PostgreSQL e app containerizados; compose para dev e produção
- **Makefile**: comandos para build e subir ambiente dev

---

## 📁 Estrutura do projeto

```
├── app/
│   ├── (dashboard)/          # Rotas protegidas (dashboard)
│   │   ├── dashboard/
│   │   ├── settings/
│   │   └── layout.tsx        # Layout com sidebar + proteção de rota
│   ├── api/
│   │   └── auth/
│   │       ├── login/       # POST /api/auth/login
│   │       └── register/    # POST /api/auth/register
│   ├── layout.tsx           # Root layout + AuthProvider
│   └── page.tsx             # Página inicial (login)
├── components/
│   ├── auth/                # Login, registro
│   ├── sidebar/             # Sidebar do dashboard
│   └── ui/                  # Componentes shadcn/ui
├── contexts/
│   └── AuthContext.tsx      # Estado global de autenticação
├── hooks/
│   └── use-auth.ts          # Hook para acessar AuthContext
├── services/
│   ├── api.ts               # Cliente Axios (baseURL /api, interceptors)
│   └── auth/
├── @schemas/
│   └── api/auth/            # Schemas Zod (login, register)
├── prisma/
│   ├── schema.prisma        # Model User
│   └── migrations/
├── infra/
│   ├── docker-compose.yaml       # App + Postgres (produção)
│   ├── docker-compose-dev.yaml   # Apenas Postgres (dev local)
│   └── Dockerfile
└── makefile                 # build, up-dev, down-dev
```

---

## 🚀 Como rodar

### Pré-requisitos

- Node.js 18+
- Yarn (ou npm/pnpm)
- Docker e Docker Compose (para banco ou app completo)

### 1. Clonar e instalar dependências

```bash
git clone <repo-url>
cd next-full-boilerplate
yarn install
```

### 2. Variáveis de ambiente

Copie o exemplo e ajuste se necessário:

```bash
cp .env.example .env
```

Exemplo (`.env`):

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | URL do PostgreSQL (ex: `postgresql://root:password@localhost:5432/mydatabase`) |
| `NEXT_PUBLIC_APP_PORT` | Porta do app (ex: 3000) |
| `NEXT_PUBLIC_APP_URL` | URL pública do app |
| `NEXT_PUBLIC_APP_NAME` | Nome da aplicação |
| `NEXT_PUBLIC_APP_VERSION` | Versão |

### 3. Banco de dados

**Opção A – Docker (apenas Postgres, dev)**

```bash
make up-dev
```

Isso sobe o PostgreSQL definido em `infra/docker-compose-dev.yaml`. Para derrubar:

```bash
make down-dev
```

**Opção B – App + Postgres com Docker**

```bash
make build
docker-compose -f infra/docker-compose.yaml up -d
```

### 4. Migrations e cliente Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Desenvolvimento

```bash
yarn dev
```

Acesse: [http://localhost:3000](http://localhost:3000) (ou a porta configurada em `NEXT_PUBLIC_APP_PORT`).

### 6. Build para produção

```bash
yarn build
yarn start
```

---

## 🔌 API

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/auth/login` | Login (email, password). Retorna `user` e `token`. |
| `POST` | `/api/auth/register` | Registro (name, email, password, phone). Retorna usuário criado. |

O cliente em `services/api.ts` usa `baseURL: '/api/'` e envia o token no header `Authorization: Bearer <token>`.

---

## 📦 Scripts

| Comando | Descrição |
|---------|-----------|
| `yarn dev` | Servidor de desenvolvimento |
| `yarn build` | Build de produção |
| `yarn start` | Servidor de produção |
| `yarn lint` | Lint do projeto |
| `make up-dev` | Sobe Postgres (docker-compose-dev) |
| `make down-dev` | Derruba ambiente dev |
| `make build` | Build da imagem Docker (compose produção) |

---

## 📄 Licença

Uso livre para projetos pessoais e comerciais. Ajuste conforme sua necessidade.
