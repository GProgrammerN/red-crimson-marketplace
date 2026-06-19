# Design System — Red Crimson Marketplace

## Identidade da Marca

| Propriedade | Valor |
|-------------|-------|
| **Nome** | Red Crimson Marketplace |
| **Conceito** | Marketplace especializado em produtos **exclusivamente vermelhos** |
| **Logotipo** | Taça de vinho (estilizada, vetorial) |
| **Elemento gráfico** | Lineart de presas de vampiro em backgrounds |
| **Tom** | Formal, ocasionalmente sofisticado |
| **Estilo** | Gótico-sophisticated, dark, vampírico |
| **Público-alvo** | Nicho: amantes da cor vermelha, estética dark/gótica, sofisticados |

---

## 🎨 Paleta de Cores

### Cores Primárias (Vermelhos)

| Token | Uso | Hex | Aplicação |
|-------|-----|-----|-----------|
| `--red-deep` | Principal | `#6B0000` | Backgrounds escuros, headers |
| `--red-crimson` | Primary | `#B22222` | Botões primários, links, destaques |
| `--red-bright` | Accent | `#E63946` | CTAs, badges, hover states |
| `--red-rose` | Secundária | `#C9184A` | Detalhes, bordas decorativas |

### Cores Secundárias (Roxos e Rosas)

| Token | Uso | Hex | Aplicação |
|-------|-----|-----|-----------|
| `--purple-dark` | Background | `#1A0A1E` | Backgrounds dark mode |
| `--purple-mid` | Muted | `#3D1B40` | Cards, superfícies elevadas |
| `--purple-soft` | Suave | `#7B2D8E` | Links hover, tags |
| `--pink-soft` | Rosado | `#FF8FAB` | Destaques sutis |

### Cores Neutras e Complementares

| Token | Uso | Hex | Aplicação |
|-------|-----|-----|-----------|
| `--gold` | Luxo/sofisticação | `#C9A84C` | Preços, ícones decorativos, selos "premium" |
| `--ivory` | Texto claro | `#F5E6D3` | Texto em backgrounds escuros |
| `--dark-base` | Base escura | `#0D0A0A` | Fundo principal dark mode |
| `--light-base` | Base clara | `#FFF8F0` | Fundo principal light mode |

### Cores Funcionais

| Token | Hex | Aplicação |
|-------|-----|-----------|
| `--success` | `#2D6A4F` | Confirmações, pedidos pagos |
| `--warning` | `#E09F3E` | Alertas, estoque baixo |
| `--error` | `#9B2226` | Erros, removidos do carrinho |
| `--info` | `#5A189A` | Informações |

---

## 🖋️ Tipografia

| Elemento | Fonte | Uso |
|----------|-------|-----|
| **Headings** | `Playfair Display` | Títulos principais, sofisticação |
| **Body** | `Inter` | Textos corridos, legibilidade |
| **Mono** | `JetBrains Mono` | Preços, códigos, dados |

### Escala Tipográfica

```
--text-xs: 0.75rem   (12px)
--text-sm: 0.875rem  (14px)
--text-base: 1rem    (16px)
--text-lg: 1.125rem  (18px)
--text-xl: 1.25rem   (20px)
--text-2xl: 1.5rem   (24px)
--text-3xl: 1.875rem (30px)
--text-4xl: 2.25rem  (36px)
--text-5xl: 3rem     (48px)
--text-6xl: 3.75rem  (60px)
```

---

## 🧩 Componentes shadcn/ui — Customizações

### Botões (`button.tsx`)

```css
/* Variantes adicionais */
--button-red-crimson: bg-red-crimson text-ivory hover:bg-red-deep;
--button-outline-gold: border-gold text-gold hover:bg-gold/10;
--button-ghost-vampire: text-red-rose hover:bg-purple-mid/30;
```

### Temas

**Dark Mode (padrão):**
- Background principal: `#0D0A0A`
- Cards: `#1A0A1E` com borda `#3D1B40`
- Texto: `#F5E6D3`
- Links: `#E63946`
- Borders: `#3D1B40`

**Light Mode (alternativo):**
- Background principal: `#FFF8F0`
- Cards: `#FFFFFF` com borda `#FFD6D6`
- Texto: `#1A0A0A`
- Links: `#B22222`
- Borders: `#FFD6D6`

---

## 🎯 Elementos Visuais Específicos

### Logo (Taça de Vinho)
- SVG inline no Header
- Estilo: lineart simples, cor gold `#C9A84C` no dark mode, `#6B0000` no light mode
- Tamanho: 32x32px no header, 64x64px no footer

### Presas de Vampiro (Lineart)
- SVG decorativo posicionado em cantos estratégicos
- Cantos inferiores do Hero Section
- Background sutil em páginas de login/cadastro
- Opacidade: 5-10% (sutil, não intrusivo)
- Cor: `#7B2D8E` com opacidade reduzida

### Padrão de Fundo
- Textura sutil de vinil/veludo (opcional, CSS gradiente)
- Gradiente radial saindo do centro: `radial-gradient(circle at center, #1A0A1E 0%, #0D0A0A 100%)`

---

## 🏷️ Sistema de Selos e Badges

| Badge | Cor | Uso |
|-------|-----|-----|
| 🔥 **Vermelho Intenso** | `#E63946` | Produtos mais vendidos |
| 💎 **Edição Rubi** | `#C9A84C` | Produtos premium/ed. limitada |
| 🆕 **Novo Sangue** | `#FF8FAB` | Produtos recém-chegados |
| 🏆 **Coleção Carmim** | `#7B2D8E` | Curadoria especial |

---

## 💬 Tom de Comunicação (UI Text)

| Contexto | Exemplo |
|----------|---------|
| **Header title** | "Red Crimson Marketplace" |
| **Hero title** | "O Encarnado em Sua Forma Mais Pura" |
| **CTA primário** | "Explorar a Coleção" |
| **Carrinho vazio** | "Sua coleção está vazia... por enquanto." |
| **Checkout** | "Finalizar Compra" |
| **Pedido confirmado** | "Sua ordem foi selada." |
| **404** | "Este brilho se perdeu na escuridão." |
| **Newsletter** | "Receba os Tons Mais Escuros" |
| **Footer tagline** | "Para aqueles que veem o mundo em vermelho." |

---

## 📁 Assets Necessários

1. **Logo SVG** — Taça de vinho estilizada (precisa ser criada)
2. **Presas SVG** — Lineart de presas de vampiro (precisa ser criada)
3. **Favicon** — Versão simplificada da taça de vinho (16x16, 32x32)
4. **Imagens placeholder** — Placeholders em tons de vermelho para produtos
5. **Background texture** — Gradiente/textura sutil (CSS)
