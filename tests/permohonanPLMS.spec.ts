import { test, expect } from '@playwright/test';
import path from 'path';

test.use({
  ignoreHTTPSErrors: true
});

test('WPKL Permohonan Urusan PT, PLMS, PRU, dan PSBS dari Portal Awam sehingga janaan ID Permohonan selepas membuat bayaran di SPOC', async ({ page }) => {

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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('sookfun0225@hotmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.locator('.menu-1').waitFor();
  await page.locator('.menu-1').click();
  await page.getByRole('link', { name: 'Pelupusan' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('row', { name: '4 PLMS - Permohonan Lesen' }).getByLabel('Buat Permohonan').waitFor();
  await page.getByRole('row', { name: '4 PLMS - Permohonan Lesen' }).getByLabel('Buat Permohonan').click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Isi Maklumat' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nama :' }).click();
  await page.getByRole('textbox', { name: 'Nama :' }).fill('ali bin ahmad');
  await page.waitForTimeout(3000);
  await page.getByTitle('Sila pilih jenis No. Kad').locator('span').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Kad Pengenalan Baru' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Jenis & No. Pengenalan :' }).click();
  await page.getByRole('textbox', { name: 'Jenis & No. Pengenalan :' }).fill('890101080101');
  await page.waitForTimeout(3000);
  await page.getByTitle('Sila pilih warna no K/P Baru').locator('span').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Biru', exact: true }).click();
  await page.waitForTimeout(3000);
  await page.getByTitle('Sila pilih jenis bangsa').locator('span').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Melayu' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Tempat Lahir :' }).click();
  await page.getByRole('textbox', { name: 'Tempat Lahir :' }).fill('SELANGOR');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Alamat Berdaftar :' }).click();
  await page.getByRole('textbox', { name: 'Alamat Berdaftar :' }).fill('NO 3');
  await page.waitForTimeout(3000);
  await page.locator('input[name*="alamatDaftar2"]').click();
  await page.locator('input[name*="alamatDaftar2"]').fill('JALAN BAHAGIA');
  await page.waitForTimeout(3000);
  await page.locator('input[name*="alamatDaftar3"]').click();
  await page.locator('input[name*="alamatDaftar3"]').fill('TAMAN SELALU');
  await page.waitForTimeout(3000);
  await page.locator('input[name*="poskodDaftar"]').click();
  await page.locator('input[name*="poskodDaftar"]').fill('46000');
  await page.waitForTimeout(3000);
  // await page.pause();
  await page.locator('input[name*="negeriDaftar_input"]').click();
  await page.locator('input[name*="negeriDaftar_input"]').type('WILAYAH PERSEKUTUAN KUALA LUMPUR', { delay: 100 });
  await page.waitForTimeout(3000);
  await page.locator('input[name*="negeriDaftar_input"]').press('Enter');
  await page.locator('text=Seperti Alamat Berdaftar')
  .locator('..') // go to parent
  .locator('.ui-chkbox-box')
  .click();
  await page.waitForTimeout(3000);

  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).click();
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).fill('0113768967');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Emel :' }).click();
  await page.getByRole('textbox', { name: 'Emel :' }).fill('ali@gmail.com');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Pekerjaan :' }).click();
  await page.getByRole('textbox', { name: 'Pekerjaan :' }).fill('pegawai');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Pendapatan Sebulan (RM) :' }).click();
  await page.getByRole('textbox', { name: 'Pendapatan Sebulan (RM) :' }).fill('20000');
  await page.waitForTimeout(3000);
  await page.getByTitle('Sila pilih rumah diduduki').locator('span').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Rumah Sendiri' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('row', { name: '1-5 Tahun Kurang Setahun' }).locator('span').first().click();
  await page.waitForTimeout(3000);
  await page.getByLabel('Maklumat Pemohon').getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByLabel('Maklumat Pemohon').getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:mainTab:tabItem1:not-putrajaya-panel"] span').nth(3).click();
  await page.locator('[id="centerForm:mainTab:tabItem1:bandarPekanMukim_items"]').getByRole('option', { name: '- Mukim Batu' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Tempat/Lokasi :' }).click();
  await page.getByRole('textbox', { name: 'Tempat/Lokasi :' }).fill('KUALA LUMPUR');
  await page.waitForTimeout(3000);
  await page.locator('div').filter({ hasText: /^- Sila Pilih -BlokLain-lainLotMLOPTPTBPTDPlotTLO- Sila Pilih -$/ }).locator('span').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Lot', exact: true }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'No. Lot/PT :' }).click();
  await page.getByRole('textbox', { name: 'No. Lot/PT :' }).fill('123');
  await page.getByTitle('Sila pilih tujuan permohonan.').locator('span').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Industri' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Keluasan Tanah :' }).click();
  await page.getByRole('textbox', { name: 'Keluasan Tanah :' }).fill('1200');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);

  const filePath = path.resolve("C:/playwright/Document/Testing.pdf");
  const imgPath = path.resolve("C:/playwright/Document/KegunaanTesting.tiff");

  for (let i = 0; i <= 6; i++) {
  // Just to give a bit of buffer time between uploads (optional)
  await page.waitForTimeout(5000);

  // Build the correct input selector for each row
  const input = page.locator(
    `input[name="centerForm:mainTab:tabItem3:semakanTable:${i}:uploadDok_input"]`
  );

  if (i === 3 || i === 4) {
    await input.setInputFiles(imgPath);
  } else {
    await input.setInputFiles(filePath);
  }
}
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:mainTab:tabItem4:senarai-dokumen-table:0:papar-button"]').click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Sahkan' }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:mainTab:tabItem4:senarai-dokumen-table:1:papar-button"]').click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Sahkan' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('row', { name: 'Dengan ini saya mengakui' }).locator('span').click();
  await page.waitForTimeout(3000);
 await page.getByRole('button', { name: 'Bayar' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:mainTab:tabItem5:awam-bayaran-online:paymentOnline:bank-selected"] span').click();
  await page.locator('[id="centerForm:mainTab:tabItem5:awam-bayaran-online:paymentOnline:bank-selected_24"]').click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'User Id' }).click();
  await page.getByRole('textbox', { name: 'User Id' }).fill('1234');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'Continue with Transaction' }).click();
  await page.locator('.menu-2').click();
  const transaksiCell = page.locator('td[role="gridcell"]').filter({
    hasText: /PTGKL\/\d+\/[A-Z]+\/\d{4}\/\d+/   
  });

  // Take the first one
  const transaksiIdText = await transaksiCell.first().innerText();

  // Extract only the PTGKL pattern
  const match = transaksiIdText.match(/PTGKL\/\d+\/[A-Z]+\/\d{4}\/\d+/ );

  let transaksiId = "";
  if (match) {
    transaksiId = match[0];
    console.log("Extracted Transaksi ID:", transaksiId);
  } else {
    console.log("No PTGKL ID found");
  }
    await page.getByRole('link', { name: 'Log Keluar' }).click();
   page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept();
  });
  await page.goto('https://testing.ptgwp.gov.my/etanah-cas/login?service=https%3A%2F%2Ftesting.ptgwp.gov.my%2Fetanah-uam%2Flogin%2Fcas');
  await page.evaluate(() => {
    // @ts-ignore
    window.handleLoginSubmit = () => true;
  });
  await page.locator('#username').click();
  await page.locator('#username').fill('noremy@ptgwp.gov.my');
  await page.locator('#password').click();
  await page.locator('#password').fill('etanah123#');
  await page.locator('#password').press('Enter');
  await page.locator('#menu-30 span').nth(1).click();
  await page.getByRole('link', { name: 'Pergerakan Fail' }).click();
  await page.getByRole('textbox', { name: 'ID Permohonan/No. Serahan :' }).click();
  await page.getByRole('textbox', { name: 'ID Permohonan/No. Serahan :' }).fill(transaksiId);
  await page.getByRole('button', { name: 'Cari' }).click();
  await page.waitForTimeout(10000);
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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('sookfun0225@hotmail.com');
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

  await page.waitForTimeout(10000);
});