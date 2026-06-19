# 🔍 Plano de Debug — Banco de Dados Neon

## Problema
- `prisma db push` ✅ (tabelas criadas)
- `npm run seed` ✅ (16 produtos inseridos)
- `[DB] Produtos encontrados: 0` ❌ (app não vê os dados)

## Etapas

### 8.1 — Verificar qual URL cada parte está usando

**Fato:** Existem 2 maneiras de conectar ao DB:
1. `src/lib/prisma.ts` — usa `@prisma/adapter-pg` + `process.env.DATABASE_URL` do `.env`
2. `prisma db push` — usa `prisma.config.ts` que lê do mesmo `process.env["DATABASE_URL"]`
3. `prisma/seed.ts` — também usa `@prisma/adapter-pg` + `process.env.DATABASE_URL`

**Ação:** Adicionar log no `prisma.ts` para imprimir a URL (escondendo senha):

```ts
// DEBUG temporário
const dbUrl = (process.env.DATABASE_URL ?? "").replace(/:[^:@]+@/, ':****@');
console.log('[DB] Conectando a:', dbUrl);
```

### 8.2 — Query isolada (fora do Next.js)

Criar script `debug-check-db.ts` que:
1. Conecta ao DB (mesmo adapter)
2. Conta produtos: `prisma.product.count()`
3. Busca 5 produtos: `prisma.product.findMany({ take: 5 })`
4. Mostra nomes e `isFeatured` de cada

Isola o problema: é no PrismaClient ou no Next.js?

### 8.3 — Testar sem filtro `isFeatured`

O filtro `isFeatured: true` na homepage pode estar matando a query.
Se os produtos foram inseridos com `isFeatured: false`, retornará 0.

**Ação:** No script de debug, buscar:
```ts
const featured = await prisma.product.findMany({ where: { isFeatured: true } });
const all = await prisma.product.findMany({ take: 5 });
console.log('Featured:', featured.length, 'Total:', all.length, all.map(p => ({ name: p.name, featured: p.isFeatured })));
```

### 8.4 — Seed + query imediata

O seed mostra sucesso, mas pode estar:
- Inserindo em outro banco (ex: `prisma+postgres://` local vs `postgresql://` Neon)
- Dando commit que não persiste (transação)
- Sendo executado em schema diferente (ex: `public` vs outro)

**Ação:** Rodar seed e IMEDIATAMENTE após, rodar debug script no MESMO terminal.

### 8.5 — Causas prováveis (hipóteses)

| # | Hipótese | Como testar |
|---|----------|-------------|
| A | `.env` tem URL diferente do que o seed usou | Steps 8.1 + 8.2 |
| B | Produtos não têm `isFeatured: true` | Step 8.3 |
| C | Seed insere em schema diferente da leitura | Step 8.4 |
| D | Pooler do Neon limita conexões e o seed falha silenciosamente | Step 8.2 (retry) |
| E | `prisma db push` cria tabelas num schema, seed noutro | Step 8.4 |

### 8.6 — Remover debug

Após identificar e corrigir, apagar:
- `debug-check-db.ts`
- Logs temporários no `prisma.ts`
- Logs temporários no `page.tsx`
- Manter apenas logs úteis permanentes (ex: `[DB] Produtos encontrados: N`)
