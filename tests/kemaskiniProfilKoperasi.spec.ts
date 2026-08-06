import { test, expect } from '@playwright/test';

test.use({
  ignoreHTTPSErrors: true
});

test('WPKL Awam - Kemaskini Profil Pertubuhan/Koperasi/JMB/MC', async ({ page }) => {
  const timestamp = new Date()
  .toISOString()
  .replace(/[-T:.Z]/g, '')  
  .slice(0, 14);
  await page.addInitScript({ content: `window.validateCaptcha = () => true;` });

  await page.goto('https://awamwp.ptgwp.gov.my/portal/awam-landing-page');
  const closeButton = page.getByRole('button', { name: 'Close' });
  if (await closeButton.isVisible()) {
    await closeButton.click();
  }
  await page.getByRole('link', { name: 'LOG MASUK' }).click();
  const frameHandle = await page.locator('iframe[title="eTanahAwam"]').elementHandle();
  const frame = await frameHandle?.contentFrame();
  if (frame) {
    try {
      await frame.evaluate(() => {
        // @ts-ignore
        window.validateCaptcha = () => true;
      });
    } catch {
      
    }
    
  }
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('mhplatinumresidence@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator('.bottom-wrapper-content-1 > div:nth-child(2) > a').click();
  await page.locator('.menu-10').click();
  await page.getByRole('textbox', { name: 'Katalaluan Lama :' }).click();
  await page.getByRole('textbox', { name: 'Katalaluan Lama :' }).fill('etanah123#');
  await page.getByRole('textbox', { name: 'Alamat Berdaftar :' }).click();
  await page.getByRole('textbox', { name: 'Alamat Berdaftar :' }).click();
  await page.getByRole('textbox', { name: 'Alamat Berdaftar :' }).fill(timestamp);
  await page.getByRole('button', { name: 'Kemaskini' }).click();
  await page.waitForTimeout(3000);
  await page.locator('.menu-10').click();
  await page.waitForTimeout(3000);
});