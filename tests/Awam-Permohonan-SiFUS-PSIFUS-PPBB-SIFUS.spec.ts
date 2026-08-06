import { test, expect } from '@playwright/test';
import path from 'path';
//import path from 'path';
//import { noDeprecation } from 'process';

test.use({
  ignoreHTTPSErrors: true
});

test('WPKL Awam - Permohonan SiFUS,PSIFUS,PPBB', async ({ page }) => {

  //-------Constant Declaration---------
  // Maklumat Hakmilik:
  const bandarPekanMukim = ('Bandar Kuala Lumpur');
  const jnsHakmilik = ('GRN - Geran');
  const noHakmilik = ('79792')

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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('leo.autism@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.locator('.menu-1').click();
  await page.getByRole('link', { name: 'Strata' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('row', { name: '14 SIFUS - Permohonan Sijil' }).getByLabel('Buat Permohonan').click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:bandarPekanMukim"] span').click();
  //await page.locator(`[id="centerForm:bandarPekanMukim_${bandarPekanMukim}"]`).click();
  // await page.locator('[id="centerForm:bandarPekanMukim_8"]').click();
  await page.locator('.ui-selectonemenu-panel:visible').getByRole('option', { name: bandarPekanMukim }).click();
  await page.waitForTimeout(3000);
  await page.getByTitle('Sila pilih jenis hakmilik.').locator('div').nth(3).click();
  //await page.locator(`[id="centerForm:jenisHakmilik_${dbToDropdownIndex[jnsHakmilik]}"]`).click();
  // await page.locator('[id="centerForm:jenisHakmilik_2"]').click();
  await page.locator('.ui-selectonemenu-panel:visible').getByRole('option', { name: jnsHakmilik }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).click();
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).fill(noHakmilik);
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.locator('.ui-chkbox-icon').first().click();
  //await page.locator('[id="centerForm:maklumatHakmilikTbl:j_idt743"]').click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Teruskan Permohonan' }).click();
  await page.waitForTimeout(3000);
  await page.locator('button[name*="maklumatPraPemohonTbl:isiMaklumatBtn"]').dispatchEvent('click');
  await page.waitForTimeout(3000);
  await page.getByTitle('Sila pilih Jenis Pemohon.').locator('span').click();
  await page.locator('[id*="kategoriPemohon_items"]').getByRole('option', { name: 'Syarikat/Badan-badan' }).click();
  await page.waitForTimeout(3000);
  await page.locator('input[name*="noKp1"]').click();
  await page.locator('input[name*="noKp1"]').fill('1234');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nama Pemilik Asal :' }).click();
  await page.getByRole('textbox', { name: 'Nama Pemilik Asal :' }).fill('ANA BINTI ALI');
  await page.waitForTimeout(3000);
  await page.getByTitle('Sila pilih Status Syarikat.').locator('span').click();
  await page.locator('[id*="statusSyarikat_items"]').getByRole('option', { name: 'Tidak Gulung' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Alamat Berdaftar :' }).click();
  await page.getByRole('textbox', { name: 'Alamat Berdaftar :' }).fill('NO 2');
  await page.waitForTimeout(3000);
  await page.locator('input[name*="iaram_ab2"]').click();
  await page.locator('input[name*="iaram_ab2"]').fill('JALAN DURIAN');
  await page.waitForTimeout(3000);
  await page.locator('input[name*="iaram_ab3"]').click();
  await page.locator('input[name*="iaram_ab3"]').fill('TAMAN DURIAN');
  await page.waitForTimeout(3000);
  await page.locator('input[name*="iaram_abp"]').click();
  await page.locator('input[name*="iaram_abp"]').fill('56000');
  await page.waitForTimeout(3000);
  await page.getByLabel('Maklumat Pemilik Asal').locator('[id*="iaram_abn_panel"]').getByTitle('Sila masukkan alamat').locator('span').click();
  await page.waitForTimeout(3000);
  await page.locator('[id*="iaram_abn_items"]').getByRole('option', { name: 'WILAYAH PERSEKUTUAN KUALA' }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id*="iaram_checkbox_panel"] span').click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).click();
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).fill('0123456789');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Emel :' }).click();
  await page.getByRole('textbox', { name: 'Emel :' }).fill('ana@gmail.com');
  await page.waitForTimeout(3000);
  await page.locator('input[name*="a:ahliLembaga:0:namaAhliLembaga"]').click();
  await page.locator('input[name*="a:ahliLembaga:0:namaAhliLembaga"]').fill('alisa binti abu');
  await page.waitForTimeout(3000);
  await page.getByLabel('Maklumat Pemilik Asal').getByRole('grid').getByRole('group').filter({ hasText: '- Sila Pilih -Kad Pengenalan' }).locator('span').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Kad Pengenalan Baru' }).click();
  await page.waitForTimeout(3000);
  await page.locator('input[name*="noKpLembaga"]').click();
  await page.locator('input[name*="noKpLembaga"]').fill('890101080102');
  await page.waitForTimeout(3000);
  await page.locator('div').filter({ hasText: /^- Sila Pilih -PengarahSetiausaha- Sila Pilih -$/ }).locator('span').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Pengarah' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('row', { name: 'Baru Pindaan PPFUS kepada' }).locator('span').first().click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'No. Jadual Petak :' }).click();
  await page.getByRole('textbox', { name: 'No. Jadual Petak :' }).fill('pab123');
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'Nama Pemaju :' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'Nama Pemaju :' }).fill('pemajupemaju');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nama Skim :' }).click();
  await page.getByRole('textbox', { name: 'Nama Skim :' }).fill('skim123');
  await page.waitForTimeout(5000);
  await page.getByTitle('Sila pilih Jenis Pembangunan.').locator('span').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Kediaman' }).click();
  await page.waitForTimeout(3000);
  await page.locator('input[name*="jenisPetakTable:0:jenisKegunaan"]').click();
  await page.waitForTimeout(3000);
  await page.locator('input[name*="jenisPetakTable:0:jenisKegunaan"]').fill('kediaman');
  await page.waitForTimeout(3000);
  await page.getByTitle('Sila pilih Jenis Pembangunan.').locator('span').click();
  await page.waitForTimeout(3000);
  await page.getByRole('listbox').getByRole('option', { name: 'Kediaman' }).click();
  await page.waitForTimeout(3000);
  await page.locator('input[name*="jenisPetakTable:0:bilPetak_input"]').click();
  await page.waitForTimeout(3000);
  await page.locator('input[name*="jenisPetakTable:0:bilPetak_input"]').fill('10');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Bilangan Petak :' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Bilangan Agregat Unit Syer :' }).click();
  await page.getByRole('textbox', { name: 'Bilangan Agregat Unit Syer :' }).fill('10');
  await page.waitForTimeout(3000);
  await page.locator('input[name*="maklumatDepositTable:0:tarikhJumlahDepositUpahUkur_input"]').click();
  await page.waitForTimeout(3000);
  await page.locator('.ui-datepicker-calendar a.ui-state-default').first().click();
  await page.waitForTimeout(3000);
  await page.locator('input[name*="maklumatDepositTable:0:depositUpahUkur_input"]').click();
  await page.locator('input[name*="maklumatDepositTable:0:depositUpahUkur_input"]').fill('1000');
  await page.waitForTimeout(3000);
  await page.locator('input[name*="rujukanPelanBangunanTable:0:noRujukanPelan"]').click();
  await page.locator('input[name*="rujukanPelanBangunanTable:0:noRujukanPelan"]').fill('pab123');
  await page.waitForTimeout(3000);
  await page.locator('[id*="rujukanPelanBangunanTable:0:tarikhPelanBangunan_input"]').click();
  await page.locator('[id*="rujukanPelanBangunanTable:0:tarikhPelanBangunan_input"]').fill('123');
  await page.locator('.ui-datepicker-calendar a.ui-state-default').first().click();
  await page.getByRole('group', { name: 'Maklumat Juruukur Tanah' }).getByLabel('Nama Syarikat :').click();
  await page.getByRole('group', { name: 'Maklumat Juruukur Tanah' }).getByLabel('Nama Syarikat :').fill('test1234');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nama Juruukur :' }).click();
  await page.getByRole('textbox', { name: 'Nama Juruukur :' }).fill('alisa binti ali');
  await page.waitForTimeout(3000);
  await page.getByRole('group', { name: 'Maklumat Juruukur Tanah' }).getByLabel('No. Lesen :').click();
  await page.getByRole('group', { name: 'Maklumat Juruukur Tanah' }).getByLabel('No. Lesen :').fill('1234');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Alamat Surat Menyurat :' }).click();
  await page.getByRole('textbox', { name: 'Alamat Surat Menyurat :' }).fill('no 3');
  await page.waitForTimeout(3000);
  await page.locator('input[id*="inputAlamat-alamat2_alamatSuratJurukur"]').click();
  await page.locator('input[id*="inputAlamat-alamat2_alamatSuratJurukur"]').fill('jalan anggur');
  await page.waitForTimeout(3000);
  await page.locator('input[id*="inputAlamat-alamat3_alamatSuratJurukur"]').click();
  await page.locator('input[id*="inputAlamat-alamat3_alamatSuratJurukur"]').fill('taman fruit');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Poskod :' }).click();
  await page.getByRole('textbox', { name: 'Poskod :' }).fill('56000');
  await page.waitForTimeout(3000);
  await page.locator('[id*="inputAlamat-negeri_alamatSuratJurukur_label"]').click();
  await page.locator('li.ui-selectonemenu-item', { hasText: 'WILAYAH PERSEKUTUAN KUALA LUMPUR' }).last().click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nombor Telefon Bimbit :' }).click();
  await page.getByRole('textbox', { name: 'Nombor Telefon Bimbit :' }).fill('0123456789');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nombor Telefon Pejabat :' }).click();
  await page.getByRole('textbox', { name: 'Nombor Telefon Pejabat :' }).fill('034567890');
  await page.waitForTimeout(3000);
  await page.getByRole('group', { name: 'Maklumat Juruukur Tanah' }).getByLabel('Emel :').click();
  await page.getByRole('group', { name: 'Maklumat Juruukur Tanah' }).getByLabel('Emel :').fill('alisa@gmail.com');
  await page.waitForTimeout(3000);
  await page.getByRole('group', { name: 'Maklumat Arkitek Berdaftar' }).getByLabel('Nama Syarikat :').click();
  await page.getByRole('group', { name: 'Maklumat Arkitek Berdaftar' }).getByLabel('Nama Syarikat :').fill('test1234');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nama Arkitek/Jurutera :' }).click();
  await page.getByRole('textbox', { name: 'Nama Arkitek/Jurutera :' }).fill('lala binti ciki');
  await page.waitForTimeout(3000);
  await page.getByRole('group', { name: 'Maklumat Arkitek Berdaftar' }).getByLabel('No. Lesen :').click();
  await page.getByRole('group', { name: 'Maklumat Arkitek Berdaftar' }).getByLabel('No. Lesen :').fill('1234');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.getByTitle('Sila pilih Formula Unit Syer.').locator('div').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Formula Biasa' }).click();
  await page.waitForTimeout(3000);
  await page.getByTitle('Sila pilih Wajaran.').locator('span').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Biasa' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('row', { name: 'Petak Petak Tanah Petak Tanah' }).locator('span').first().click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('C:/Users/User/playwright-demo/tests/Sifus.xlsx');
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  const filePath = path.resolve("C:/Users/User/playwright-demo/tests/Testing.pdf");
  for (let i = 0; i <= 10; i++) {
  // Skip index 4
  if (i === 4) {
    console.log(`Skipping index ${i} — already uploaded`);
    continue;
  }

  await page.waitForTimeout(5000);

  const input = page.locator(
    `input[name="centerForm:mainTab:tabItem5:semakanTable:${i}:uploadDok_input"]`
  );

  await input.setInputFiles(filePath);
}
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Sahkan' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('row', { name: 'Dengan ini saya mengakui' }).locator('span').click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Hantar' }).click();
  // Update the hakmilik record to mark it as used after successful test completion
  //try {
  //  await updateHakmilikIdUsedStatus(doc_id);
  //  console.log(`Successfully updated hakmilik record ${doc_id} as used.`);
  //} catch (error) {
  //  console.error(`Failed to update hakmilik record ${doc_id} as used:`, error);
  //}
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Tutup' }).nth(3).click();
  await page.waitForTimeout(10000);
  await page.locator('.menu-2').click();
   const transaksiCell = page.locator('td[role="gridcell"]').filter({
    hasText: /SIFUS\d+/   // regex for your transaction IDs
  });
  // Take the first one
  const transaksiId = await transaksiCell.first().innerText();
  console.log("First Transaksi ID:", transaksiId);
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
  await page.locator('#username').fill('hafizan@ptgwp.gov.my');
  await page.locator('#password').click();
  await page.locator('#password').fill('etanah123#');
  await page.locator('#password').press('Enter');
  await page.waitForURL('**/SistemDashboardForm.xhtml', { timeout: 30000 });
  await page.waitForTimeout(2000);
  const idPermohonanColumn = page.getByRole('columnheader', { name: 'ID Permohonan / No. Serahan' });
  //await page.locator('input[name="mainForm:tabView:tasks:j_idt972:filter"]').click();
  //await page.getByRole('columnheader', { name: 'ID Permohonan / No. Serahan' }).click();
  const filterInput = idPermohonanColumn.locator('input[name^="mainForm:tabView:tasks:"][name*="filter"]');
  await filterInput.waitFor({ state: 'visible', timeout: 15000 });
  await filterInput.click();
  await page.waitForTimeout(1000);
  await filterInput.fill(transaksiId);
  await filterInput.press('Enter');
  await page.waitForTimeout(1000);
  // await page.getByRole('gridcell', { name: transaksiId }).click();
  await page.evaluate(() => {
    const td = document.querySelector('tr[data-ri="0"] td:first-child');
    if (td) {
      td.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  });
  await page.waitForTimeout(1000);
  await page.getByRole('row', { name: 'Ya Tidak' }).locator('span').first().click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Hantar' }).click();
  await page.waitForTimeout(1000);
 // Back To Awam
  await page.locator('#tnd-2').getByRole('link').click();
  await page.context().clearCookies();
  await page.addInitScript({ content: `window.validateCaptcha = () => true;` });
  await page.goto('https://awamwp.ptgwp.gov.my/portal/awam-landing-page');
  if (await closeButton.isVisible()) {
    await closeButton.click();
  }
  await page.getByRole('link', { name: 'LOG MASUK' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('leo.autism@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.waitForTimeout(3000);
  await page.locator('.menu-2').click();
  await page.waitForTimeout(3000);
  await page.locator('.menu-6').click();
  await page.waitForTimeout(3000);
  await page.locator('span').nth(4).waitFor();
  await page.locator('span').nth(4).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Tambah Ke Troli' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Proses Pembayaran' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id="hasilBayaranOnlineBaseForm:paymentOnline:bank-selected"] span').click();
  await page.locator('[id="hasilBayaranOnlineBaseForm:paymentOnline:bank-selected_25"]').click(); // Pilih SBI Bank A
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
  await page.waitForTimeout(10000);
  await page.locator('.menu-2').click();
  await page.waitForTimeout(3000);
  const transaksiCell1 = page.locator('td[role="gridcell"]').filter({
    hasText: /PTGKL\/\d+\/[A-Z]+\/\d{4}\/\d+/   
  });

  // Take the first one
  const transaksiIdText1 = await transaksiCell1.first().innerText();

  // Extract only the PTGKL pattern
  const match1 = transaksiIdText1.match(/PTGKL\/\d+\/[A-Z]+\/\d{4}\/\d+/ );

  let transaksiId1 = "";
  if (match1) {
    transaksiId1 = match1[0];
    console.log("Extracted Transaksi ID:", transaksiId1);
  } else {
    console.log("No PTGKL ID found");
  }
  await page.getByRole('link', { name: 'Log Keluar' }).click();
  await page.context().clearCookies();
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
  await page.locator('#username').fill('hafizan@ptgwp.gov.my');
  await page.locator('#password').click();
  await page.locator('#password').fill('etanah123#');
  await page.locator('#password').press('Enter');
  await page.waitForTimeout(3000);
  await page.locator('#menu-30 span').nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'Pergerakan Fail' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'ID Permohonan/No. Serahan :' }).click();
  await page.getByRole('textbox', { name: 'ID Permohonan/No. Serahan :' }).fill(transaksiId1);
  await page.waitForTimeout(3000);
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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('leo.autism@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.locator('.menu-2').click();
  await page.waitForTimeout(10000);
  /*
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
    has: page.getByRole('gridcell').filter({ hasText: transaksiId1 })
  });

  const statusCell = row.getByRole('gridcell').nth(statusIndex);

  await statusCell.waitFor({ state: "visible" });

  const statusText = await statusCell.innerText();

  if (statusText.trim() !== "Semakan Permohonan/ Kuiri") {
    throw new Error(`${transaksiId1} status is NOT 'Semakan Permohonan/ Kuiri' → Found: ${statusText}`);
  }
*/
// Take the first one
  await page.locator('.menu-2').click();
  await page.waitForTimeout(3000);
  const transaksiCell2 = page.locator('td[role="gridcell"]').filter({
    hasText: /PTGKL\/\d+\/[A-Z]+\/\d{4}\/\d+/   
  });

  // Take the first one
  const transaksiIdText2 = await transaksiCell1.first().innerText();

  // Extract only the PTGKL pattern
  const match2 = transaksiIdText1.match(/PTGKL\/\d+\/[A-Z]+\/\d{4}\/\d+/ );

  let transaksiId2 = "";
  if (match1) {
    transaksiId1 = match1[0];
    console.log("Extracted Transaksi ID:", transaksiId1);
  } else {
    console.log("No PTGKL ID found");
  }
  await page.waitForTimeout(10000);
});
