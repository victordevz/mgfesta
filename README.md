# MG FESTAS

Catálogo mobile-first em Next.js + TypeScript com 15 cores do Kit Flor e Borboleta e 23 modelos de topos de bolo. Inclui filtros de categoria, busca, fotografias, modal de produto, carrinho persistente e pedido preenchido pelo WhatsApp, sem preços no site.

## Rodar localmente

Requer Node.js 20.9 ou mais recente.

```sh
npm ci
npm run dev
```

Abra http://127.0.0.1:3100. O telefone atual de teste está em `.env.local` e fica fora do Git. Para configurar outro contato, use `NEXT_PUBLIC_WHATSAPP_NUMBER` somente com dígitos no formato país + DDD + telefone. `NEXT_PUBLIC_INSTAGRAM_URL` é opcional.

O WhatsApp abre uma mensagem pronta; a pessoa ainda precisa enviá-la. O site não confirma pagamento, estoque ou frete.

## Catálogo e regras

Os produtos e categorias ficam em `src/lib/catalog.ts`. O catálogo não armazena preços nem calcula valores: o carrinho e a mensagem do WhatsApp listam apenas produtos e quantidades. O mínimo é 10 unidades por cor ou modelo, com incrementos unitários. Os 15 kits têm duas fotos por cor e os 23 topos têm uma foto tratada por modelo. As fotos WebP ficam em `public/images/products/` e as matrizes do banner e logotipo em `docs/`.

## Validar e publicar

```sh
npm run lint
npm run typecheck
npm run check:store
npm run build
npm run preview
```

Com o site em execução, `npm run check:browser` confere os fluxos em Chromium e as larguras de 360, 390, 768, 1440 e 1920 px. `npm run deploy` publica o conteúdo de `out/` no Worker `mgfesta`; requer autenticação Wrangler na conta Cloudflare correspondente.
