import { test, expect } from '@playwright/test';

test.use({
  ignoreHTTPSErrors: true
});

test('WPKL SWS - FPX', async ({ page }) => {

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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('muhdizzat2991@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator('.bottom-wrapper-content-1 > div:nth-child(2) > a').click();
  await page.locator('.menu-5').waitFor();
  await page.locator('.menu-5').click();
  await page.getByRole('button', { name: 'Tutup' }).waitFor();
  await page.getByRole('button', { name: 'Tutup' }).click();
  await page.getByRole('group').filter({ hasText: 'Bandar/Pekan/Mukim : - Sila' }).locator('span').nth(3).waitFor();
  await page.getByRole('group').filter({ hasText: 'Bandar/Pekan/Mukim : - Sila' }).locator('span').nth(3).click();
  await page.locator('[id*="bandarPekanMukim_items"]').getByRole('option', { name: '- Mukim Batu' }).waitFor();
  await page.locator('[id*="bandarPekanMukim_items"]').getByRole('option', { name: '- Mukim Batu' }).click();
  await page.getByRole('group').filter({ hasText: 'Jenis Hakmilik : - Sila Pilih' }).locator('span').nth(3).waitFor();
  await page.getByRole('group').filter({ hasText: 'Jenis Hakmilik : - Sila Pilih' }).locator('span').nth(3).click();
  await page.locator('[id*="jenisHakmilik_items"]').getByRole('option', { name: 'GM - Geran Mukim' }).waitFor();
  await page.locator('[id*="jenisHakmilik_items"]').getByRole('option', { name: 'GM - Geran Mukim' }).click();
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).waitFor();
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).click();
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).fill('1234');
  await page.getByRole('button', { name: 'Tambah ke Troli' }).click();
  await page.getByRole('button', { name: 'Proses pembayaran' }).click();
  await page.getByRole('button', { name: 'Seterusnya' }).waitFor();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.locator('[id="centerForm:payment1"] div').filter({ hasText: /^Bayaran$/ }).click();
  await page.getByRole('dialog', { name: 'Bayaran' }).locator('a').click();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.locator('[id="centerForm:payment1_title"]').click();
  await page.locator('[id="centerForm:seterusButton"]').click();
  await page.locator('[id="centerForm:bank-selected_label"]').click();
  //await page.locator(`[id="centerForm:bank-selected_${bankFPX}"]`).click();
  await page.locator('[id="centerForm:bank-selected_24"]').click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.getByRole('textbox', { name: 'User Id' }).fill('1234');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'Continue with Transaction' }).click();
  await page.getByRole('button', { name: 'Redirect' }).click();
  await page.waitForTimeout(10000);
  await page.getByRole('button', { name: 'Cetak Resit Bayaran' }).waitFor();
  await page.getByRole('button', { name: 'Cetak Resit Bayaran' }).click();
  await page.waitForTimeout(10000);
});