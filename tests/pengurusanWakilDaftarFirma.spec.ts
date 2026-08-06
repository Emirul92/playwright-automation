import { test, expect } from '@playwright/test';

test.use({
  ignoreHTTPSErrors: true
});

test('WPKL Awam - Pengurusan Wakil (Untuk daftar runner firma guaman)', async ({ page }) => {

  //-------Constant Declaration---------
  const icNumber = '780707085675';

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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('james@aupartnership.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator('.bottom-wrapper-content-1 > div:nth-child(2) > a').click();
  await page.locator('.menu-9').click();
  await page.getByRole('textbox', { name: 'Nama Penuh :' }).click();
  await page.getByRole('textbox', { name: 'Nama Penuh :' }).fill('TEmt');
  await page.getByRole('textbox', { name: 'No. Kad Pengenalan Baru :' }).click();
  await page.getByRole('textbox', { name: 'No. Kad Pengenalan Baru :' }).fill(icNumber);
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).click();
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).fill('0194234567');
  await page.getByRole('row', { name: 'Dengan ini saya mengakui' }).locator('span').click();
  await page.getByRole('button', { name: 'Simpan' }).click();
  //await page.locator('div').filter({ hasText: /^Berjaya$/ }).click();
  const success = page.locator('div:visible', { hasText: 'Berjaya' }).first();

  await expect(success).toBeVisible();
  await success.click({ force: true });

  await page.getByRole('button', { name: 'Tutup' }).click();
  await page.getByRole('link', { name: 'Senarai Wakil' }).click();
  await page.waitForTimeout(10000);
});