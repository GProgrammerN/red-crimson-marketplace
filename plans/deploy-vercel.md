# Deploy para Vercel — Red Crimson Marketplace

## Pré-requisitos

- [ ] Conta no [Vercel](https://vercel.com) (criar com GitHub)
- [ ] Conta no [Neon](https://neon.tech) (PostgreSQL grátis) ou manter Prisma Postgres local

## Passo a Passo

### 1. Criar banco PostgreSQL na Neon (grátis)

1. Acesse [neon.tech](https://neon.tech) e faça login com GitHub
2. Crie um novo projeto
3. Copie a **connection string** (começa com `postgres://...`)

### 2. Configurar variáveis de ambiente

No Vercel, ao fazer deploy, adicione estas variáveis:

| Variável | Valor | Obrigatório |
|----------|-------|-------------|
| `DATABASE_URL` | Connection string do Neon | ✅ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` (sua chave) | ✅ |
| `STRIPE_SECRET_KEY` | `sk_test_...` (sua chave) | ✅ |
| `NEXT_PUBLIC_APP_URL` | `https://seu-site.vercel.app` | ✅ |

### 3. Deploy

#### Opção A — Via GitHub (recomendado)

```bash
# 1. Suba o código para um repositório GitHub
git init
git add .
git commit -m "Red Crimson Marketplace"
git remote add origin https://github.com/seu-usuario/nome-repo.git
git push -u origin main

# 2. No Vercel, importe o repositório
# 3. Adicione as env vars no painel do Vercel
# 4. Deploy automático
```

#### Opção B — Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### 4. Pós-deploy

- [ ] Rodar migração no banco Neon: `npx prisma db push`
- [ ] Rodar seed: `npx prisma db seed` (ou via script na Neon)
- [ ] Configurar domínio personalizado (opcional)

### 5. Stripe Webhook (para marcar pedidos como pagos)

1. No dashboard do Stripe: Developers → Webhooks → Add endpoint
2. URL: `https://seu-site.vercel.app/api/webhooks/stripe`
3. Evento: `checkout.session.completed`
4. Copie o `Signing secret` (`whsec_...`) e adicione como `STRIPE_WEBHOOK_SECRET` no Vercel
