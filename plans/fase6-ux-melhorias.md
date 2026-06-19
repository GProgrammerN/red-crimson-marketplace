# Fase 6 — Melhorias de UX

## 1. Animação ao adicionar ao carrinho

**Arquivos:**
- [`src/components/product/add-to-cart-button.tsx`](src/components/product/add-to-cart-button.tsx)
- [`src/components/cart/cart-sheet.tsx`](src/components/cart/cart-sheet.tsx) — badge do header

**Implementação:**
- Criar keyframe CSS `@keyframes cart-bounce` no globals.css
- No `AddToCartButton`, ao clicar, setar estado `animating: true` e remover após 400ms
- Adicionar classe `animate-cart-bounce` ao botão durante animação
- No header, quando `totalItems` mudar, aplicar bounce no badge

## 2. Feedback visual na seleção do produto

**Arquivo:** [`src/components/product/product-card.tsx`](src/components/product/product-card.tsx)

**Implementação:**
- Aumentar o destaque no hover do card: borda `border-red-crimson/40`, glow mais intenso
- Adicionar `active:scale-[0.98]` no clique
- Adicionar `ring-2 ring-red-crimson/20` sutil no foco via teclado
- Botão de "add to cart" aparece com opacidade 0 e faz fade-in no hover do card

## 3. Múltiplas fotos no produto

**Arquivos:**
- [`prisma/seed.ts`](prisma/seed.ts) — Adicionar múltiplos placeholders em `images`
- [`src/app/produto/[slug]/page.tsx`](src/app/produto/\[slug\]/page.tsx) — Galeria de miniaturas
- [`src/components/ui/product-image.tsx`](src/components/ui/product-image.tsx) — Aceitar array de imagens

**Implementação:**
- Criar componente `ProductGallery` que mostra:
  - Imagem principal (grande)
  - Thumbnails abaixo
  - Ao clicar numa thumbnail, troca a imagem principal com fade transition

## 4. Slideshow no hover do ProductCard

**Arquivo:** [`src/components/product/product-card.tsx`](src/components/product/product-card.tsx)

**Implementação:**
- ProductCard aceita `images: string[]` (não mais apenas `image: string`)
- Quando mouse entra no card, inicia `setInterval` a cada 2500ms trocando a imagem
- Quando mouse sai, para o intervalo e volta para imagem 0
- Transição suave com `opacity` + `transition-all duration-500`

## 5. Transição suave entre páginas

**Arquivo:** [`src/app/layout.tsx`](src/app/layout.tsx) + CSS global

**Implementação:**
- Adicionar wrapper `PageTransition` no layout
- CSS: `@keyframes fadeIn` com `opacity 0 → 1` e `translateY(8px) → 0`
- Aplicar via `animate-fadeIn` no `<main>` de cada página
- Alternativa: usar CSS view transitions API (`@view-transition`)

---

## Resumo de Arquivos a Modificar/Criar

| # | Arquivo | Ação |
|---|---------|------|
| 1 | [`src/app/globals.css`](src/app/globals.css) | Adicionar keyframes (bounce, fadeIn) |
| 2 | [`src/components/product/add-to-cart-button.tsx`](src/components/product/add-to-cart-button.tsx) | Adicionar bounce animation |
| 3 | [`src/components/layout/header.tsx`](src/components/layout/header.tsx) | Animação no badge do carrinho |
| 4 | [`src/components/product/product-card.tsx`](src/components/product/product-card.tsx) | Hover slideshow + feedback visual |
| 5 | [`src/components/product/product-grid.tsx`](src/components/product/product-grid.tsx) | Passar `images[]` para ProductCard |
| 6 | [`src/app/produto/[slug]/page.tsx`](src/app/produto/\[slug\]/page.tsx) | Galeria de múltiplas imagens |
| 7 | [`src/components/ui/product-image.tsx`](src/components/ui/product-image.tsx) | Manter como está (já serve) |
| 8 | **Novo:** `src/components/product/product-gallery.tsx` | Galeria com thumbnails |
| 9 | [`prisma/seed.ts`](prisma/seed.ts) | Múltiplos placeholders em `images` |
| 10 | **Novo:** `src/components/layout/page-transition.tsx` | Wrapper de transição |
