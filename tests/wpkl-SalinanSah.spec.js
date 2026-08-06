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

test('WPKL Salinan Sah', async ({ page }) => {

  await page.goto('https://awamwp.ptgwp.gov.my/portal/awam-landing-page');

  await page.getByRole('link', { name: 'LOG MASUK' }).click();

  const closeButton = page.getByRole('button', { name: 'Close' });
  if (await closeButton.isVisible()) {
    await closeButton.click();
  }

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

  // Log masuk
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('ibrahimohd8657@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();

  // WPKL
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();

  // Menu selection
  await page.locator('.menu-1').click();

  await page.getByRole('link', { name: 'Pendaftaran' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('row', { name: '9 SSHM - Salinan Sah' }).getByLabel('Buat Permohonan').click();
  await page.locator('[id="centerForm:bandarPekanMukim"] span').click();
  await page.locator('[id="centerForm:bandarPekanMukim_6"]').click();
  await page.waitForTimeout(1000);
  await page.locator('[id="centerForm:jenisHakmilik"] span').click();
  await page.locator('[id="centerForm:jenisHakmilik_3"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).click();
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).pressSequentially('73398', {delay: 150});
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Teruskan Permohonan' }).click();
  await page.getByRole('row', { name: 'Dengan ini saya mengakui' }).locator('span').click();
  await page.getByRole('button', { name: 'Bayar' }).click();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.locator('[id*="paymentOnline:bank-selected_label"]').click();
  await page.waitForTimeout(2000);
  await page.locator('[id*="paymentOnline:bank-selected_24"]').click();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'User Id' }).fill('1234');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'Continue with Transaction' }).click();

  // if counter an error page, redirect
  await page.getByRole('button', { name: 'Redirect' }).click();

  // Back to Awam to check status permohonan
  await page.locator('.menu-2').click();
  const transaksiCell = page.locator('td[role="gridcell"]').filter({
    hasText: /PDCR\d+\/\d+/   
  });

  // Take the first one
  const transaksiIdText = await transaksiCell.first().innerText();

  // Extract only the PDCR pattern
  const match = transaksiIdText.match(/PDCR\d+\/\d+/);

  let transaksiId = "";
  if (match) {
    transaksiId = match[0];
    console.log("Extracted Transaksi ID:", transaksiId);
  } else {
    console.log("No PDCR ID found");
  }
    await page.getByRole('link', { name: 'Log Keluar' }).click();
   page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept();
  });
  await page.goto('https://testing.ptgwp.gov.my/etanah-cas/login?service=https%3A%2F%2Ftesting.ptgwp.gov.my%2Fetanah-consent%2Flogin%2Fcas');
  await page.evaluate(() => {
    // @ts-ignore
    window.handleLoginSubmit = () => true;
  });
  await page.locator('#username').click();
  await page.locator('#username').fill('isznorhayati@ptgwp.gov.my');
  await page.locator('#password').click();
  await page.locator('#password').fill('etanah123#');
  await page.locator('#password').press('Enter');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.waitForTimeout(5000);
  const idPermohonanColumn = page.getByRole('columnheader', { name: 'ID Permohonan / No. Serahan' });
  const filterInput = idPermohonanColumn.locator('input[name^="mainForm:tabView:tasks:"][name*="filter"]');
  await filterInput.click();
  await filterInput.fill(transaksiId);
  await filterInput.press('Enter');
  await page.waitForTimeout(10000);

  // Enter back Awam to check status permohonan
  await page.locator('#tnd-2').click();
  await page.context().clearCookies();
  await page.addInitScript({ content: `window.validateCaptcha = () => true;` });

  await page.goto('https://awamwp.ptgwp.gov.my/portal/awam-landing-page');

  await page.getByRole('link', { name: 'LOG MASUK' }).click();

  if (await closeButton.isVisible()) {
    await closeButton.click();
  }

  const frame2Handle = await page.locator('iframe[title="eTanahAwam"]').elementHandle();
  const frame2 = await frame2Handle?.contentFrame();

  if (frame2) {
    try {
      await frame2.evaluate(() => {
        // @ts-ignore
        window.validateCaptcha = () => true;
      });
    } catch {
      
    }
  }
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('ibrahimohd8657@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();

  // WPKL
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();

  // Menu selection
  await page.locator('.menu-2').click();
  await page.waitForTimeout(7000);
  // =======================
  // Find Status column index
  // =======================
  const headers = page.getByRole('columnheader');
  const headerCount = await headers.count();

  let statusIndex = -1;

  for (let i = 0; i < headerCount; i++) {
    const headerText = await headers.nth(i).innerText();
    if (headerText.trim() === 'Status') {
      statusIndex = i;
      break;
    }
  }

  if (statusIndex === -1) {
    throw new Error("Could not find 'Status' column header");
  }

  // =======================
  // Check status for the PDCR row
  // =======================
  const row = page.locator('tr').filter({
    has: page.getByRole('gridcell', { name: transaksiId })
  });

  const statusCell = row.getByRole('gridcell').nth(statusIndex);

  await statusCell.waitFor({ state: "visible" }); // safer than waitForTimeout

  const statusText = await statusCell.innerText();

  if (statusText.trim() !== "Sedang Diproses") {
    throw new Error(`${transaksiId} status is NOT 'Sedang Diproses' → Found: ${statusText}`);
  }

  await page.waitForTimeout(5000);
});