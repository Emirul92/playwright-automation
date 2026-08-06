import { test, expect } from '@playwright/test';
import path from "path";
// import { getIc } from "../../../../utils/wpkl/awam/getIc";

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

test('WPKL Permohonan Urusan 70KTN dari Portal Awam sehingga Semakan Maklumat Permohonan Online', async ({ page }) => {

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
  //log masuk
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('hafizjumal@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();

  // wpkl
  await page.locator('.bottom-wrapper-content-1 > div:nth-child(2) > a').click();
  await page.waitForTimeout(1000);
  
  // Menu selection
  await page.locator('.menu-1').click();
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Penguatkuasaan' }).click();
  await page.getByRole('row', { name: '1 70KTN - Permohonan' }).getByLabel('Buat Permohonan').click();
  await page.waitForTimeout(2000);

  await page.getByRole('textbox', { name: 'Nama Pemohon :' }).click();
  await page.getByRole('textbox', { name: 'Nama Pemohon :' }).pressSequentially('TESTing',{delay: 50});
  await page.waitForTimeout(3000);
  await page.getByRole('group').filter({ hasText: 'Jenis No Pengenalan : - Sila' }).locator('label').nth(1).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Kad Pengenalan Baru' }).click();
  await page.waitForTimeout(2000);
  await page.getByText('Nombor Pengenalan').first().click();
  await page.getByText('Nombor Pengenalan').first().pressSequentially('111111111111',{delay: 100});
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Tempat Lahir :' }).fill('Kl');
  await page.waitForTimeout(2000);
  await page.getByRole('group').filter({ hasText: 'Bangsa : - Sila Pilih -' }).locator('label').nth(1).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Melayu' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Alamat Berdaftar :' }).click();
  await page.getByRole('textbox', { name: 'Alamat Berdaftar :' }).fill('JALAN');
  await page.waitForTimeout(2000);
  await page.locator('input[name="centerForm:mainTab:tabItem0:alamatSurat2"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem0:alamatSurat2"]').fill('LORONG 12');
  await page.waitForTimeout(2000);
  await page.locator('input[name="centerForm:mainTab:tabItem0:alamatSurat3"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem0:alamatSurat3"]').fill('JALAN TANDANG');
  await page.waitForTimeout(2000);
  await page.locator('input[name="centerForm:mainTab:tabItem0:alamatSurat4"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem0:alamatSurat4"]').fill('TAMAN');
  await page.waitForTimeout(2000);
  await page.getByText('Poskod').first().click();
  await page.locator('input[name="centerForm:mainTab:tabItem0:poskodSurat"]').fill('56000');
  await page.waitForTimeout(2000);
  await page.locator('[id="centerForm:mainTab:tabItem0:negeriSurat_label"]').click();
  await page.locator('[id="centerForm:mainTab:tabItem0:negeriSurat_items"]').getByRole('option', { name: 'WILAYAH PERSEKUTUAN KUALA' }).click();
  await page.waitForTimeout(2000);
  await page.locator('.ui-chkbox-icon').first().click();
  await page.getByText('No. Telefon Bimbit').first().click();
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).fill('0123456789');
  await page.waitForTimeout(2000);
  await page.getByText('No. Telefon Rumah').click();
  await page.getByRole('textbox', { name: 'No. Telefon Rumah :' }).fill('0323456789');
  await page.waitForTimeout(2000);
  await page.getByText('Emel').click();
  await page.getByRole('textbox', { name: 'Emel :' }).fill('test@gmail.com');
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(2000);
  await page.getByText('Tujuan Permohonan').click();
  await page.getByRole('textbox', { name: 'Tujuan Permohonan :' }).fill('TESTING');
  await page.waitForTimeout(2000);
  await page.locator('[id="centerForm:mainTab:tabItem1:jenis-bahan-batuan_label"]').click();
  await page.locator('[id="centerForm:mainTab:tabItem1:jenis-bahan-batuan_1"]').click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Kuantiti yang Diambil :', exact: true  }).dblclick();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Kuantiti yang Diambil :', exact: true })
   .fill('1000.0000');
  await page.locator('body').click();
  await page.waitForTimeout(2000);
  await page.getByText('Kuantiti yang Diperakui Oleh').click();
  await page.waitForTimeout(2000);
  await page.getByText('Kuantiti yang Diperakui Oleh').fill('1000');
  await page.waitForTimeout(2000);
  await page.getByText('Tarikh bermula').click();
  await page.getByRole('link', { name: '3', exact: true }).click();
  await page.waitForTimeout(2000);
  await page.getByText('Tempoh', { exact: true }).click();
  await page.getByText('Tempoh', { exact: true }).fill('6');
  await page.waitForTimeout(2000);
  await page.locator('body').click();
  await page.getByRole('row', { name: 'Ya Tidak' }).locator('span').first().click();
  await page.waitForTimeout(2000);
  await page.locator('button[name="centerForm:mainTab:tabItem1:laluanTablePD:addLaluanBtn"]').click();
  await page.waitForTimeout(2000);
  await page.locator('input[name="centerForm:mainTab:tabItem1:laluanTablePD:0:namaJalanPD"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem1:laluanTablePD:0:namaJalanPD"]').fill('JALAN TANDANG');
  await page.waitForTimeout(2000);
  await page.locator('button[name="centerForm:mainTab:tabItem1:kenderaanTablePD:addKenderaanBtn"]').click();
  await page.waitForTimeout(2000);
  await page.locator('input[name="centerForm:mainTab:tabItem1:kenderaanTablePD:0:noLori"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem1:kenderaanTablePD:0:noLori"]').fill('BRH7175');
  await page.waitForTimeout(2000);
  await page.locator('input[name="centerForm:mainTab:tabItem1:kenderaanTablePD:0:beratLori_input"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem1:kenderaanTablePD:0:beratLori_input"]').fill('45');
  await page.waitForTimeout(2000);
  await page.locator('button[name="centerForm:mainTab:tabItem1:maklumatDiambilTbl:isiPmhnBtn"]').click();
  await page.waitForTimeout(2000);
  await page.getByLabel('Butir-butir Bahan Batuan').locator('label').filter({ hasText: '- Sila Pilih -' }).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Tanah Kerajaan' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Tempat :' }).click();
  await page.getByRole('textbox', { name: 'Tempat :' }).fill('Kl');
  await page.getByLabel('Butir-butir Bahan Batuan').getByText('Bandar/Pekan/Mukim').click();
  await page.getByLabel('Butir-butir Bahan Batuan').locator('label').filter({ hasText: '- Sila Pilih -' }).first().click();
  await page.getByRole('listbox').getByRole('option', { name: 'Mukim Kuala Lumpur' }).click();
  
  // issue to input data for Luas Tanah - need to manually input on this part
  await page.getByRole('textbox', { name: 'Luas Tanah :' }).dblclick();
  await page.getByRole('textbox', { name: 'Luas Tanah :' }).fill('2222');
  await page.waitForTimeout(1000);
  await page.locator('input[name="centerForm:mainTab:tabItem1:j_idt2482:sempadan:0:sempadan"]').click();
  await page.getByRole('textbox', { name: 'Luas Tanah :' }).dblclick();
  await page.getByRole('textbox', { name: 'Luas Tanah :' }).fill('2222')
  await page.getByRole('textbox', { name: 'Luas Tanah :' }).press('Enter');


  await page.getByLabel('Butir-butir Bahan Batuan').getByText('Butir-butir Bahan Batuan').click();
  await page.waitForTimeout(2000);
  await page.locator('label').filter({ hasText: '- Sila Pilih -' }).nth(5).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Meter Persegi' }).click();
  await page.waitForTimeout(2000);

  for (let i = 0; i < 4; i++) {
    const input = page.locator(`input[name*="centerForm:mainTab:tabItem1:"][name$=":sempadan:${i}:sempadan"]`);
    await input.click();
    await input.fill(` ${i + 1}`);
    await page.waitForTimeout(1000);
  }

  await page.getByRole('button', { name: 'Simpan dan Tutup' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Isi Maklumat' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('cell', { name: 'Wilayah Persekutuan Kuala' }).first().click();
  await page.waitForTimeout(2000);

  await page.getByLabel('Butir-butir Bahan Batuan').locator('label').filter({ hasText: '- Sila Pilih -' }).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Tanah Kerajaan' }).click();
  await page.waitForTimeout(5000);
  await page.locator('label').filter({ hasText: '- Sila Pilih -' }).nth(4).click();
  await page.getByRole('listbox').getByRole('option', { name: '- Mukim Kuala Lumpur' }).click();
  await page.waitForTimeout(3000);

  await page.getByRole('textbox', { name: 'Luas Tanah :' }).dblclick();
  await page.getByRole('textbox', { name: 'Luas Tanah :' }).fill('2222');
  await page.getByRole('textbox', { name: 'Luas Tanah :' }).press('Enter');
  await page.waitForTimeout(1000);

  await page.getByLabel('Butir-butir Bahan Batuan').getByText('Butir-butir Bahan Batuan').click();
  await page.waitForTimeout(2000);
  await page.locator('label').filter({ hasText: '- Sila Pilih -' }).nth(5).click();
  await page.getByRole('listbox').getByRole('option', { name: 'Meter Persegi' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Simpan dan Tutup' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(2000);
  await page.mouse.wheel(0, -800);
  const filePath = path.resolve("C:/Users/Nur Ainisa/Downloads/playwright/playwright-demo/TEST1.pdf");
  const imgPath = path.resolve("C:/Users/Nur Ainisa/Downloads/playwright/playwright-demo/baseline.jpg");

   for (let i = 0; i <= 5; i++) {
    await page.waitForTimeout(2000);
    if(i == 2){
        const input = page.locator(
        `input[name="centerForm:mainTab:tabItem3:semakanTable:${i}:uploadDok_input"]`
      );
      await input.setInputFiles(imgPath);
    }
    else{
      const input = page.locator(
        `input[name="centerForm:mainTab:tabItem3:semakanTable:${i}:uploadDok_input"]`
      );
      await input.setInputFiles(filePath);
    }
   }
  await page.getByRole('row', { name: 'Dengan ini saya mengakui' }).locator('span').click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Hantar' }).click();
  await page.waitForTimeout(5000);

  await page.locator('.menu-2').click();
  await page.waitForTimeout(2000);

  const transaksiCell = page.locator('td[role="gridcell"]').filter({
    hasText: /KTN\d+/   // regex for your transaction IDs
  });

  // Take the first one
  const transaksiId = await transaksiCell.first().innerText();

  console.log("First Transaksi ID:", transaksiId);

  await page.getByRole('link', { name: 'Log Keluar' }).click();
  page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept(); // or dialog.dismiss() if you want Cancel
  });

  await page.goto('https://testing.ptgwp.gov.my/etanah-cas/login?service=https%3A%2F%2Ftesting.ptgwp.gov.my%2Fetanah-uam%2Flogin%2Fcas');
  await page.evaluate(() => {
    // @ts-ignore
    window.handleLoginSubmit = () => true;
  });
  
  await page.locator('#username').click();
  await page.locator('#username').fill('aishah@ptgwp.gov.my');
  await page.locator('#password').click();
  await page.locator('#password').fill('etanah123#');
  await page.locator('form').click()
  await page.getByRole('button', { name: 'Submit' }).dblclick();
  await page.waitForTimeout(2000);
  await page.getByText('PENGUATKUASAAN', { exact: true }).click();
  await page.getByRole('link', { name: 'Semakan Senarai Dokumen' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'ID Rujukan :' }).click();
  await page.getByRole('textbox', { name: 'ID Rujukan :' }).fill(transaksiId);
  await page.locator('[id^="centerForm:"][id*="j_idt"]').getByText('ID Rujukan').click();
  await page.getByRole('button', { name: 'Cari' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('row', { name: 'Ya Tidak' }).locator('span').first().click();
  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.waitForTimeout(2000);
  await page.locator('#tnd-2').getByRole('link').click();

  // Clear session cookies
  await page.context().clearCookies();

  await page.goto('https://testing.ptgwp.gov.my/etanah-cas/login?service=https%3A%2F%2Ftesting.ptgwp.gov.my%2Fetanah-uam%2Flogin%2Fcas');
  await page.evaluate(() => {
    // @ts-ignore
    window.handleLoginSubmit = () => true;
  });

  await page.locator('#username').click();
  await page.locator('#username').fill('benedict@ptgwp.gov.my');
  await page.locator('#password').click();
  await page.locator('#password').fill('Etanah123#');
  await page.locator('form').click()
  await page.getByRole('button', { name: 'Submit' }).dblclick();
  await page.waitForTimeout(5000);

  await page.locator('#menu-2').waitFor({state: "visible"});
  await page.locator('#menu-2').click();
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'Perserahan Kaunter' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'ID Transaksi Atas Talian /' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'ID Rujukan :' }).click();
  await page.getByRole('textbox', { name: 'ID Rujukan :' }).fill(transaksiId);
  await page.waitForTimeout(5000);
  await page.locator('[id="centerForm:perserahanKaunterTab:cmdBtnNext"]').click();
  await page.waitForTimeout(5000);
  await page.locator('[id="centerForm:tabView:jenisPenyerahMenu_label"]').waitFor();
  await page.locator('[id="centerForm:tabView:jenisPenyerahMenu_label"]').click();
  await page.locator('[id="centerForm:tabView:jenisPenyerahMenu_1"]').click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Nombor Pengenalan :' }).click();
  await page.getByRole('textbox', { name: 'Nombor Pengenalan :' }).fill('111111111111');
  await page.getByRole('textbox', { name: 'Nombor Pengenalan :' }).press('Enter');
  await page.waitForTimeout(2000);
  // await page.locator('[id="centerForm:tabView:pengesahanPenyerah"]').getByRole('group').filter({ hasText: 'Pengesahan Manual :' }).locator('span').nth(3).click();
  await page.locator('.ui-chkbox-icon').first().click();
  await page.waitForTimeout(2000);
  // const ulasanGroup = page.locator('[id="centerForm:tabView:outputPanelUlasan"]').getByRole('group');
  // await ulasanGroup.locator('textarea').fill('test');
  await page.locator('textarea[name="centerForm:tabView:j_idt940"]').click();
  await page.locator('textarea[name="centerForm:tabView:j_idt940"]').fill('test');
  await page.waitForTimeout(2000);
  // await page.locator('[id="centerForm:tabView:tppengesahanPenyerahPanel7"]').getByRole('group').filter({ hasText: 'Alamat Daftar Adalah Alamat' }).locator('span').click();
  await page.locator('.ui-chkbox-icon.ui-icon.ui-icon-blank').first().click(); // click alamat sama
  await page.waitForTimeout(2000);
  // await page.locator('button[name^="centerForm:tabView:"][name*="1795"]').click();
  // await page.locator('#centerForm\\:tabView').getByRole('button', { name: 'Seterusnya' }).click();
  await page.locator('button[name="centerForm:tabView:j_idt1858"]').click();
  await page.locator('[id="centerForm:tabView:btn_spoc_next_senarai_semakan_tab"]').click();
  await page.waitForTimeout(2000);
  await page.locator('[id="centerForm:tabView:kodCaraBayar_label"]').click();
  await page.locator('[id="centerForm:tabView:kodCaraBayar_items"]').getByRole('option', { name: 'Tunai' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Amaun (RM) :' }).click();
  await page.getByRole('textbox', { name: 'Amaun (RM) :' }).fill('100');
  await page.getByRole('textbox', { name: 'Amaun (RM) :' }).press('Enter');
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Tambah', exact: true }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:tabView:bayaranTable:j_idt9917"]').click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Hantar' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('columnheader', { name: 'ID Permohonan / No. Serahan' }).waitFor();

  // Capture the correct gridcell (skip “Jumlah Besar (RM)”)
  const permohonanId = await page.getByRole('gridcell').filter({ hasText: /^(?!Jumlah Besar).*\/\d+\/\w+\/\d+\// }).first().innerText();

  console.log("Captured ID Permohonan / No. Serahan:", permohonanId); // match IDs like PTGKL/3/70KTN/2025/
  
  await page.locator('#tnd-2').click();
  await page.context().clearCookies();

  await page.goto('https://testing.ptgwp.gov.my/etanah-cas/login?service=https%3A%2F%2Ftesting.ptgwp.gov.my%2Fetanah-uam%2Flogin%2Fcas');
  await page.evaluate(() => {
    // @ts-ignore
    window.handleLoginSubmit = () => true;
  });
  await page.locator('#username').click();
  await page.locator('#username').fill('norida@ptgwp.gov.my');
  await page.locator('#password').click();
  await page.locator('#password').fill('etanah123#');
  await page.locator('form').click()
  await page.getByRole('button', { name: 'Submit' }).dblclick();
  await page.waitForTimeout(5000);
  const idPermohonanColumn = page.getByRole('columnheader', { name: 'ID Permohonan / No. Serahan' });
  const filterInput = idPermohonanColumn.locator('input[name^="mainForm:tabView:tasks:"][name*="filter"]');
  await filterInput.click();
  await filterInput.fill(permohonanId);
  await filterInput.press('Enter');
  await page.waitForTimeout(5000);
  // await page.getByRole('gridcell', { name: permohonanId }).click();
  await page.evaluate(() => {
    const td = document.querySelector('tr[data-ri="0"] td:first-child');
    if (td) {
      td.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  });
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(2000);
  await page.mouse.wheel(0, 800);
  // await page.getByRole('row', { name: 'Semakan Selesai :' }).locator('span').click();
  const targetGroup = page.locator('[id*="centerForm:"]').getByRole('group').filter({ hasText: 'Semakan Selesai :' });
  await targetGroup.locator('.ui-chkbox-box:has(span.ui-chkbox-icon.ui-icon.ui-icon-blank.ui-c)').first().click({ force: true });
  await page.waitForTimeout(2000);
  // await page.getByRole('row', { name: 'Lengkap : YaTidak' }).locator('span').first().click();
  const targetGroup2 = page.locator('[id*="centerForm:"]').getByRole('group').filter({ hasText: 'Lengkap : YaTidak' });
  await targetGroup2.locator('.ui-radiobutton-box .ui-radiobutton-icon').first().click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Hantar' }).click();
  await page.waitForTimeout(2000);
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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('hafizjumal@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();

  // WPKL
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.waitForTimeout(5000);

  // Menu Selection
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
    has: page.getByRole('gridcell').filter({ hasText: permohonanId })
  });

  const statusCell = row.getByRole('gridcell').nth(statusIndex);

  await statusCell.waitFor({ state: "visible" }); // safer than waitForTimeout

  const statusText = await statusCell.innerText();

  if (statusText.trim() !== "Penyediaan Laporan Pelukis Pelan") {
    throw new Error(`${permohonanId} status is NOT 'Penyediaan Laporan Pelukis Pelan' → Found: ${statusText}`);
  }

  await page.waitForTimeout(3000);
});