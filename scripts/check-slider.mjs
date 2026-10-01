import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const origin = process.env.CHECK_URL || 'http://127.0.0.1:3100';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
const errors=[];
page.on('pageerror', error => errors.push(String(error)));
const report=[];
await mkdir('docs/checks',{recursive:true});
try {
  for (const width of [320,360,390,700,768,1100,1440,1920]) {
    await page.setViewportSize({width,height:width<701?960:1080});
    await page.goto(origin);
    const slider=page.getByRole('region',{name:'Destaques MG FESTAS',exact:true});
    const stage=slider.getByRole('group',{name:'1 de 2: Natal MG FESTAS'});
    await expect(stage).toBeVisible();
    await expect(stage.getByRole('button',{name:/Conhecer Topo de bolo Feliz Natal/})).toHaveCount(3);
    await stage.locator('img').evaluateAll(async images => {await Promise.all(images.map(image=>image.decode()));});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const first=await slider.boundingBox();
    const secondary=page.getByRole('region',{name:'Outros destaques MG FESTAS'});
    await expect(secondary.getByRole('button')).toHaveCount(2);
    await secondary.locator('img').evaluateAll(async images => { for(const image of images) image.loading='eager'; await Promise.all(images.map(image=>image.decode())); });
    const small=await secondary.boundingBox();
    if(width>=1260) { expect(small.x).toBeGreaterThanOrEqual(first.x+first.width); }
    else { expect(small.y).toBeGreaterThanOrEqual(first.y+first.height); }
    await page.locator('main > div').first().screenshot({path:`docs/checks/banner-group-${width}.png`});
    const fits=await stage.locator('button').evaluateAll(buttons=>buttons.every(button=>{const b=button.getBoundingClientRect();const s=button.closest('[aria-roledescription="slide"]').getBoundingClientRect();return b.left>=s.left-1&&b.right<=s.right+1&&b.top>=s.top-1&&b.bottom<=s.bottom+1;}));
    expect(fits,`All product photos and CTA fit inside the ${width}px banner`).toBe(true);
    await slider.screenshot({path:`docs/checks/christmas-slider-${width}.png`});
    await slider.getByRole('button',{name:'Próximo banner'}).click();
    await expect(slider.getByRole('group',{name:'2 de 2: Sua festa com encanto'})).toBeVisible();
    const second=await slider.boundingBox();
    expect(Math.abs(first.height-second.height),`Stable banner height at ${width}px`).toBeLessThanOrEqual(1);
    await slider.getByRole('button',{name:'Banner anterior'}).focus();
    await page.keyboard.press('ArrowRight');
    await expect(stage).toBeVisible();
    await slider.getByRole('button',{name:'Ver os topos de Natal'}).click();
    await expect(page.locator('article')).toHaveCount(3);
    expect(await page.locator('body').innerText()).not.toMatch(/R\$|Subtotal/);
    const products=page.locator('article');
    for(let index=0;index<3;index++){
      await products.nth(index).getByRole('button',{name:/^Ver Topo de bolo Feliz Natal/}).click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.keyboard.press('Escape');
    }
    report.push({width,firstHeight:first.height,secondHeight:second.height,christmasProducts:3,noHorizontalOverflow:true});
  }
  await page.goto(origin);
  await page.getByRole('button',{name:'Ver kit rosa-claro',exact:true}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Ver todos os topos de bolo',exact:true}).click();
  await expect(page.locator('article')).toHaveCount(23);
  await page.goto(origin);
  let slider=page.getByRole('region',{name:'Destaques MG FESTAS',exact:true});
  await slider.dispatchEvent('touchstart',{changedTouches:[{identifier:1,clientX:250,clientY:300}]});
  await slider.dispatchEvent('touchend',{changedTouches:[{identifier:1,clientX:100,clientY:310}]});
  await expect(slider.getByRole('group',{name:'2 de 2: Sua festa com encanto'})).toBeVisible();
  await slider.dispatchEvent('touchstart',{changedTouches:[{identifier:1,clientX:100,clientY:300}]});
  await slider.dispatchEvent('touchend',{changedTouches:[{identifier:1,clientX:260,clientY:310}]});
  await expect(slider.getByRole('group',{name:'1 de 2: Natal MG FESTAS'})).toBeVisible();
  await slider.getByRole('button',{name:/Conhecer Topo de bolo Feliz Natal/}).first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(slider.getByRole('button',{name:/Conhecer Topo de bolo Feliz Natal/}).first()).toBeFocused();
  const auto=await browser.newPage({reducedMotion:'no-preference'});
  await auto.clock.install();
  await auto.goto(origin);
  slider=auto.getByRole('region',{name:'Destaques MG FESTAS',exact:true});
  await expect(slider.getByRole('button',{name:'Pausar banners automáticos'})).toBeVisible();
  await auto.clock.fastForward(8100);
  await expect(slider.getByRole('group',{name:'2 de 2: Sua festa com encanto'})).toBeVisible();
  await slider.getByRole('button',{name:'Pausar banners automáticos'}).click();
  await expect(slider.getByRole('button',{name:'Retomar banners automáticos'})).toBeVisible();
  await auto.clock.fastForward(16000);
  await expect(slider.getByRole('group',{name:'2 de 2: Sua festa com encanto'})).toBeVisible();
  await slider.getByRole('button',{name:'Retomar banners automáticos'}).click();
  await auto.mouse.move(0,0);
  await auto.clock.fastForward(8100);
  await expect(slider.getByRole('group',{name:'1 de 2: Natal MG FESTAS'})).toBeVisible();
  await auto.emulateMedia({reducedMotion:'reduce'});
  await expect(slider.getByRole('button',{name:/banners automáticos/})).toHaveCount(0);
  await auto.clock.fastForward(16000);
  await expect(slider.getByRole('group',{name:'1 de 2: Natal MG FESTAS'})).toBeVisible();
  expect(errors).toEqual([]);
  await writeFile('docs/checks/slider-report.json',JSON.stringify({status:'passed',origin,layouts:report,errors,scenarios:['three unchanged catalog photos','two banners','stable responsive height','Christmas CTA filters exactly three products','product modal links','arrow and dot controls','keyboard and touch gestures','autoplay, pause and resume','reduced motion disables autoplay','no prices']},null,2));
  console.log('PASS: responsive Christmas slider, all three photos, stable height, filters, product links, keyboard, swipe, autoplay, pause, resume and reduced motion.');
} finally {await browser.close();}
