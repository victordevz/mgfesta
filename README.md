# MG FESTAS

Loja mobile-first em Next.js + TypeScript com 15 cores do Kit Flor e Borboleta, duas fotos por cor, modal de produto, carrinho persistente e pedido preenchido pelo WhatsApp.

## Rodar localmente

Requer Node.js 20.9 ou mais recente.

```sh
npm ci
npm run dev
```

Abra http://127.0.0.1:3100. O telefone atual de teste está em `.env.local` e fica fora do Git. Para configurar outro contato, use `NEXT_PUBLIC_WHATSAPP_NUMBER` somente com dígitos no formato país + DDD + telefone. `NEXT_PUBLIC_INSTAGRAM_URL` é opcional.

O WhatsApp abre uma mensagem pronta; a pessoa ainda precisa enviá-la. O site não confirma pagamento, estoque ou frete.

## Catálogo e regras

Os produtos e preços ficam em `src/lib/catalog.ts`. Cada kit custa R$ 4,00. O mínimo inicial é 10 por cor, com incrementos unitários. As fotos WebP ficam em `public/images/products/` e as matrizes do banner e logotipo em `docs/`.

## Validar e publicar

```sh
npm run lint
npm run typecheck
npm run check:store
npm run build
npm run preview
```

Com o site em execução, `npm run check:browser` confere os fluxos em Chromium e as larguras de 360, 390, 768, 1440 e 1920 px. `npm run deploy` publica o conteúdo de `out/` no Worker `mgfesta`; requer autenticação Wrangler na conta Cloudflare correspondente.
