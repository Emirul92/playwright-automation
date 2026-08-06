import { test, expect } from '@playwright/test';

test.use({
  ignoreHTTPSErrors: true
});

test('WPKL PCR Senario 2 - Berangkai', async ({ page }) => {

  //-------Constant Declaration---------
  // Maklumat Hakmilik 1:
  const bandarPekanMukim = 'Mukim Kuala Lumpur';
  const jnsHakmilik = 'GRN - Geran';
  const noHakmilik = '145';
  // Maklumat Hakmilik 2:
  const bandarPekanMukim2 = 'Mukim Kuala Lumpur';
  const jnsHakmilik2 = 'GRN - Geran';
  const noHakmilik2 = '148';

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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('k.raja5560@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.goto('https://awamwp.ptgwp.gov.my/etanah-awam/protected/awam/PapanBuletinForm.xhtml');
  await page.locator('.menu-1').click();
  await page.getByRole('link', { name: 'Pendaftaran' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('row', { name: '5 PCR - Permohonan Carian' }).getByLabel('Buat Permohonan').click();
  await page.locator('[id="centerForm:bandarPekanMukim"] span').waitFor({ state: "visible" });
  // Maklumat Hakmilik 1
  await page.locator('[id="centerForm:bandarPekanMukim"] span').click();
  // await page.locator('[id="centerForm:bandarPekanMukim_5"]').click();
  await page.locator('.ui-selectonemenu-panel:visible').getByRole('option', { name: bandarPekanMukim }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:jenisHakmilik"] span').click();
  // await page.locator('[id="centerForm:jenisHakmilik_2"]').click();
  await page.locator('.ui-selectonemenu-panel:visible').getByRole('option', { name: jnsHakmilik }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).click();
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).fill(noHakmilik);
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.waitForTimeout(3000);
  // await page.getByText('Hakmilik Batal', { exact: true }).click();
  // await page.getByRole('button', { name: 'Ya' }).click();
  const cancelText = page.getByText('Hakmilik Batal', { exact: true });

  if (await cancelText.isVisible({ timeout: 2000 })) {
  await cancelText.click();
  await page.getByRole('button', { name: 'Ya' }).click();
  }
  await page.waitForTimeout(3000);
  await page.mouse.wheel(0, 800);
  // Maklumat Hakmilik 2
  await page.locator('[id="centerForm:bandarPekanMukim"] span').click();
  // await page.locator('[id="centerForm:bandarPekanMukim_1"]').click();
  await page.locator('.ui-selectonemenu-panel:visible').getByRole('option', { name: bandarPekanMukim2 }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:jenisHakmilik"] div').nth(2).click();
  // await page.locator('[id="centerForm:jenisHakmilik_2"]').click();
  await page.locator('.ui-selectonemenu-panel:visible').getByRole('option', { name: jnsHakmilik2 }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).click();
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).fill(noHakmilik2);
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.getByRole('button', { name: 'Teruskan Permohonan' }).click();
  await page.getByRole('group', { name: 'Perakuan' }).waitFor();
  await page.getByRole('tabpanel').getByRole('gridcell').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { name: 'Bayar' }).click();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.locator('[id="centerForm:mainTab:tabItem1:awam-bayaran-online:paymentOnline:bank-selected"] span').click();
  //await page.locator(`[id="centerForm:mainTab:tabItem1:awam-bayaran-online:paymentOnline:bank-selected_${bankFPX}"]`).click();
  await page.locator('[id="centerForm:mainTab:tabItem1:awam-bayaran-online:paymentOnline:bank-selected_24"]').click();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.getByRole('textbox', { name: 'User Id' }).click();
  await page.getByRole('textbox', { name: 'User Id' }).fill('1234');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'Continue with Transaction' }).click();
  await page.locator('.menu-2').click();
  const transaksiCells = page.locator('td[role="gridcell"]').filter({
    hasText: /PDCR\d+\/\d+/
  });

  const count = await transaksiCells.count();
  const transaksiIds = [];

  for (let i = 0; i < 2; i++) {
    const cellText = await transaksiCells.nth(i).innerText();
    const id = cellText.match(/PDCR\d+\/\d+/)?.[0];
    if (id) transaksiIds.push(id);
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
  for (const transaksiId of transaksiIds) {
    console.log("Processing:", transaksiId);
    await filterInput.fill(transaksiId);
    await filterInput.press('Enter');
    await page.waitForTimeout(5000);
  }
  // Enter back Awam to check status permohonan
  await page.locator('#tnd-2').click();
  await page.context().clearCookies();
  await page.addInitScript({ content: `window.validateCaptcha = () => true;` });

  await page.goto('https://awamwp.ptgwp.gov.my/portal/awam-landing-page');
  if (await closeButton.isVisible()) {
    await closeButton.click();
  }
  await page.getByRole('link', { name: 'LOG MASUK' }).click();
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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('k.raja5560@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.locator('.menu-2').click();
  await page.waitForTimeout(10000);
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
  for (const id of transaksiIds) {  
  const row = page.locator('tr').filter({
    has: page.getByRole('gridcell', { name: id })
  });

    const statusCell = row.getByRole('gridcell').nth(statusIndex);
    const statusText = await statusCell.innerText();

    if (statusText.trim() !== "Sedang Diproses") {
      throw new Error(`${id} status is NOT 'Sedang Diproses' → Found: ${statusText}`);
    }
  }
  await page.waitForTimeout(10000);
});