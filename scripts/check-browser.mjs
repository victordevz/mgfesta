import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const errors = []; page.on('pageerror', error => errors.push(String(error)));
const origin = process.env.CHECK_URL || 'http://127.0.0.1:3100';
const report = [];
await mkdir('docs/checks', { recursive: true });
try {
  for (const width of [360, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1080 });
    console.log('Checking width', width); await page.goto(origin); await page.evaluate(() => scrollTo(0, 0)); await page.locator('article').first().waitFor(); await page.waitForFunction(() => Array.from(document.images).filter(i => i.getBoundingClientRect().top < innerHeight && i.getBoundingClientRect().bottom > 0).every(i => i.complete && i.naturalWidth > 0), { timeout: 60000 });
    await expect(page.locator('article')).toHaveCount(15);
    const layout = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth, columns: getComputedStyle(document.querySelector('#produtos > div:nth-child(2)')).gridTemplateColumns.split(' ').length }));
    expect(layout.page).toBeLessThanOrEqual(width);
    expect(layout.columns).toBe(width <= 700 ? 2 : width <= 1100 ? 3 : 6);
    await page.screenshot({ path: `docs/checks/home-${width}.png`, fullPage: true });
    report.push({ width, ...layout });
  }
  // Continuous resizing across breakpoints must not cause horizontal scrolling.
  for (const width of [320, 430, 600, 699, 700, 701, 900, 1099, 1100, 1101, 1600]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('textbox', { name: 'Buscar produtos' }).fill('LILAS');
  await expect(page.locator('article')).toHaveCount(1);
  await page.getByRole('textbox', { name: 'Buscar produtos' }).fill('inexistente');
  await expect(page.getByText('Nenhuma cor encontrada')).toBeVisible();
  await page.getByRole('button', { name: 'Ver todas as cores' }).click();
  await expect(page.locator('article')).toHaveCount(15);
  const trigger = page.getByRole('button', { name: 'Ver Kit Flor e Borboleta Rosa-claro', exact: true });
  await trigger.click();
  let dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Ver ângulo 2' }).click();
  await expect(dialog.getByRole('img', { name: 'Kit Rosa-claro, ângulo 2', exact: true })).toBeVisible();
  await dialog.getByRole('button', { name: 'Ampliar fotografia' }).click();
  await expect(dialog.getByRole('button', { name: 'Reduzir fotografia' })).toHaveAttribute('aria-pressed', 'true');
  await dialog.getByRole('button', { name: 'Reduzir fotografia' }).click();
  const input = dialog.getByRole('textbox', { name: 'Quantidade de Rosa-claro', exact: true });
  const add = dialog.getByRole('button', { name: 'Adicionar ao carrinho' });
  for (const value of ['9', '10.5', '']) { await input.fill(value); await expect(add).toBeDisabled(); }
  for (const value of ['10', '11', '12', '13']) { await input.fill(value); await expect(add).toBeEnabled(); }
  await input.fill('11');
  await page.screenshot({ path: 'docs/checks/product-mobile.png', fullPage: false });
  await add.click();
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await page.getByRole('button', { name: 'Ver Kit Flor e Borboleta Azul-claro', exact: true }).click();
  dialog = page.getByRole('dialog');
  await dialog.getByRole('textbox', { name: 'Quantidade de Azul-claro', exact: true }).fill('12');
  await dialog.getByRole('button', { name: 'Adicionar ao carrinho' }).click();
  await page.getByRole('button', { name: 'Abrir carrinho, 23 kits', exact: true }).click();
  dialog = page.getByRole('dialog');
  await expect(dialog.getByText('R$ 92,00', { exact: true })).toBeVisible();
  const checkout = dialog.getByRole('link', { name: 'Finalizar pelo WhatsApp' });
  await expect(checkout).toBeVisible();
  const checkoutUrl = new URL(await checkout.getAttribute('href'));
  expect(checkoutUrl.hostname).toBe('wa.me');
  expect(checkoutUrl.pathname).toBe('/5581981472018');
  const checkoutMessage = (checkoutUrl.searchParams.get('text') || '').replace(/\u00a0/g, ' ');
  expect(checkoutMessage).toContain('23 kits');
  expect(checkoutMessage).toContain('R$ 92,00');
  await page.screenshot({ path: 'docs/checks/cart-mobile.png', fullPage: false });
  await page.reload();
  await page.getByRole('button', { name: 'Abrir carrinho, 23 kits', exact: true }).click();
  dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('textbox', { name: 'Quantidade de Rosa-claro', exact: true })).toHaveValue('11');
  await dialog.getByRole('button', { name: 'Aumentar quantidade de Rosa-claro', exact: true }).click();
  await expect(dialog.getByRole('textbox', { name: 'Quantidade de Rosa-claro', exact: true })).toHaveValue('12');
  await dialog.getByRole('button', { name: 'Diminuir quantidade de Rosa-claro', exact: true }).click();
  await dialog.getByRole('button', { name: 'Diminuir quantidade de Rosa-claro', exact: true }).click();
  await expect(dialog.getByRole('button', { name: 'Diminuir quantidade de Rosa-claro', exact: true })).toBeDisabled();
  await dialog.getByRole('textbox', { name: 'Quantidade de Rosa-claro', exact: true }).fill('9');
  await expect(dialog.getByRole('button', { name: 'Confira as quantidades' })).toBeDisabled();
  await dialog.getByRole('textbox', { name: 'Quantidade de Rosa-claro', exact: true }).fill('10');
  await dialog.getByRole('button', { name: 'Remover Azul-claro', exact: true }).click();
  await expect(dialog.getByRole('textbox', { name: 'Quantidade de Azul-claro', exact: true })).toHaveCount(0);
  await page.keyboard.press('Escape'); await expect(dialog).toHaveCount(0);
  await trigger.click();
  await page.getByRole('dialog').getByRole('button', { name: 'Adicionar ao carrinho' }).click();
  await page.getByRole('button', { name: 'Abrir carrinho, 20 kits', exact: true }).click();
  await expect(page.getByRole('dialog').getByRole('textbox', { name: 'Quantidade de Rosa-claro', exact: true })).toHaveValue('20');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: /Flor e Borboleta Kit/ }).click();
  await expect(page.locator('article')).toHaveCount(15);
  expect(errors).toEqual([]);
  await writeFile('docs/checks/report.json', JSON.stringify({ status: 'passed', layouts: report, runtimeErrors: errors, scenarios: ['responsive widths and breakpoints', '15 products', 'accent-insensitive search and empty state', 'two-angle gallery and zoom', 'minimum and integer quantities', '23 kits = BRL 92', 'storage persistence', 'quantity edit and removal', 'same-color grouping', 'focus restoration and Escape', 'category', 'configured WhatsApp URL and message inspected without sending'] }, null, 2));
  console.log('PASS: responsive layouts, gallery, search, cart, quantities, persistence, keyboard and configured checkout URL (not opened).');
} finally { await browser.close(); }
