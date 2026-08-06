import { test, expect } from '@playwright/test';
// import { getBankFpx } from "../../../../utils/wpkl/awam/getBankFpx";
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

test('WPKL CSDS', async ({ page }) => {

  await page.goto('https://awamwp.ptgwp.gov.my/portal/awam-landing-page');

  await page.getByRole('link', { name: 'LOG MASUK' }).click();

  const closeButton = page.getByRole('button', { name: 'Close' });
  if (await closeButton.isVisible()) {
    await closeButton.click();
  } //PTGKL/16/CSDS/2026/45
  
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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('emelyfauzi09@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.locator('.menu-1').click();
  await page.getByRole('link', { name: 'Pendaftaran' }).click();
  await page.waitForTimeout(3000);

  await page.getByRole('row', { name: '1 CSDS - Carian Butir-Butir' }).getByLabel('Buat Permohonan').click();

  await page.locator('[id="centerForm:bandarPekanMukim"] span').waitFor();
  await page.locator('[id="centerForm:bandarPekanMukim"] span').click();
  await page.locator('[id="centerForm:bandarPekanMukim_6"]').click();
  await page.waitForTimeout(2000);
  await page.locator('[id="centerForm:jenisHakmilik"] span').click();
  await page.locator('[id="centerForm:jenisHakmilik_2"]').click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).click();
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).pressSequentially('3221', { delay: 150 });
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Teruskan Permohonan' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.waitForTimeout(3000);
  

  await page.locator('.ui-selectonemenu-trigger.ui-state-default.ui-corner-right.ui-state-focus > .ui-icon').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Badan Pengurusan Bersama' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nama Pemohon Badan Pengurusan' }).click();
  await page.getByRole('textbox', { name: 'Nama Pemohon Badan Pengurusan' }).fill('JMB');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Alamat :' }).click();
  await page.getByRole('textbox', { name: 'Alamat :' }).fill('NO 2');
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:mainTab:tabItem1:iAlamat2"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem1:iAlamat2"]').fill('JALAN IMPIAN');
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:mainTab:tabItem1:iAlamat3"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem1:iAlamat3"]').fill('TAMAN BAHAGIA');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Poskod :' }).click();
  await page.getByRole('textbox', { name: 'Poskod :' }).fill('56000');
  await page.waitForTimeout(3000);
  await page.locator('label').filter({ hasText: '- Sila Pilih -' }).nth(2).click();
  await page.getByRole('listbox').getByRole('option', { name: 'WILAYAH PERSEKUTUAN KUALA' }).click();
  await page.getByRole('button', { name: 'Simpan dan Tutup' }).click();
  await page.getByRole('button', { name: 'Seterusnya' }).click();

  const filePath = path.resolve("C:/Users/Nur Ainisa/Downloads/playwright/playwright-demo/TEST1.pdf");

  for (let i = 0; i < 4; i++) {
    await page.waitForTimeout(7000);

    // Build the locator dynamically
    const input = page.locator(
      `input[name="centerForm:mainTab:tabItem2:semakanTable:${i}:uploadDok_input"]`
    );

    // Upload the file
    await input.setInputFiles(filePath);
  }

  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.getByRole('button', { name: 'Sahkan' }).click();
  await page.getByRole('row', { name: 'Dengan ini saya mengakui' }).locator('span').click();
  await page.getByRole('button', { name: 'Hantar' }).click();
  await page.waitForTimeout(5000);

  await page.locator('.menu-2').click();
  await page.waitForTimeout(1000);

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
  await page.locator('#username').fill('nurulhapipi@ptgwp.gov.my');
  await page.locator('#password').click();
  await page.locator('#password').fill('Etanah123#');
  await page.locator('#password').press('Enter');
  await page.waitForTimeout(5000);

  const idPermohonanColumn = page.getByRole('columnheader', { name: 'ID Permohonan / No. Serahan' });
  const filterInput = idPermohonanColumn.locator('input[name^="mainForm:tabView:tasks:"][name*="filter"]');
  await filterInput.click();
  await page.waitForTimeout(5000);
  await filterInput.fill(transaksiId);
  await page.waitForTimeout(5000);
  await filterInput.press('Enter');
  await page.waitForTimeout(5000);

  // await page.getByRole('gridcell', { name: transaksiId }).click();
  await page.evaluate(() => {
    const td = document.querySelector('tr[data-ri="0"] td:first-child');
    if (td) {
      td.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  });

  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Seterusnya' }).waitFor();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('row', { name: 'Lengkap Tidak Lengkap' }).locator('span').first().click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Hantar' }).click();
  await page.waitForTimeout(5000);
  // Back to Awam
  await page.locator('#tnd-2').getByRole('link').click();
  await page.context().clearCookies();
  await page.addInitScript({ content: `window.validateCaptcha = () => true;` });

  await page.goto('https://awamwp.ptgwp.gov.my/portal/awam-landing-page');

  await page.getByRole('link', { name: 'LOG MASUK' }).click();

  if (await closeButton.isVisible()) {
    await closeButton.click();
  }
  // const frameHandle2 = await page.locator('#ifr').elementHandle();
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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('emelyfauzi09@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.locator('.menu-2').click();
  await page.waitForTimeout(5000);

  await page.getByRole('link', { name: 'Kemaskini' }).first().click();
  const transaksiCell1 = page.locator('td[role="gridcell"]').filter({
    hasText: /\d{2}CSDS\d+/  
  });

  // Take the first one
  const transaksiIdText1 = await transaksiCell1.first().innerText();

  // Extract only the PTGKL pattern
  const match1 = transaksiIdText1.match(/\d{2}CSDS\d+/);

  let transaksiId1 = "";
  if (match1) {
    transaksiId1 = match1[0];
    console.log("Extracted Transaksi ID:", transaksiId1);
  } else {
    console.log("No PTGKL ID found");
  }
  await page.locator('tr[role="row"]').filter({ hasText: transaksiId1 })
  .locator('span')
  .first()
  .click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Tambah Ke Troli' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Proses Pembayaran' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(2000);
  await page.locator('[id*="paymentOnline:bank-selected_label"]').click();
  await page.locator('[id*="paymentOnline:bank-selected_24"]').click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'User Id' }).fill('1234');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'Continue with Transaction' }).click();
  await page.waitForTimeout(5000);
  
  await page.locator('.menu-2').click();
  const transaksiCell2 = page.locator('td[role="gridcell"]').filter({
    hasText: /PDCS\d+\/\d{4}/  
  });

  // Take the first one
  const transaksiIdText2 = await transaksiCell2.first().innerText();

  // Extract only the PTGKL pattern
  const match2 = transaksiIdText2.match(/PDCS\d+\/\d{4}/);

  let transaksiId2 = "";
  if (match2) {
    transaksiId2 = match2[0];
    console.log("Extracted Transaksi ID:", transaksiId2);
  } else {
    console.log("No PDSC ID found");
  }
  await page.getByRole('link', { name: 'Log Keluar' }).click();
  await page.context().clearCookies();
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
  await page.locator('#username').fill('nurulhapipi@ptgwp.gov.my');
  await page.locator('#password').click();
  await page.locator('#password').fill('Etanah123#');
  await page.locator('#password').press('Enter');
  await page.waitForTimeout(2000);
  await page.locator('#menu-30 span').nth(1).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Pergerakan Fail' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'ID Permohonan/No. Serahan :' }).click();
  await page.getByRole('textbox', { name: 'ID Permohonan/No. Serahan :' }).fill(transaksiId2);
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Cari' }).click();
  await page.waitForTimeout(10000);
});