import { test, expect } from '@playwright/test';
import path from 'path';
// import { getHakmilikIdsByUnusedAndPaid } from "../../../../utils/wpkl/awam/getHakmilikId";
// import { updateHakmilikIdUsedStatus } from "../../../../utils/wpkl/awam/updateHakmilikId";
// import { getBankFpx } from "../../../../utils/wpkl/awam/getBankFpx";

test.use({
  ignoreHTTPSErrors: true
});

test('WPKL Permohonan daripada portal awam sehingga tugasan kemasukan maklumat (PSBB, PTS, PPS, PPB, PYT, PST, PSST)', async ({ page }) => {
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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('hewsonoh@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.waitForTimeout(3000);

  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.locator('.menu-1').click();
  await page.waitForTimeout(2000);

  await page.getByRole('link', { name: 'Pembangunan' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('row', { name: '4 PSBB - Permohonan Serah' }).getByLabel('Buat Permohonan').click();
  await page.waitForTimeout(2000);
  await page.locator('[id="centerForm:bandarPekanMukim"] span').waitFor({ state: "visible" });
  await page.locator('[id="centerForm:bandarPekanMukim"] span').click();
  await page.locator(`[id="centerForm:bandarPekanMukim_1"]`).click();
  await page.waitForTimeout(2000);
  await page.getByTitle('Sila pilih jenis hakmilik.').locator('span').click();
  await page.locator(`[id="centerForm:jenisHakmilik_2"]`).click();
  await page.waitForTimeout(2000);
  await page.locator('[id="centerForm:noHakmilikBgn"]').click();
  await page.locator('[id="centerForm:noHakmilikBgn"]').pressSequentially('82', { delay: 150 });
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Tambah' }).dblclick();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Teruskan Permohonan' }).click();
  await page.waitForTimeout(2000);
  await page.locator('button[name*="pemohonTable"][name*="isiMaklumatBtn"]').click();
  await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Jenis Pemohon : - Sila Pilih' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Individu' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nama :' }).click();
  await page.getByRole('textbox', { name: 'Nama :' }).fill('ALI BIN ABU');
  await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Jenis/Nombor Pengenalan : -' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Kad Pengenalan Baru' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Jenis/Nombor Pengenalan :' }).click();
  await page.getByRole('textbox', { name: 'Jenis/Nombor Pengenalan :' }).pressSequentially('890101080101', { delay: 150 });
  await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Warganegara : - Sila Pilih -' }).locator('span').nth(3).click();
  await page.locator('[id*="warganegara_items"]').getByRole('option', { name: 'Malaysia' }).click();
  await page.waitForTimeout(3000);
  await page.getByTitle('Sila pilih Status Individu.').locator('span').click();
  await page.locator('[id*="statusIndividu_items"]').getByRole('option', { name: 'Tidak Bankrap' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Alamat Berdaftar :' }).click();
  await page.getByRole('textbox', { name: 'Alamat Berdaftar :' }).fill('NO 2');
  await page.waitForTimeout(3000);
  await page.locator('input[name*="iaram_ab2"]').click();
  await page.locator('input[name*="iaram_ab2"]').fill('JALAN MELATI');
  await page.waitForTimeout(3000);
  await page.locator('input[name*="iaram_ab3"]').click();
  await page.locator('input[name*="iaram_ab3"]').fill('TAMAN MELATI');
  await page.waitForTimeout(3000);
  await page.locator('input[name*="iaram_abp"]').click();
  await page.locator('input[name*="iaram_abp"]').fill('43000');
  await page.waitForTimeout(3000);
  await page.getByLabel('Maklumat Pemohon').locator('label').filter({ hasText: '- Sila Pilih -' }).first().click();
  await page.getByRole('listbox').getByRole('option', { name: 'WILAYAH PERSEKUTUAN KUALA' }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id*="iaram_checkbox_panel"] span').click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).click();
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).fill('0134567896');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Emel :' }).click();
  await page.getByRole('textbox', { name: 'Emel :' }).fill('ali@gmail.com');
  await page.waitForTimeout(3000);
  await page.getByLabel('Maklumat Pemohon').getByRole('button', { name: 'Simpan' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('C:/Users/Nur Ainisa/Downloads/playwright/playwright-demo/Test.xlsx');
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'No. OSC :' }).click();
  await page.getByRole('textbox', { name: 'No. OSC :' }).fill('11');
  await page.waitForTimeout(3000);
  await page.locator('input[type="text"][name*="noPelanPraHitunganTable"][name*="noPelanPraHitungan"]:not([name*="tarikhPraHitungan_input"])').click();
  await page.locator('input[type="text"][name*="noPelanPraHitunganTable"][name*="noPelanPraHitungan"]:not([name*="tarikhPraHitungan_input"])').fill('11');
  await page.waitForTimeout(3000);
  await page.locator('input[name*="noPelanPraHitunganTable"][name*="tarikhPraHitungan_input"]').click();
  await page.waitForTimeout(3000);
  await page.locator('.ui-datepicker-calendar a.ui-state-default').first().click();
  await page.waitForTimeout(3000);
  await page.locator('input[type="text"][name*="noPerintahTable"][name*="noPerintahPembangunan"]:not([name*="tarikhPerintahPembangunan_input"])').click();
  await page.locator('input[type="text"][name*="noPerintahTable"][name*="noPerintahPembangunan"]:not([name*="tarikhPerintahPembangunan_input"])').fill('12');
  await page.waitForTimeout(3000);
  await page.locator('[id*="tarikhPerintahPembangunan_input"]').click();
  await page.waitForTimeout(3000);
  await page.locator('.ui-datepicker-calendar a.ui-state-default').first().click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
    const filePath = path.resolve("C:/Users/Nur Ainisa/Downloads/playwright/playwright-demo/TEST1.pdf");
    const imgPath = path.resolve("C:/Users/Nur Ainisa/Downloads/playwright/playwright-demo/baseline.jpg");
  
    for (let i = 0; i <= 7; i++) {
    // Just to give a bit of buffer time between uploads (optional)
    await page.waitForTimeout(5000);
  
    // Build the correct input selector for each row
    const input = page.locator(
      `input[name="centerForm:mainTab:tabItem5:semakanTable:${i}:uploadDok_input"]`
    );
  
    if (i === 3) {
      await input.setInputFiles(imgPath);
    } else {
      await input.setInputFiles(filePath);
    }
  }
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Sahkan' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('tabpanel').getByRole('gridcell').filter({ hasText: /^$/ }).locator('span').click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Bayar' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id*="paymentOnline:bank-selected_label"]').click();
  await page.waitForTimeout(1000);
  await page.locator('[id*="paymentOnline:bank-selected_24"]').click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();

  // // Update the hakmilik record to mark it as used after successful test completion
  // try {
  //   await updateHakmilikIdUsedStatus(doc_id);
  //   console.log(`Successfully updated hakmilik record ${doc_id} as used.`);
  // } catch (error) {
  //   console.error(`Failed to update hakmilik record ${doc_id} as used:`, error);
  // }

  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'User Id' }).click();
  await page.getByRole('textbox', { name: 'User Id' }).fill('1234');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'Continue with Transaction' }).click();
  await page.waitForTimeout(5000);

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

  await page.goto('https://testing.ptgwp.gov.my/etanah-cas/login?service=https%3A%2F%2Ftesting.ptgwp.gov.my%2Fetanah-consent%2Flogin%2Fcas');
  
  await page.evaluate(() => {
    // @ts-ignore
    window.handleLoginSubmit = () => true;
  });

  await page.locator('#username').click();
  await page.locator('#username').fill('zahriana@ptgwp.gov.my');
  await page.locator('#password').click();
  await page.locator('#password').fill('etanah123#');
  await page.locator('#password').press('Enter');
  await page.waitForTimeout(3000);
  await page.locator('#menu-30 span').nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'Pergerakan Fail' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'ID Permohonan/No. Serahan :' }).click();
  await page.getByRole('textbox', { name: 'ID Permohonan/No. Serahan :' }).fill(transaksiId);
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Cari' }).click();
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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('hewsonoh@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();

  // WPKL
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.waitForTimeout(2000);

  // Menu Selection
  await page.locator('.menu-2').click();
  await page.waitForTimeout(5000);

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
    has: page.getByRole('gridcell').filter({ hasText: transaksiId })
  });

  const statusCell = row.getByRole('gridcell').nth(statusIndex);

  await statusCell.waitFor({ state: "visible" });

  const statusText = await statusCell.innerText();

  if (statusText.trim() !== "Semakan Permohonan") {
    throw new Error(`${transaksiId} status is NOT 'Semakan Permohonan' → Found: ${statusText}`);
  }

  await page.waitForTimeout(2000);
});