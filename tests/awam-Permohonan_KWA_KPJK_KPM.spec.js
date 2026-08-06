import { test, expect } from '@playwright/test';
import path from 'path';

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

test('WPKL Awam - Permohonan KWA, KPJK, KPM(S)', async ({ page }) => {
  
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
  await loginFrame.getByRole('textbox', { name: 'ID Pengguna' }).fill('mohd.izwan.zakaria@gmail.com');
  await page.waitForTimeout(1000);
  await loginFrame.getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.waitForTimeout(1000);

  await loginFrame.getByRole('button', { name: 'Log Masuk' }).click();
  await page.waitForTimeout(1000);

  // WPKL
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.waitForTimeout(1000);

  // Menu Selection
  await page.locator('.menu-1').dispatchEvent('click');
  await page.waitForTimeout(1000);

  // Permohonan KWA, KPJK, KPM(S)
  await page.getByRole('link', { name: 'Consent' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('row', { name: '2 KGD(T) - Kebenaran Gadaian' }).getByLabel('Buat Permohonan').click();
  await page.waitForTimeout(1000);
  await page.locator('[id*="bandarPekanMukim_label"]').click();
  await page.waitForTimeout(1000);
  await page.locator('[id*="bandarPekanMukim_5"]').click();
  await page.waitForTimeout(1000);
  await page.locator('[id*="jenisHakmilik_label"]').click();
  await page.waitForTimeout(1000);
  await page.locator('[id*="jenisHakmilik_1"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).click();
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).pressSequentially('1700', { delay: 150 }); //2588

  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('gridcell').filter({ hasText: /^$/ }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Teruskan Permohonan' }).click();
  await page.waitForTimeout(2000);

  //Pemohon
  await page.locator('button[name*="maklumatPraPemohonTbl:isiPmhnBtn"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tutup', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByLabel('Maklumat Pemohon').getByTitle('Sila pilih Kategori Pemohon').locator('span').click();
  await page.locator('[id*="kategoriPemohon_items"]').getByRole('option', { name: 'Individu' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('group').filter({ hasText: 'Pemohon Adalah : - Sila Pilih' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Pemilik' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('group').filter({ hasText: 'Cara Dapat / Cara Perolehan' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Pertukaran Lot' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Bahagian yang hendak digadai :' }).click();
  await page.getByRole('textbox', { name: 'Bahagian yang hendak digadai :' }).fill('10');
  await page.waitForTimeout(1000);
  await page.locator('input[name*="praPenyebut_input"]').click();
  await page.locator('input[name*="praPenyebut_input"]').fill('10');
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Jenis Bangunan :' }).click();
  await page.getByRole('textbox', { name: 'Jenis Bangunan :' }).fill('KEDIAMAN');
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Harga Jualan (RM) :' }).click();
  await page.getByRole('textbox', { name: 'Harga Jualan (RM) :' }).fill('1000');
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Tarikh Perjanjian Jual Beli :' }).click();
  await page.locator('.ui-datepicker-calendar a.ui-state-default').first().click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Nama Individu :' }).click();
  await page.getByRole('textbox', { name: 'Nama Individu :' }).fill('TAN TEONG HEAN');
  await page.waitForTimeout(1000);
  await page.getByRole('group').filter({ hasText: 'Jenis/Nombor Pengenalan : -' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Kad Pengenalan Baru' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Jenis/Nombor Pengenalan :' }).click();
  await page.getByRole('textbox', { name: 'Jenis/Nombor Pengenalan :' }).fill('890101080101');
  await page.waitForTimeout(1000);
  await page.getByRole('group').filter({ hasText: 'Taraf Warganegara : - Sila' }).locator('span').nth(3).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tutup', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('group').filter({ hasText: 'Taraf Warganegara : - Sila' }).locator('span').nth(3).click();
  await page.locator('[id*="praWarganegara_items"]').getByRole('option', { name: 'Malaysia' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('group').filter({ hasText: 'Bangsa : - Sila Pilih -' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Cina' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('row', { name: 'Bumiputera Bukan Bumiputera' }).locator('span').first().click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Alamat Surat Menyurat :' }).click();
  await page.getByRole('textbox', { name: 'Alamat Surat Menyurat :' }).fill('NO 2');
  await page.waitForTimeout(1000);
  await page.locator('input[name*="alamatSurat2Pmhn"]').click();
  await page.locator('input[name*="alamatSurat2Pmhn"]').fill('TAMAN BAHAGIA');
  await page.waitForTimeout(1000);
  await page.locator('input[name*="alamatSurat3Pmhn"]').click();
  await page.locator('input[name*="alamatSurat3Pmhn"]').fill('JALAN SENTOSA');
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Poskod :' }).click();
  await page.getByRole('textbox', { name: 'Poskod :' }).fill('55000');
  await page.waitForTimeout(1000);
  await page.getByRole('group').filter({ hasText: 'Negeri : - Sila Pilih -' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'WILAYAH PERSEKUTUAN KUALA' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Simpan dan Tutup' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(1000);
  console.log('MAKLUMAT PEMOHON BERJAYA DISIMPAN');

  //Penerima
  await page.locator('button[name*="maklumatPraPenerimaTbl:isiPnrmaBtn"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tutup', exact: true }).click();
  await page.getByLabel('Maklumat Penerima').getByTitle('Sila pilih Kategori Pemohon').locator('span').click();
  await page.locator('[id*="kategoriPemohon_items"]').getByRole('option', { name: 'Individu' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Nama Individu :' }).click();
  await page.getByRole('textbox', { name: 'Nama Individu :' }).fill('AHMAD BIN ALi');
  await page.waitForTimeout(1000);
  await page.getByRole('group').filter({ hasText: 'Jenis/Nombor Pengenalan : -' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Kad Pengenalan Baru' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Jenis/Nombor Pengenalan :' }).click();
  await page.getByRole('textbox', { name: 'Jenis/Nombor Pengenalan :' }).fill('820101080101');
  await page.waitForTimeout(1000);
  await page.getByRole('group').filter({ hasText: 'Taraf Warganegara : - Sila' }).locator('span').nth(3).click();
  await page.locator('[id*="praWarganegara_items"]').getByRole('option', { name: 'Malaysia' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('group').filter({ hasText: 'Bangsa : - Sila Pilih -' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Melayu' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('row', { name: 'Bumiputera Bukan Bumiputera' }).locator('span').first().click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Alamat Surat Menyurat :' }).click();
  await page.getByRole('textbox', { name: 'Alamat Surat Menyurat :' }).fill('NO 2');
  await page.waitForTimeout(1000);
  await page.locator('input[name*="alamatSurat2"]').nth(1).click();
  await page.locator('input[name*="alamatSurat2"]').nth(1).fill('TAMAN MELATI');
  await page.waitForTimeout(1000);
  await page.locator('input[name*="alamatSurat3"]').nth(1).click();
  await page.locator('input[name*="alamatSurat3"]').nth(1).fill('LORONG BUNGA');
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Poskod :' }).click();
  await page.getByRole('textbox', { name: 'Poskod :' }).fill('48000');
  await page.waitForTimeout(1000);
  await page.getByRole('group').filter({ hasText: 'Negeri : - Sila Pilih -' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'WILAYAH PERSEKUTUAN KUALA' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Tujuan Pinjaman :' }).click();
  await page.getByRole('textbox', { name: 'Tujuan Pinjaman :' }).fill('PEMBELIAN RUMAH');
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Jumlah Pinjaman (RM) :' }).click();
  await page.getByRole('textbox', { name: 'Jumlah Pinjaman (RM) :' }).fill('1000');
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Tempoh Pinjaman :' }).click();
  await page.getByRole('textbox', { name: 'Tempoh Pinjaman :' }).fill('10');
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Simpan dan Tutup' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tutup' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  console.log('MAKLUMAT PENERIMA BERJAYA DISIMPAN');

  // // const filePath = path.resolve("uploadedFiles/TEST1.pdf");

  // Upload File
  const filePath = path.resolve("C:/Users/Emirul/Desktop/playwright-automation/Document/Testing.pdf");

  for (let i = 0; i < 4; i++) {
    await page.waitForTimeout(7000);
  
    // Build the locator dynamically
    const input = page.locator(
      `input[name*="semakanTable:${i}:uploadDok_input"]`
    );
  
      // Upload the file
      await input.setInputFiles(filePath);
    }

  console.log('DOKUMEN BERJAYA DISIMPAN');

  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(1000);
  await page.locator('button[name*="tabItem5:ttpDialog"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Sahkan' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(1000);
  //await page.locator('[id*="tabItem6:j_idt5996"] > tbody > tr > td').first().click();
  await page.locator('fieldset:has-text("Perakuan") .ui-chkbox-box').click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Bayar' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(2000);

  // Payment
  //await page.locator('[id="centerForm:mainTab:tabItem7:awam-bayaran-online:paymentOnline:bank-selected"] span').click();
  await page.locator('[id$="bank-selected"]').click();
  await page.waitForTimeout(1000);
  //await page.locator(`[id="centerForm:mainTab:tabItem7:awam-bayaran-online:paymentOnline:bank-selected_24"]`).click();
  await page.locator('li[data-label="SBI Bank A"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(10000);

  // Payment Gateway
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
  await page.waitForTimeout(10000); 

  // if counter an error page, redirect
  //await page.getByRole('button', { name: 'Redirect' }).click();

  console.log('PEMBAYARAN BERJAYA');

  // Go back to menu and check status
  await page.locator('.menu-2').click();
  await page.waitForTimeout(3000);
  
  const transaksiCell = page.locator('td[role="gridcell"]').filter({
    hasText: /\(?PTGKL\/\d+\/[\w()]+\/\d{4}\/\d+\)?/   
  });

  // Take the first one
  const transaksiIdText = await transaksiCell.first().innerText();

  // Extract only the PTGKL pattern
  const match = transaksiIdText.match(/\(?(PTGKL\/\d+\/[\w()]+\/\d{4}\/\d+)\)?/);

  let transaksiId = "";
  if (match) {
    transaksiId = match[1]; // innner pattern
    console.log("Extracted Transaksi ID:", transaksiId);
  } else {
    console.log("No PTGKL ID found");
  }
  await page.getByRole('link', { name: 'Log Keluar' }).click();

   /*page.once('dialog', async dialog => {
  console.log(`Dialog message: ${dialog.message()}`);
  await dialog.accept();
  });*/

  await page.goto('https://testing.ptgwp.gov.my/etanah-cas/login?service=https%3A%2F%2Ftesting.ptgwp.gov.my%2Fetanah-consent%2Flogin%2Fcas');
  
  await page.evaluate(() => {
    // @ts-ignore
    window.handleLoginSubmit = () => true;
  });

  await page.locator('#username').click();
  await page.locator('#username').fill('nurkhairi@ptgwp.gov.my');
  await page.waitForTimeout(1000);
  await page.locator('#password').click();
  await page.locator('#password').fill('etanah123#');
  await page.waitForTimeout(1000);
  await page.locator('#password').press('Enter');
  
  await page.getByText('CARIAN', { exact: true }).click();
  await page.getByRole('link', { name: 'Carian Pintas' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'ID Permohonan / No. Serahan' }).click();
  await page.getByRole('textbox', { name: 'ID Permohonan / No. Serahan :' }).fill(transaksiId);
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Cari' }).click();
  await page.waitForTimeout(10000);

  // await waitForPF(page);
  // const idPermohonananColumn = page.getByRole('columnheader', { name: 'ID Permohonan / No. Serahan' });
  // const filterInput = idPermohonananColumn.locator('input[name*=mainForm:tabView:tasks:"][name*=filter]');
  // await filterInput.click();
  // await filterInput.fill(transaksiId);
  // await filterInput.press('Enter');
  // await page.waitForTimeout(3000);


  // Enter back Awam to check status permohonan
  await page.locator('#tnd-2').click();
  await page.context().clearCookies();
  await page.addInitScript({ content: `window.validateCaptcha = () => true;` });

  await page.goto('https://awamwp.ptgwp.gov.my/portal/awam-landing-page');

  await page.getByRole('link', { name: 'LOG MASUK' }).click();

  if (await closeButton.isVisible()) {
    await closeButton.click();
  }

  const loginFrame2 = page.frameLocator('iframe[title="eTanahAwam"]');
 
  // Log Masuk
  await loginFrame2.getByRole('textbox', { name: 'ID Pengguna' }).fill('mohd.izwan.zakaria@gmail.com');
  await page.waitForTimeout(1000);
  await loginFrame2.getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.waitForTimeout(1000);

  await loginFrame2.getByRole('button', { name: 'Log Masuk' }).click();

  // WPKL
  await page.locator('.bottom-wrapper-content-1 > div:nth-child(2) > a').click();
  await page.waitForTimeout(1000);

  // Menu Selection
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
  // Check status for the PDCR row
  // =======================
  const row = page.locator('tr').filter({
    has: page.getByRole('gridcell', { name: transaksiId })
  });

  const statusCell = row.getByRole('gridcell').nth(statusIndex);

  await statusCell.waitFor({ state: "visible" }); // safer than waitForTimeout

  const statusText = await statusCell.innerText();

  if (statusText.trim() !== "Semakan Maklumat") {
    throw new Error(`${transaksiId} status is NOT 'Semakan Maklumat' → Found: ${statusText}`);
  }

  console.log('TEST END');
  await page.waitForTimeout(10000);
});