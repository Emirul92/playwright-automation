import { test, expect } from '@playwright/test';

test.use({
  ignoreHTTPSErrors: true,
  launchOptions: {
    firefoxUserPrefs: {
      "network.protocol-handler.warn-external-default": false,
      "network.protocol-handler.warn-external.etanah": false,
      "network.protocol-handler.external.etanah": false,
      "security.insecure_field_warning.contextual.enabled": false,
      "signon.management.page.breach-alerts.enabled": false,
    },
  },
});

test('WPKL SWS - E-Carian SSM', async ({ page }) => {

  await page.goto('https://awamwp.ptgwp.gov.my/portal/awam-landing-page');
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'LOG MASUK' }).click();
  await page.waitForTimeout(1000);

  const closeButton = page.getByRole('button', { name: 'Close' });
  if (await closeButton.isVisible()) {
    await closeButton.click();
    await page.waitForTimeout(1000);
  }

  page.on('dialog', async dialog => {
  console.log('Dialog message: ${dialog.message()}');
  await dialog.accept(); // or dialog.dismiss() if you want Cancel
  });

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

  // Log Masuk
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).click();
  await page.waitForTimeout(1000);
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('izzwin1980@hotmail.com');
  await page.waitForTimeout(1000);
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.waitForTimeout(1000);
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.waitForTimeout(1000);
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.waitForTimeout(1000);

  // WPKL
  await page.locator('.bottom-wrapper-content-1 > div:nth-child(2) > a').click();
  await page.waitForTimeout(1000);

  // Menu Selection
  await page.locator('.menu-5').dispatchEvent('click'); // menu 4
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tutup' }).click();
  await page.waitForTimeout(1000);

  // 1st Ecarian SSM
  await page.getByRole('link', { name: 'Carian Profil Syarikat (SSM)' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('link', { name: 'Carian Hakmilik' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Carian Profil Syarikat (SSM)' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Nama/Nombor Syarikat :' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Nama/Nombor Syarikat :' }).fill('266216-H');
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Cari' }).click();
  await page.waitForTimeout(100000);

  // Add into trolley
  await page.locator('[id*="resultTable_head"]').getByRole('columnheader').filter({ hasText: /^$/ }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tambah ke Troli' }).dispatchEvent('click');
  await page.waitForTimeout(1000);
  console.log('CARIAN PERTAMA DITAMBAH');

  /*2nd Ecarian SSM
  await page.getByRole('textbox', { name: 'Nama/Nombor Syarikat :' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Nama/Nombor Syarikat :' }).fill('486495-V');
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Cari' }).click();
  await page.waitForTimeout(200000);

  // Add into trolley
  await page.locator('[id*="resultTable_head"]').getByRole('columnheader').filter({ hasText: /^$/ }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tambah ke Troli' }).dispatchEvent('click');
  await page.waitForTimeout(1000);
  console.log('CARIAN KEDUA DITAMBAH');
  await page.waitForTimeout(5000);*/

  // Proses Pembayaran
  //await page.locator('[id*="troliTable_head"]').getByRole('columnheader').filter({ hasText: /^$/ }).click();
  //await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Proses pembayaran' }).click();
  await page.waitForTimeout(5000);

  // Senarai Carian
  //await page.locator('[id*="pembayaranTable:j_idt331"]').click();
  //await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(5000);

  // FPX
  await page.locator('[id*="seterusButton"]').click();
  await page.waitForTimeout(5000);
  await page.locator('[id*="bank-selected_label"]').click();
  await page.waitForTimeout(1000);
  await page.locator('[id*="bank-selected_25"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.waitForTimeout(5000);

  //FPX Login - SBI BANK A Payment Gateway
  await page.getByRole('textbox', { name: 'User Id' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'User Id' }).fill('1234');
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Continue with Transaction' }).click();
  await page.waitForTimeout(1000);

  // if counter an error page, redirect
  await page.getByRole('button', { name: 'Redirect' }).click();
  await page.waitForTimeout(1000);

  // Directed to Receipt page
  await page.getByRole('button', { name: 'Cetak Resit Bayaran' }).waitFor();
  await page.getByRole('button', { name: 'Cetak Resit Bayaran' }).click();
  await page.waitForTimeout(5000);
  console.log('TEST END');

});
