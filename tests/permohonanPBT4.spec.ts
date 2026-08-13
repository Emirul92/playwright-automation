import { test, expect } from '@playwright/test';
import path from "path";

test.use({
  ignoreHTTPSErrors: true
});

test('WPKL Permohonan Urusan PBT8A, PBT4, PBA dari Portal Awam sehingga Semakan Permohonan Online', async ({ page }) => {

  //-------Constant Declaration---------
  // Maklumat Hakmilik:
  const tarafTanah = 'Tanah Milik Persendirian';
  const bandarPekanMukim = 'Mukim Kuala Lumpur';
  const jnsHakmilik = 'GM - Geran Mukim';
  const noHakmilik = '79';

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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('jianhwangtjh@hotmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.locator('.menu-1').click();
  await page.getByRole('link', { name: 'Pengambilan' }).click();
  await page.getByRole('row', { name: '2 PBT4 - Pengambilan Tanah' }).getByLabel('Buat Permohonan').click();
  await page.getByTitle('Sila Pilih Taraf Tanah.').locator('span').click();
  await page.locator('[id="centerForm:tarafTanah_1"]').click();
  // await page.locator('.ui-selectonemenu-panel:visible').getByRole('option', { name: tarafTanah }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:bandarPekanMukim"] span').click();
  await page.locator('[id="centerForm:bandarPekanMukim_5"]').click();
  // await page.locator('.ui-selectonemenu-panel:visible').getByRole('option', { name: bandarPekanMukim }).click();
  await page.waitForTimeout(3000);
  await page.getByTitle('Sila pilih jenis hakmilik.').locator('span').click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:jenisHakmilik_1"]').click();
  // await page.locator('.ui-selectonemenu-panel:visible').getByRole('option', { name: jnsHakmilik }).click();
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).click();
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).fill('79');
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Teruskan Permohonan' }).click();
  await page.locator('button[name*="maklumatPraPemohonTbl:isiMaklumatBtn"]').click();
  await page.getByTitle('Sila pilih Jenis Pemohon.').locator('span').click();
  await page.locator('[id*="kategoriPemohon_items"]').getByRole('option', { name: 'Badan Berkanun Persekutuan' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nama Pegawai yang' }).click();
  await page.getByRole('textbox', { name: 'Nama Pegawai yang' }).fill('ali bin abu');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Jawatan Pegawai :' }).click();
  await page.getByRole('textbox', { name: 'Jawatan Pegawai :' }).fill('pegawai');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'No. Telefon Pegawai :' }).click();
  await page.getByRole('textbox', { name: 'No. Telefon Pegawai :' }).fill('0138765432');
  await page.waitForTimeout(3000);
  await page.getByTitle('Sila pilih Nama Jabatan/Badan').locator('span').click();
  await page.getByRole('listbox').getByRole('option', { name: 'KEMENTERIAN KERJA RAYA' }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id*="iaram_checkbox_panel"] span').click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'No. Telefon Pejabat :' }).click();
  await page.getByRole('textbox', { name: 'No. Telefon Pejabat :' }).fill('034567654');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Emel :' }).click();
  await page.getByRole('textbox', { name: 'Emel :' }).fill('ali@gmail.com');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.locator('button[name*="maklumatPengurusProjekTbl:isiMaklumatPPBtn"]').click();
  await page.getByRole('textbox', { name: 'Nama :' }).click();
  await page.getByRole('textbox', { name: 'Nama :' }).fill('AHMAD BIN ALi');
  await page.getByRole('textbox', { name: 'Jawatan :' }).click();
  await page.getByRole('textbox', { name: 'Jawatan :' }).fill('PEGAWAi');
  await page.getByRole('textbox', { name: 'Bahagian/Unit :' }).click();
  await page.getByRole('textbox', { name: 'Bahagian/Unit :' }).fill('JKR');
  await page.getByRole('textbox', { name: 'Jabatan/Agensi :' }).click();
  await page.getByRole('textbox', { name: 'Jabatan/Agensi :' }).fill('JKR');
  await page.getByRole('textbox', { name: 'Alamat Berdaftar :' }).click();
  await page.getByRole('textbox', { name: 'Alamat Berdaftar :' }).fill('NO 2');
  await page.locator('input[name*="pengurusProjek_ab2"]').click();
  await page.locator('input[name*="pengurusProjek_ab2"]').fill('JALAN DURIAN');
  await page.locator('input[name*="pengurusProjek_ab3"]').click();
  await page.locator('input[name*="pengurusProjek_ab3"]').fill('TAMAN BAHAGIA');
  await page.locator('input[name*="pengurusProjek_abp"]').click();
  await page.locator('input[name*="pengurusProjek_abp"]').fill('43000');
  await page.getByLabel('Maklumat Pengurus Projek').locator('[id*="pengurusProjek_abn_panel"]').getByTitle('Sila masukkan alamat').locator('span').click();
  await page.locator('[id*="pengurusProjek_abn_items"]').getByRole('option', { name: 'WILAYAH PERSEKUTUAN KUALA' }).click();
  await page.locator('[id*="pengurusProjek_checkbox"] span').click();
  await page.getByRole('textbox', { name: 'Emel :' }).click();
  await page.getByRole('textbox', { name: 'Emel :' }).fill('ahmad@gmail.com');
  await page.getByRole('textbox', { name: 'No. Telefon Pejabat :' }).click();
  await page.getByRole('textbox', { name: 'No. Telefon Pejabat :' }).fill('034567432');
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).click();
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).fill('0123897654');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.getByRole('row', { name: 'Ya Tidak' }).locator('span').first().click();
  await page.getByRole('textbox', { name: 'Nama Projek :' }).click();
  await page.getByRole('textbox', { name: 'Nama Projek :' }).fill('TEST');
  await page.getByRole('row', { name: 'Jajaran Tapak' }).locator('span').nth(1).click();
  await page.getByRole('textbox', { name: 'No. Rujukan Surat KJP :' }).click();
  await page.getByRole('textbox', { name: 'No. Rujukan Surat KJP :' }).fill('p12');
  await page.getByRole('textbox', { name: 'Tarikh Surat KJP :' }).click();
  await page.getByRole('link', { name: '3', exact: true }).click();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.mouse.wheel(0, -800);
    const filePath = path.resolve("C:/Users/Emirul/Desktop/playwright-automation/Document/Testing.pdf");
    const imgPath = path.resolve("C:/Users/Emirul/Desktop/playwright-automation/Document/14004488A206(S)5031(B)M1(M)0(T)2(P)1.tif");
    const tabPath = path.resolve("C:/Users/Emirul/Desktop/playwright-automation/Document/Pelan Pengambilan Tanah Digital.tab");
  // Loop through the 5 file inputs
for (let i = 0; i <= 4; i++) {
  // Just to give a bit of buffer time between uploads (optional)
  await page.waitForTimeout(5000);

  // Build the correct input selector for each row
  const input = page.locator(
    `input[name="centerForm:mainTab:tabItem4:semakanTable:${i}:uploadDok_input"]`
  );

  if (i === 1) {
    await input.setInputFiles(imgPath);
  } else if (i === 2) {
    await input.setInputFiles(tabPath);
  } else {
    await input.setInputFiles(filePath);
  }
}
  await page.getByRole('row', { name: 'Dengan ini saya mengakui' }).locator('span').click();
  await page.getByRole('button', { name: 'Hantar' }).click();
  await page.waitForTimeout(5000);
  await page.locator('.menu-2').click();
  const transaksiCell = page.locator('td[role="gridcell"]').filter({
    hasText: /PBT\d+/   // regex for your transaction IDs
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

  /*const url = await page.locator('a.cetak').getAttribute('href');
  console.log(url);
  await page.goto(url!);8>*/

  await page.locator('#username').click();
  await page.locator('#username').fill('ahmadazron@jkptg.gov.my');
  await page.locator('#password').click();
  await page.locator('#password').fill('Etanah123#');
  await page.locator('form').click()
  await page.getByRole('button', { name: 'Submit' }).dblclick();
  await page.locator('#menu-120 span').nth(1).click();
  await page.getByRole('link', { name: 'Semakan Permohonan Online' }).click();
  await page.getByRole('textbox', { name: 'ID Rujukan :' }).click();
  await page.getByRole('textbox', { name: 'ID Rujukan :' }).fill(transaksiId);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(5000);
  await page.locator('[id*="centerForm:tabView:"][id$=":jenisPenyerah_label"]').click();
  await page.waitForTimeout(3000);
  await page.locator('[id*="centerForm:tabView:"][id$=":jenisPenyerah_items"]').getByRole('option', { name: 'Badan Berkanun Persekutuan' }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id*="centerForm:tabView:"][id$=":jenisPengenalan_label"]').click();
  // await page.locator('[id="centerForm:tabView:j_idt537:jenisPengenalan_1"]').click();
  await page.locator('[id*="centerForm:tabView:"][id$=":jenisPengenalan_1"]').click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nombor Pengenalan :' }).click();
  await page.getByRole('textbox', { name: 'Nombor Pengenalan :' }).fill('890101080101');
  await page.getByRole('textbox', { name: 'Nama Wakil :' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'Nama Wakil :' }).fill('ahmad bin abu');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nama Kementerian/Jabatan :' }).click();
  await page.getByRole('textbox', { name: 'Nama Kementerian/Jabatan :' }).fill('JKR');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Alamat Berdaftar :' }).click();
  await page.getByRole('textbox', { name: 'Alamat Berdaftar :' }).fill('NO 2');
  await page.waitForTimeout(3000);
  await page.locator('input[name*="centerForm:tabView:"][name$=":iaram_ab2"]').click();
  await page.locator('input[name*="centerForm:tabView:"][name$=":iaram_ab2"]').fill('JALAN ANGGUR');
  await page.waitForTimeout(3000);
  await page.locator('input[name*="centerForm:tabView:"][name$=":iaram_ab3"]').click();
  await page.locator('input[name*="centerForm:tabView:"][name$=":iaram_ab3"]').fill('TAMAN BUAHAN');
  await page.waitForTimeout(3000);
  await page.locator('input[id*="centerForm:tabView:"][id$=":iaram_abp"]').click();
  await page.locator('input[id*="centerForm:tabView:"][id$=":iaram_abp"]').fill('56000');
  await page.waitForTimeout(3000);
  await page.locator('[id*="centerForm:tabView:"][id$=":iaram_abn_label"]').click();
  await page.locator('[id*="centerForm:tabView:"][id$=":iaram_abn_items"]').getByRole('option', { name: 'WILAYAH PERSEKUTUAN KUALA' }).click();
  await page.waitForTimeout(3000);
  // await page.locator('[id*="iaram_checkbox"] span').click();
  await page.locator('.ui-chkbox-icon').first().click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.getByRole('row', { name: 'Ya Tidak' }).locator('span').first().click();
  await page.getByRole('textbox', { name: 'Ulasan? :' }).click();
  await page.getByRole('textbox', { name: 'Ulasan? :' }).fill('TEST');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Hantar' }).click();
  await page.waitForTimeout(10000);
  await page.getByRole('button', { name: 'Cetak' }).click();
  await page.waitForTimeout(3000);
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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('jianhwangtjh@hotmail.com');
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

const firstRow = page.locator('table tbody tr').first();

const cellText = await firstRow.locator('td').nth(1).innerText();

console.log('Full text:', cellText);

const match = cellText.match(/\(([^)]+)\)/);

if (match) {
    const idPermohonan = match[1];

    console.log('ID Permohonan:', idPermohonan);
} else {
    throw new Error('ID Permohonan tidak dijumpai');
}
});