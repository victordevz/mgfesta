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

## Banners

A vitrine abre com o banner de Natal e as fotografias originais dos três topos natalinos. O slider inclui um segundo banner geral, setas, indicadores, gesto horizontal no celular e troca automática a cada oito segundos. A troca pausa ao interagir, ao passar o mouse e quando a aba fica oculta; a preferência por movimento reduzido desativa a rotação. O botão de Natal filtra os três produtos, e cada fotografia abre seu produto. Os dois banners menores permanecem à direita do slider em telas largas e abaixo dele nas demais larguras. O cenário gerado fica em `public/images/banners/`, com o prompt registrado em `docs/christmas-banner-prompt.txt`.

`npm run check:slider` valida os banners de 320 a 1920 px, a altura estável, navegação, links, gestos, rotação e movimento reduzido. Use `CHECK_URL=https://mgfesta.com.br npm run check:slider` para repetir no site publicado.

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
