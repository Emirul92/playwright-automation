import { test, expect } from '@playwright/test';

test.use({
  ignoreHTTPSErrors: true
});

test('WPKL Urusan Berangkai PMT&GD dan Awam - eSemakan', async ({ page }) => {

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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('harrizal.rizhan@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.locator('.menu-1').click();
  await page.getByRole('link', { name: 'Pendaftaran' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('row', { name: '7 PMT - Pindahmilik Tanah' }).getByLabel('Buat Permohonan').click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:bandarPekanMukim"] span').click();
  await page.locator('[id="centerForm:bandarPekanMukim_5"]').click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:jenisHakmilik"] span').click();
  await page.locator('[id="centerForm:jenisHakmilik_2"]').click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).click();
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).fill('162');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Teruskan Permohonan' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Kategori Pemilik : - Sila' }).locator('span').nth(3).click();
  await page.locator('[id="centerForm:mainTab:tabItem1:kategoriPemohon_items"]').getByRole('option', { name: 'Individu' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Jenis / Nombor Pengenalan : - Sila Pilih -Kad Pengenalan BaruNo. PasportNo.' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Kad Pengenalan Baru' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'Jenis / Nombor Pengenalan :' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'Jenis / Nombor Pengenalan :' }).fill('890101080101');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nama Individu :' }).click();
  await page.getByRole('textbox', { name: 'Nama Individu :' }).fill('ALI BIN ABU');
  await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Status Bankrap : YaTidak' }).locator('span').nth(4).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Alamat :' }).click();
  await page.getByRole('textbox', { name: 'Alamat :' }).fill('NO 2');
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatBerdaftar2"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatBerdaftar2"]').fill('JALAN DURIAN');
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatBerdaftar2"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatBerdaftar3"]').fill('TAMAN KOTA JAYA');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Poskod :' }).click();
  await page.getByRole('textbox', { name: 'Poskod :' }).fill('45000');
  await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Negeri : - Sila Pilih -' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'WILAYAH PERSEKUTUAN KUALA' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Pemohon Adalah : - Sila Pilih' }).locator('span').nth(3).click();
  await page.locator('[id="centerForm:mainTab:tabItem1:jenisPemohon_items"]').getByRole('option', { name: 'Pemilik' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Bahagian Syer yang hendak' }).click();
  await page.getByRole('textbox', { name: 'Bahagian Syer yang hendak' }).fill('1');
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:mainTab:tabItem1:syerPenyebut_input"]').click();
  await page.locator('[id="centerForm:mainTab:tabItem1:syerPenyebut_input"]').fill('1');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Simpan dan Tutup' }).click();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.getByRole('group').filter({ hasText: 'Kategori Penerima : - Sila' }).locator('span').nth(3).click();
  await page.locator('[id="centerForm:mainTab:tabItem2:kategoriPemohon_items"]').getByRole('option', { name: 'Individu' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Jenis / Nombor Pengenalan : - Sila Pilih -Kad Pengenalan BaruNo. PasportNo.' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Kad Pengenalan Baru' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Jenis / Nombor Pengenalan :' }).click();
  await page.getByRole('textbox', { name: 'Jenis / Nombor Pengenalan :' }).fill('890101080102');
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'Nama Individu :' }).click();
  await page.getByRole('textbox', { name: 'Nama Individu :' }).fill('AISHAH BINTI ABU');
  await page.waitForTimeout(3000);
  await page.locator('div').filter({ hasText: /^- Sila Pilih -Lain-lainCinaIndiaMelayu- Sila Pilih -$/ }).locator('span').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Melayu' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Status Bankrap : YaTidak' }).locator('span').nth(4).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Alamat :' }).click();
  await page.getByRole('textbox', { name: 'Alamat :' }).fill('NO 3');
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:mainTab:tabItem2:alamatBerdaftar2"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem2:alamatBerdaftar2"]').fill('JALAN ORKED');
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:mainTab:tabItem2:alamatBerdaftar3"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem2:alamatBerdaftar3"]').fill('TAMAN PERDANA');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Poskod :' }).click();
  await page.getByRole('textbox', { name: 'Poskod :' }).fill('56000');
  await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Negara : - Sila Pilih -' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Malaysia' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Negeri : - Sila Pilih -' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'WILAYAH PERSEKUTUAN KUALA' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Penerima Adalah : - Sila' }).locator('span').nth(3).click();
  await page.locator('[id="centerForm:mainTab:tabItem2:jenisPenerima_items"]').getByRole('option', { name: 'Pemilik' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Bahagian Syer yang bakal' }).click();
  await page.getByRole('textbox', { name: 'Bahagian Syer yang bakal' }).fill('1');
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:mainTab:tabItem2:syerPenyebut_input"]').click();
  await page.locator('[id="centerForm:mainTab:tabItem2:syerPenyebut_input"]').fill('1');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Simpan dan Tutup' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('row', { name: 'Dengan ini saya mengakui' }).locator('span').click();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.getByRole('button', { name: 'Tambah Urusan' }).click();
  await page.getByText('GD - Gadaian Menjamin Wang').click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.getByRole('button', { name: 'Salin Maklumat Dari Urusan' }).click();
  await page.locator('button[name="centerForm:mainTab:tabItem1:salinMaklumatPemohonTbl:1:pilihBtn"]').click();
  await page.getByRole('button', { name: 'Simpan dan Tutup' }).click();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.getByRole('group').filter({ hasText: 'Kategori Penerima : - Sila' }).locator('span').nth(3).click();
  await page.locator('[id="centerForm:mainTab:tabItem2:kategoriPemohon_items"]').getByRole('option', { name: 'Syarikat/Badan-badan' }).click();
   await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Jenis / Nombor Pengenalan' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'No. Syarikat' }).click();
  await page.getByRole('textbox', { name: 'Jenis / Nombor Pengenalan :' }).click();
  await page.getByRole('textbox', { name: 'Jenis / Nombor Pengenalan :' }).fill('132');
   await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nama Syarikat/Badan-badan' }).click();
  await page.getByRole('textbox', { name: 'Nama Syarikat/Badan-badan' }).fill('MAYBANK');
   await page.waitForTimeout(3000);
  await page.getByRole('row', { name: 'Ya Tidak' }).locator('span').nth(1).click();
   await page.waitForTimeout(3000);
  await page.getByTitle('Sila pilih Undang Tubuh.').locator('span').click();
  await page.locator('[id="centerForm:mainTab:tabItem2:undangTubuh_items"]').getByRole('option', { name: 'Akta Syarikat 2016' }).click();
   await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Alamat :' }).click();
  await page.getByRole('textbox', { name: 'Alamat :' }).fill('NO 5');
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:mainTab:tabItem2:alamatBerdaftar2"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem2:alamatBerdaftar2"]').fill('JALAN ORKED');
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:mainTab:tabItem2:alamatBerdaftar3"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem2:alamatBerdaftar3"]').fill('TAMAN HIASAN');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Poskod :' }).click();
  await page.getByRole('textbox', { name: 'Poskod :' }).fill('56000');
  await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Negeri : - Sila Pilih -' }).locator('span').nth(3).click();
  await page.getByRole('listbox').getByRole('option', { name: 'WILAYAH PERSEKUTUAN KUALA' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Simpan dan Tutup' }).click();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.getByRole('row', { name: '(a) pembayaran balik pinjaman' }).locator('span').first().click();
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:mainTab:tabItem4:jumlah1_input"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem4:jumlah1_input"]').fill('1000');
  await page.waitForTimeout(3000);
  await page.getByRole('cell', { name: 'pembayaran balik pinjaman' }).locator('span').nth(1).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Berserta faedah', exact: true }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.getByRole('row', { name: 'Dengan ini saya mengakui' }).locator('span').click();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.getByRole('button', { name: 'Hantar' }).click();
  await page.waitForTimeout(5000);
  await page.locator('.menu-2').click();
  const transaksiCell = page.locator('td[role="gridcell"]').filter({
   hasText: /Urusan Berangkai\s*-\s*\d+/   
  });
  const transaksiIdText = await transaksiCell.first().innerText();
  const match = transaksiIdText.match(/\d+/);

  let transaksiId = "";
  if (match) {
    transaksiId = match[0];
    console.log("Extracted Number (Transaksi Id):", transaksiId);
  } else {
    console.log("No number found");
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
  await page.locator('#username').fill('norhidayat@ptgwp.gov.my');
  await page.locator('#password').click();
  await page.locator('#password').fill('etanah123#');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(5000);
  await page.locator('#menu-2 span').nth(1).click();
  await page.getByRole('link', { name: 'Perserahan Kaunter' }).click();
  await page.getByRole('link', { name: 'ID Transaksi Atas Talian /' }).click();
  await page.getByRole('textbox', { name: 'ID Rujukan :' }).click();
  await page.getByRole('textbox', { name: 'ID Rujukan :' }).fill(transaksiId);
  await page.locator('[id="centerForm:perserahanKaunterTab:cmdBtnNext"]').click();
  await page.waitForTimeout(10000);
  await page.locator('[id="centerForm:tabView:jenisPenyerahMenu"] span').waitFor({ state: "visible" });
  await page.locator('[id="centerForm:tabView:jenisPenyerahMenu"] span').click();
  await page.locator('[id="centerForm:tabView:jenisPenyerahMenu_1"]').click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nombor Pengenalan :' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nombor Pengenalan :' }).fill('111111111111'); 
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nombor Pengenalan :' }).press('Enter');
  await page.waitForTimeout(3000);
  //await page.getByRole('button', { name: 'Tutup' }).click();
  //await page.locator('[id="centerForm:tabView:byPassVal_input"]').getByRole('group').filter({ hasText: 'Pengesahan Manual :' }).locator("span").nth(3).click();
  const checkbox = page.locator('div[id="centerForm:tabView:byPassVal"] .ui-chkbox-box');
  await checkbox.waitFor({ state: 'visible' });
  await checkbox.click();

  // wait for PrimeFaces ajax
  await page.waitForFunction(() =>
    // @ts-ignore
    window.PrimeFaces && PrimeFaces.ajax.Queue.isEmpty()
  );

  await page.waitForTimeout(3000);
  await page.locator('textarea[name^="centerForm:tabView:"]').click();
  //await page.locator('[id="centerForm:tabView:outputPanelUlasan"]').getByRole('group').filter({ hasText: 'Ulasan :' }).click();
  await page.locator('textarea[name^="centerForm:tabView:"]').fill('test');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Nombor Telefon Bimbit :' }).click();
  await page.getByRole('textbox', { name: 'Nombor Telefon Bimbit :' }).fill('0192354083');
  const nextBtn = page.locator('#centerForm\\:tabView button:has-text("Seterusnya"):visible');
  await expect(nextBtn).toBeVisible();
  await nextBtn.click();
  await page.locator('input[name="centerForm:tabView:semakanTable:1:bilPerlu"]').click();
  await page.locator('input[name="centerForm:tabView:semakanTable:1:bilPerlu"]').fill('1');
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:tabView:btn_spoc_next_senarai_semakan_tab"]').click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Tarikh Penyempurnaan :' }).click();
  await page.locator('.ui-datepicker-calendar a.ui-state-default').first().click();
  await page.waitForTimeout(3000);
  const nextBtn1 = page.locator('#centerForm\\:tabView button:has-text("Seterusnya"):visible');
  await expect(nextBtn1).toBeVisible();
  await nextBtn1.click();
  await page.locator('input[name="centerForm:tabView:semakanTable:1:bilPerlu"]').click();
  await page.waitForTimeout(2000);
  await page.locator('input[name="centerForm:tabView:semakanTable:1:bilPerlu"]').fill('1');
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:tabView:semakanTable:2:bilPerlu"]').click();
  await page.waitForTimeout(2000);
  await page.locator('input[name="centerForm:tabView:semakanTable:2:bilPerlu"]').fill('1');
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:tabView:btn_spoc_next_senarai_semakan_tab"]').click();
  await page.waitForTimeout(3000);
  const nextBtn2 = page.locator('#centerForm\\:tabView button:has-text("Seterusnya"):visible');
  await expect(nextBtn2).toBeVisible();
  await nextBtn2.click();
  await page.waitForTimeout(3000);
  await page.locator('div').filter({ hasText: /^- Sila Pilih -TunaiBank DerafEFTKiriman WangWang PosKad- Sila Pilih -$/ }).locator('span').click();
  await page.locator('[id="centerForm:tabView:kodCaraBayar_items"]').getByRole('option', { name: 'Tunai' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Amaun (RM) :' }).click();
  await page.getByRole('textbox', { name: 'Amaun (RM) :' }).fill('200');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Tambah', exact: true }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Hantar' }).click();
  await page.waitForTimeout(8000);
  const idPermohonanCell = page.locator('td[role="gridcell"]').filter({
    hasText: /PDSC\d+\/\d+/  
  });
  const cellText = await idPermohonanCell.first().innerText();
  const match1 = cellText.match(/PDSC\d+\/\d+/);

  let permohonanId = "";
  if (match1) {
    permohonanId = match1[0];
    console.log("Extracted Permohonan ID:", permohonanId);
  } else {
    console.log("No PDSC ID found in cell text:", cellText);
  }
  // await page.getByRole('button', { name: 'Resit' }).click();
  await page.waitForTimeout(3000);
  const nextBtn3 = page.locator('#centerForm\\:tabView button:has-text("Keluar"):visible');
  await expect(nextBtn3).toBeVisible();
  await nextBtn3.click();
  await page.locator('#menu-30 span').nth(1).click();
  await page.getByRole('link', { name: 'Pergerakan Fail' }).click();
  await page.waitForTimeout(30000);
  await page.getByRole('textbox', { name: 'ID Permohonan/No. Serahan :' }).click();
  await page.getByRole('textbox', { name: 'ID Permohonan/No. Serahan :' }).fill(permohonanId);
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Cari' }).click();
  await page.waitForTimeout(10000);
  // Esemakan
  await page.locator('#tnd-2').click();
  await page.context().clearCookies();
  await page.goto('https://awamwp.ptgwp.gov.my/portal/awam-landing-page');
  await page.getByRole('link', { name: 'eSemakan' }).click();
  await page.waitForTimeout(3000);
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'icon Pejabat Pengarah Tanah dan Galian WP Kuala Lumpur' }).click();
  await page.waitForTimeout(3000);
  const page1 = await page1Promise;
  await page1.getByRole('row', { name: 'ID Permohonan/ No. Serahan No' }).locator('span').first().click();
  await page.waitForTimeout(3000);
  await page1.getByRole('textbox', { name: 'ID Permohonan / No. Serahan :' }).click();
  await page.waitForTimeout(3000);
  await page1.getByRole('textbox', { name: 'ID Permohonan / No. Serahan :' }).fill(permohonanId);
  await page1.getByRole('button', { name: 'Cari' }).click();
  await page.waitForTimeout(10000);
});