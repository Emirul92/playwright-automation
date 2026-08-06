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

test('WPKL PCR Senario 3 - Add to cart', async ({ page }) => {

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

  // Log Masuk
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('syafiieikudos@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.waitForTimeout(1000);

  // WPKL
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();

  // menu selection
  await page.locator(".menu-1").dispatchEvent('click');

  await page.getByRole('link', { name: 'Pendaftaran' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('row', { name: '5 PCR - Permohonan Carian' }).getByLabel('Buat Permohonan').click();
  await page.waitForTimeout(1000);

  // selection
  await page.locator('[id="centerForm:bandarPekanMukim"] span').waitFor({ state: "visible" });
  await page.locator('[id="centerForm:bandarPekanMukim"] span').click();
  await page.waitForTimeout(1000);
  await page.locator('[id="centerForm:bandarPekanMukim_1"]').click();
  await page.waitForTimeout(1000);
  await page.locator('[id="centerForm:jenisHakmilik"] span').click();
  await page.waitForTimeout(1000);
  await page.locator('[id="centerForm:jenisHakmilik_2"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).click();
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).pressSequentially('37605', { delay: 150 });
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Teruskan Permohonan' }).click();
  await page.getByRole('row', { name: 'Dengan ini saya mengakui' }).locator('span').click();
  await page.waitForTimeout(3000);

  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.waitForTimeout(10000);

  // back to menu
  await page.locator('.menu-1').click();
  await page.getByRole('link', { name: 'Pendaftaran' }).click();
  await page.waitForTimeout(1000);

  // add more pcr
  await page.getByRole('row', { name: '5 PCR - Permohonan Carian' }).getByLabel('Buat Permohonan').click();
  await page.waitForTimeout(1000);
  await page.locator('[id="centerForm:bandarPekanMukim"] span').click();
  await page.waitForTimeout(1000);
  await page.locator('[id="centerForm:bandarPekanMukim_1"]').click();
  await page.waitForTimeout(1000);
  await page.locator('[id="centerForm:jenisHakmilik"] span').click();
  await page.waitForTimeout(1000);
  await page.locator('[id="centerForm:jenisHakmilik_2"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).click();
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).pressSequentially('36003', { delay: 150 });
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Teruskan Permohonan' }).click();
  await page.getByRole('row', { name: 'Dengan ini saya mengakui' }).locator('span').click();
  await page.waitForTimeout(3000);

  await page.getByRole('button', { name: 'Simpan' }).click();

  //Tambah ke troli
  await page.getByRole('columnheader', { name: 'Tarikh Siap' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('gridcell').nth(1).click();
  await page.waitForTimeout(1000);
  await page.getByRole('gridcell').filter({ hasText: /^$/ }).nth(2).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tambah Ke Troli' }).click();
  await page.waitForTimeout(1000);

  await page.locator('[id*="troliBayaranTable:j_idt119"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Proses Pembayaran' }).waitFor();
  await page.getByRole('button', { name: 'Proses Pembayaran' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(1000);

  // FPX
  await page.locator('[id*="paymentOnline:bank-selected_label"]').click();
  await page.waitForTimeout(1000);
  await page.locator('[id*="paymentOnline:bank-selected_24"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(1000);
 
  // Payment gateway
  await page.getByRole('textbox', { name: 'User Id' }).click();
  await page.getByRole('textbox', { name: 'User Id' }).fill('1234');
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Continue with Transaction' }).click();

  // if confront issue error page, click redirect button
  await page.getByRole('button', { name: 'Redirect' }).click();

  await page.waitForTimeout(2000);

  await page.locator('.menu-2').dispatchEvent('click');
  await page.waitForTimeout(1000);

  const transaksiCell = page.locator('td[role="gridcell"]').filter({
    hasText: /PDCR\d+\/\d+/
  });

  // Take the first one
  const transaksiIdText = await transaksiCell.first().innerText();
  // Extract only the PDCR pattern
  const match = transaksiIdText.match(/PDCR\d+\/\d+/);

  // for (let i = 0; i < 2; i++) {
  //   const cellText = await transaksiCells.nth(i).innerText();
  //   const id = cellText.match(/PDCR\d+\/\d+/)?.[0];
  //   if (id) transaksiIds.push(id);
  // }

  let transaksiId = "";
  if (match) {
    transaksiId = match[0];
    console.log("Extracted Transaksi ID:", transaksiId);
  } else {
    console.log("No PDCR ID found");
  }

  await page.getByRole('link', { name: 'Log Keluar' }).click();
  await page.context().clearCookies();
  await page.waitForTimeout(30000);

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
  await page.waitForTimeout(10000)


  // for (const transaksiId of transaksiIds) {
  //   console.log("Processing:", transaksiId);
  //   await filterInput.fill(transaksiId);
  //   await filterInput.press('Enter');
  //   await page.waitForTimeout(5000);
  // }
  // await page.mouse.wheel(0, -800);
  // await page.waitForTimeout(10000);

  // Enter back Awam to check status permohonan
  await page.locator('#tnd-2').click();
  await page.context().clearCookies();
  await page.addInitScript({ content: `window.validateCaptcha = () => true;` });

  //await page.goto('https://awamwp.ptgwp.gov.my/portal/ms/portal-awam');
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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('syafiieikudos@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();

  // WPKL
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();

  // Menu selection
  await page.locator('.menu-2').click();

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
  // Check status for each PDCR
  // =======================
  for (const id of transaksiId) {  
  const row = page.locator('tr').filter({
    has: page.getByRole('gridcell', { name: id })
  });

    const statusCell = row.getByRole('gridcell').nth(statusIndex);
    const statusText = await statusCell.innerText();

    if (statusText.trim() !== "Sedang Diproses") {
      throw new Error(`${id} status is NOT 'Sedang Diproses' → Found: ${statusText}`);
    }
  }
  await page.waitForTimeout(5000);

  console.log('TEST END');
});