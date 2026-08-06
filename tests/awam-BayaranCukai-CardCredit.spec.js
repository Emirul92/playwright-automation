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

test("WPKL Bayaran Cukai Tanah - Credit Card", async ({ page }) => {
  
  // Tab 1 (existing page
  const tab1 = page;
  const context = tab1.context();

  // To avoid payment gateway detected as bot
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {
    get: () => undefined,
    });
  });

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

  const loginFrame = page.frameLocator('iframe[title="eTanahAwam"]');  

  // Log Masuk
  await loginFrame.getByRole('textbox', { name: 'ID Pengguna' }).pressSequentially('misznad30@gmail.com', {delay: 150});
  await page.waitForTimeout(3000);
  await loginFrame.getByRole('textbox', { name: 'Kata Laluan' }).pressSequentially('etanah123#', {delay: 150});
  await page.waitForTimeout(3000);
  await loginFrame.getByRole('button', { name: 'Log Masuk' }).click();
  await page.waitForTimeout(3000);
  
  // WPKL
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.waitForTimeout(3000);

  // menu selection bayaran cukai tanah
  await page.locator(".menu-3").click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Tutup' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('cell', { name: 'ID Hakmilik Tanah' }).first().click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:mainMenuTab:bandarPekanMukim2_label"]').click(); // change bandar pekan mukim, for option1 > bandarPekanMukim1_label
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:mainMenuTab:bandarPekanMukim2_2"]').click(); // change bandar pekan mukim, for option1 > bandarPekanMukim1_1
  await page.waitForTimeout(3000);
  await page.locator('[id*="jenisHakmilik_label"]').click();
  await page.waitForTimeout(3000);
  await page.locator('[id*="jenisHakmilik_5"]').click(); // change jenisHakmilik, for option1 > jenisHakmilik_1
  await page.waitForTimeout(3000);
  
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).pressSequentially('14022', {delay:150}); // change no hakmilik
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Cari' }).click();
  await page.waitForTimeout(5000);

  await page.getByRole('button', { name: 'Bayar/Semak Cukai Tanah/Petak' }).click();
  await page.waitForTimeout(3000);

  await page.waitForFunction(() =>
  window.PrimeFaces && PrimeFaces.ajax.Queue.isEmpty()
  );

  await page.waitForSelector('.ui-blockui', { state: 'hidden' });

  const bayarButton = page.getByRole('button', { name: 'Bayar' });
  await bayarButton.scrollIntoViewIfNeeded();
  await page.waitForTimeout(3000);
  await bayarButton.click();
  await page.waitForTimeout(3000);

  // Selection Debit/Credit Card
  await page.getByRole('cell', { name: 'Kad Kredit / Kad Debit' }).first().click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Seterusnya" }).click();
  await page.waitForTimeout(3000);

  await page.getByRole('textbox', { name: 'Emel :' }).click();
  // await page.waitForTimeout(3000);
  // await page.keyboard.press('Control+A');
  // await page.waitForTimeout(3000);
  // await page.keyboard.press('Backspace');
  // await page.getByRole('textbox', { name: 'Emel :' }).pressSequentially('nurainisa@ailand.com.my', {delay: 150});
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).pressSequentially('013892042', {delay: 150});
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Seterusnya" }).click();
  await page.waitForTimeout(3000);

  // Card Credit Authentication
  await page.locator('input[name="cardNumber"]').click();
  await page.waitForTimeout(3000);
  await page.locator('input[name="cardNumber"]').pressSequentially('5421248573418105',{delay: 150}); // change the card number based on respective Wilayah
  await page.waitForTimeout(3000);
  await page.locator('input[name="holderName"]').click();
  await page.waitForTimeout(3000);
  await page.locator('input[name="holderName"]').pressSequentially('testing',{delay: 150});
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Month' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: '12' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Year' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: '2028' }).click();
  await page.waitForTimeout(3000);
  await page.locator('input[name="securityCode"]').click();
  await page.waitForTimeout(3000);
  await page.locator('input[name="securityCode"]').pressSequentially('123',{delay: 150});
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Proceed' }).click();

  // wait for authentication maybank page
  await page.waitForURL(/.*maybank.*/, { timeout: 60000 });
  // https://mbbmgatebeta.maybank.com/payment/response3ds

  // MGate Merchant Account ID
  // Open Tab 2 (MGate Page for OTP)
  const tab2 = await context.newPage();
  await page.waitForTimeout(3000);
  await tab2.goto('https://mbbmgatebeta.maybank.com/otp-listing');
  await tab2.waitForTimeout(5000);

  await tab2.getByRole('textbox', { name: 'MGate Merchant Account ID' }).pressSequentially('eLCbXWmmU89',{delay: 150}); // insert the ID, change of ID based on respective Wilayah's ID
  await page.waitForTimeout(3000);
  await tab2.getByRole('button', { name: 'Search' }).dblclick();

  // copy paste the OTP from the table, based on the latest date of transaction or Merchant Transaction Ref
  const tableCell = tab2.locator('div[role="cell"]').first();
  await tableCell.waitFor({ state: 'visible', timeout: 15000 });

  const latestRow = tab2.locator('div[role="row"]').nth(1);

  const otpCell = latestRow.locator('[data-column-id="11"]');
  const otpNum = await otpCell.innerText();
  console.log(`OTP: "${otpNum}"`);

  const matchOTP = otpNum.match(/\d{6}/);
  
  if (!matchOTP){
    const rowContent = await latestRow.innerText();
    throw new Error(`OTP not found. Cell contained: "${otpNum}". Full row: "${rowContent}"`)
  }

  // Back to first page
  await tab2.close();
  await tab1.bringToFront();

  // fill in the OTP number and submit for payment
  const otpInput = tab1.locator('input[name="oneTimePin"]');

  await otpInput.click();
  await otpInput.fill('');
  await otpInput.pressSequentially(otpNum, {delay: 15}); // OTP from merchant ID
  await page.waitForTimeout(5000);

  const submitBtn = tab1.locator('#submitBtn');
  await submitBtn.click();
  await page.waitForTimeout(3000);

  // successful payment, wait for receipt
  await page.getByRole('button', { name : 'Tutup'}).isVisible();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Tutup' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Daftar Bil' }).click();
  await page.waitForTimeout(3000);

});