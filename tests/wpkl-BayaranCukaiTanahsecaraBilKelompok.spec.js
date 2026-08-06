import { test, expect } from "@playwright/test";

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

test("WPKL Bayaran Cukai Tanah secara Bil Kelompok", async ({ page }) => {

  await page.goto('https://awamwp.ptgwp.gov.my/portal/awam-landing-page');

  await page.getByRole('link', { name: 'LOG MASUK' }).click();

  const closeButton = page.getByRole('button', { name: 'Close' });
  if (await closeButton.isVisible()) {
    await closeButton.click();
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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('misznad30@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.waitForTimeout(1000);
  
  // WPKL
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();

  // menu selection
  await page.locator(".menu-8").dispatchEvent('click');
  await page.waitForTimeout(1000);


  // Bil Kelompok - manually insert the data into test script since the test data is dynamic and may not be available in the database
  await page.getByRole("button", { name: "Tambah" }).click();
  await page.waitForTimeout(1000);

  // 140005GRN00000162
  // await page.getByRole("row", { name: "No. Akaun ID Hakmilik Tanah" }).locator("span").nth(1).click();
  await page.getByText('ID Hakmilik Tanah').click();
  await page.waitForTimeout(1000);

  await page.locator('[id*="bandarPekanMukim1_label"]').click();
  await page.locator('[id*="bandarPekanMukim1_5"]').click();
  await page.waitForTimeout(1000);
  await page.locator('[id*="jenisHakmilik_label"]').click();
  await page.locator('[id*="jenisHakmilik_5"]').click();
  await page.waitForTimeout(1000);

  // For No Hakmilik, the input field is not a standard input and requires special handling
  const inputId = 'bilKelompok-addHakmilik-Form\\:noHakmilik';
  await page.locator(`#${inputId}`).click();
  await page.locator(`#${inputId}`).pressSequentially('2577', { delay: 150 });
  await page.locator(`#${inputId}`).blur();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.waitForTimeout(1000);
  console.log('1ST BIL CUKAI TANAH BERJAYA DITAMBAHKAN');

  await page.locator('[id*="bandarPekanMukim1_label"]').click();
  await page.locator('[id*="bandarPekanMukim1_5"]').click();
  await page.waitForTimeout(1000);
  await page.locator('[id*="jenisHakmilik_label"]').click();
  await page.locator('[id*="jenisHakmilik_5"]').click();
  await page.waitForTimeout(1000);
  await page.locator(`#${inputId}`).click();
  await page.locator(`#${inputId}`).pressSequentially('2588', { delay: 150 });
  await page.locator(`#${inputId}`).blur();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.waitForTimeout(1000);
  console.log('2ND BIL CUKAI TANAH BERJAYA DITAMBAHKAN');

  await page.locator('[id*="bandarPekanMukim1_label"]').click();
  await page.locator('[id*="bandarPekanMukim1_13"]').click();
  await page.waitForTimeout(1000);
  await page.locator('[id*="jenisHakmilik_label"]').click();
  await page.locator('[id*="jenisHakmilik_6"]').click();
  await page.waitForTimeout(1000);
  await page.locator(`#${inputId}`).click();
  await page.locator(`#${inputId}`).pressSequentially('9419', { delay: 150 });
  await page.locator(`#${inputId}`).blur();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.waitForTimeout(1000);
  console.log('3RD BIL CUKAI TANAH BERJAYA DITAMBAHKAN');

  await page.getByRole("textbox", { name: "Nama Fail :" }).click();
  await page.getByRole("textbox", { name: "Nama Fail :" }).fill(`Test File ${Date.now()}`);
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Simpan" }).click();
  console.log('FAIL BIL CUKAI KELOMPOK BERJAYA DISIMPAN');
  await page.waitForTimeout(1000);

  await page.waitForTimeout(1000);

  await page.locator(".menu-8").click();
  await page.waitForTimeout(1000);
  await page.getByRole('gridcell').first().click();
  await page.getByRole('button', { name: 'Bayar', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Seterusnya" }).click();
  await page.waitForTimeout(1000);

  await page.locator('[id*="paymentOnline:bank-selected_label"]').click();
  await page.waitForTimeout(1000);
  await page.locator('[id*="paymentOnline:bank-selected_24"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole("textbox", { name: "Emel :" }).click();
  await page.getByRole("textbox", { name: "Emel :" }).fill("misznad30@gmail.com");
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).click();
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).fill('0123456789');
  await page.locator("body").click();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Seterusnya" }).click();
 
  await page.waitForTimeout(1000);

  // FPX Login - SBI BANK A Payment Gateway
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
  await page.getByRole('button', { name: 'Redirect' }).click();
  await page.waitForTimeout(1000);
  console.log('PEMBAYARAN BERJAYA');

  await page.getByRole('button', { name: 'Cetak Resit Bayaran' }).click();
  await page.waitForTimeout(1000);
  console.log('TEST END');

});