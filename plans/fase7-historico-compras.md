# Fase 7 — Histórico de Compras (localStorage)

## Objetivo

Salvar pedidos realizados no `localStorage` e exibir um histórico no header.

## Implementação

### 1. Store Zustand — `src/store/use-orders.ts`

- Criar store com `persist` (localStorage, chave `red-crimson-orders`)
- `OrderItem`: id, name, price, image, quantity
- `OrderSummary`: orderId (ID do Stripe), date, total, items[], customerName, customerEmail
- Ação: `addOrder(order)` para adicionar ao histórico

### 2. Salvar ao finalizar compra

**Arquivo:** [`src/app/pedido/sucesso/page.tsx`](src/app/pedido/sucesso/page.tsx)

- Adicionar componente `"use client"` que:
  - Recebe `session_id` via prop
  - Faz fetch para `/api/orders/{session_id}` para obter dados do pedido
  - Salva no `useOrders` store (localStorage)

Ou, mais simples: modificar a success page para ser client component e chamar a store diretamente, já que o Stripe session_id já está disponível.

### 3. Componente — `src/components/orders/order-history-sheet.tsx`

- Similar ao CartSheet, mas mostra pedidos anteriores
- Cada pedido mostra: data, total, itens comprados
- Botão para ver detalhes (expandir)
- Sheet do shadcn/ui

### 4. Header — Adicionar ícone

**Arquivo:** [`src/components/layout/header.tsx`](src/components/layout/header.tsx)

- Adicionar ícone `Clock` ou `ScrollText` da lucide-react
- Abre o `OrderHistorySheet`
- Badge com número de pedidos

### 5. API Route — `src/app/api/orders/[session_id]/route.ts`

- Rota para buscar dados do pedido pelo stripeSessionId
- Retorna dados para o client salvar no localStorage

## Arquivos a Criar/Modificar

| Arquivo | Ação |
|---------|------|
| `src/store/use-orders.ts` | **Criar** — Zustand store com persist |
| `src/components/orders/order-history-sheet.tsx` | **Criar** — Sheet com histórico |
| `src/components/layout/header.tsx` | **Modificar** — Adicionar ícone de histórico |
| `src/app/pedido/sucesso/page.tsx` | **Modificar** — Salvar pedido no localStorage |
