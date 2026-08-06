import { test, expect } from "@playwright/test";
import path from "path";

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

test("WPKL Awam - Permohonan PPJ", async ({ page }) => {
  
  //-------Constant Declaration---------
  // Maklumat Hakmilik:
  const bandarPekanMukim = 'Mukim Batu';
  const jnsHakmilik = 'PM - Pajakan Mukim';
  const noHakmilik = '3103';

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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('magesraao87@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.locator(".menu-1").click();
  await page.getByRole("link", { name: "Lelong" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("row", { name: "1 PPJ - Permohonan Perintah" }).getByLabel("Buat Permohonan").click();
  await page.waitForTimeout(5000);
  await page.locator('[id="centerForm:bandarPekanMukim_label"]').click();
  // await page.locator('[id="centerForm:bandarPekanMukim_2"]').click();
  await page.locator('.ui-selectonemenu-panel:visible').getByRole('option', { name: bandarPekanMukim }).click();
  await page.waitForTimeout(3000);
  await page.getByText('Jenis Hakmilik').click();
  await page.locator('[id="centerForm:jenisHakmilik_label"]').click();
  // await page.locator('[id="centerForm:jenisHakmilik_1"]').click();
  await page.locator('.ui-selectonemenu-panel:visible').getByRole('option', { name: jnsHakmilik }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("textbox", { name: "No Hakmilik :" }).click();
  await page.getByRole("textbox", { name: "No Hakmilik :" }).fill(noHakmilik);
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Tambah" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Teruskan Permohonan" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("textbox", { name: "Nama :" }).waitFor();
  await page.getByRole("textbox", { name: "Nama :" }).click();
  await page.getByRole("textbox", { name: "Nama :" }).fill("TESt");
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:mainTab:tabItem1:kategoriPemohon_label"]').click();
  await page.locator('[id="centerForm:mainTab:tabItem1:kategoriPemohon_items"]').getByRole("option", { name: "Individu" }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:mainTab:tabItem1:maklumatPemegangGadaian"] label').filter({ hasText: '- Sila Pilih -' }).first().click();
  await page.waitForTimeout(3000);  
  await page.getByRole('listbox').getByRole('option', { name: 'Kad Pengenalan Baru' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Jenis/Nombor Pengenalan :' }).click();
  await page.getByRole('textbox', { name: 'Jenis/Nombor Pengenalan :' }).type('010707100867');
  await page.waitForTimeout(3000);
  await page.getByText('Alamat Surat Menyurat (').click();
  await page.getByRole("textbox", { name: "Alamat Surat Menyurat (" }).click();
  await page.getByRole("textbox", { name: "Alamat Surat Menyurat (" }).fill("1, JALan");
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatBerdaftar2_1"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatBerdaftar2_1"]').fill("JALAN");
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatBerdaftar2_1"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatBerdaftar2_1"]').fill("JALAN TANDANG, ");
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatBerdaftar3_1"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatBerdaftar3_1"]').fill("LORANG 12");
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatBerdaftar4_1"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatBerdaftar4_1"]').fill("TAMAN");
  await page.waitForTimeout(3000);
  await page.getByRole("textbox", { name: "Poskod :" }).click();
  await page.getByRole("textbox", { name: "Poskod :" }).fill('47180');
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:mainTab:tabItem1:maklumatPemegangGadaian"] label').filter({ hasText: "- Sila Pilih -" }).first().click();
  await page.getByRole("listbox").getByRole("option", { name: "WILAYAH PERSEKUTUAN KUALA" }).click();
  await page.waitForTimeout(3000);
  await page.locator("div").filter({ hasText: /^- Sila Pilih -KUALA LUMPUR- Sila Pilih -$/ }).locator("label").click();
  await page.getByRole("listbox").getByRole("option", { name: "KUALA LUMPUR" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("textbox", { name: "Nombor Telefon :" }).click();
  await page.getByRole("textbox", { name: "Nombor Telefon :" }).fill("0384739938");
  await page.waitForTimeout(3000);
  await page.getByRole("textbox", { name: "Nombor Faks :" }).click();
  await page.getByRole("textbox", { name: "Nombor Faks :" }).fill("0384739938");
  await page.waitForTimeout(3000);
  await page.getByRole("textbox", { name: "No. Telefon Bimbit :" }).dblclick();
  await page.getByRole("textbox", { name: "No. Telefon Bimbit :" }).fill("0384739938");
  await page.waitForTimeout(3000);
  await page.getByRole("textbox", { name: "Emel :" }).dblclick();
  await page.getByRole("textbox", { name: "Emel :" }).fill("test@gmail.com");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Seterusnya" }).click();
  await page.waitForTimeout(5000);
  await page.getByRole("textbox", { name: "No.Perserahan Gadaian :" }).click();
  await page.getByRole("textbox", { name: "No.Perserahan Gadaian :" }).fill("6204/2019");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Sahkan" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("textbox", { name: "Alamat :" }).click();
  await page.getByRole("textbox", { name: "Alamat :" }).fill("1,");
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:mainTab:tabItem2:alamat-hartanah2"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem2:alamat-hartanah2"]').fill("JALAN TANDANG,");
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:mainTab:tabItem2:alamat-hartanah3"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem2:alamat-hartanah3"]').fill("LORONG 12");
  await page.waitForTimeout(3000);
  await page.locator('input[name="centerForm:mainTab:tabItem2:alamat-hartanah4"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem2:alamat-hartanah4"]').fill("TAMAn");
  await page.waitForTimeout(3000);
  await page.getByRole("textbox", { name: "Poskod :" }).click();
  await page.getByRole("textbox", { name: "Poskod :" }).fill("56000");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Seterusnya" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Seterusnya" }).click();
  await page.waitForTimeout(3000);
  await page.mouse.wheel(0, 800);
  await page.getByRole("button", { name: "Seterusnya" }).click();
  await page.waitForTimeout(5000);
  await page.getByRole("button", { name: "Tutup" }).waitFor();
  await page.getByRole("button", { name: "Tutup" }).click();
  await page.waitForTimeout(3000);
  await page.mouse.wheel(0, -800);
  const filePath = path.resolve("C:/playwright/Document/Testing.pdf");
  for (let i = 0; i <= 11; i++) {
    const input = page.locator(
      `input[name="centerForm:mainTab:tabItem5:semakanTable:${i}:uploadDok_input"]`
    );
    await input.setInputFiles(filePath);
    await page.waitForTimeout(3000);
  }
  await page.getByRole("row", { name: "Dengan ini saya mengakui" }).locator("span").click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Hantar" }).click();
  await page.waitForTimeout(3000);
  await page.locator(".menu-2").click();
  const transaksiCell = page.locator('td[role="gridcell"]').filter({
    hasText: /PPJ\d+/   // regex for your transaction IDs
  });

  // Take the first one
  const transaksiId = await transaksiCell.first().innerText();
  console.log("First Transaksi ID:", transaksiId);
  await page.getByRole("link", { name: "Log Keluar" }).click();
  page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept(); // or dialog.dismiss() if you want Cancel
  });
  await page.goto(
    "https://testing.ptgwp.gov.my/etanah-cas/login?service=https%3A%2F%2Ftesting.ptgwp.gov.my%2Fetanah-uam%2Flogin%2Fcas"
  );
  await page.evaluate(() => {
    // @ts-ignore
    window.handleLoginSubmit = () => true;
  });
  await page.locator("#username").click();
  await page.locator("#username").fill("benedict@ptgwp.gov.my");
  await page.locator("#password").click();
  await page.locator("#password").fill("Etanah123#");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.waitForTimeout(5000);
  await page.locator("#menu-2").click();
  await page.getByRole("link", { name: "Perserahan Kaunter" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("link", { name: "ID Transaksi Atas Talian /" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("textbox", { name: "ID Rujukan :" }).click();
  await page.getByRole("textbox", { name: "ID Rujukan :" }).fill(transaksiId);
  await page.waitForTimeout(5000);
  await page.locator('[id="centerForm:perserahanKaunterTab:cmdBtnNext"]').click();
  await page.waitForTimeout(10000);
  await page.locator('[id="centerForm:tabView:jenisPenyerahMenu_label"]').waitFor();
  await page.locator('[id="centerForm:tabView:jenisPenyerahMenu_label"]').click();
  await page.locator('[id="centerForm:tabView:jenisPenyerahMenu_1"]').click();
  await page.waitForTimeout(3000);
  await page.getByRole("textbox", { name: "Nombor Pengenalan :" }).click();
  await page.getByRole("textbox", { name: "Nombor Pengenalan :" }).type('111111111111');
  await page.getByRole("textbox", { name: "Nombor Pengenalan :" }).press("Enter");
  await page.waitForTimeout(10000);
  await page.locator('[id="centerForm:tabView:pengesahanPenyerah"]').getByRole("group").filter({ hasText: "Pengesahan Manual :" })
    .locator("span").nth(3).click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:tabView:outputPanelUlasan"]').getByRole('group').filter({ hasText: 'Ulasan :' }).click();
  await page.locator('textarea[name^="centerForm:tabView:"]').fill('test');
  await page.waitForTimeout(3000);
  await page.locator('.ui-chkbox-icon.ui-icon.ui-icon-blank').first().click();
  await page.waitForTimeout(3000);
  await page.mouse.wheel(0, 800);
  // await page.locator('button[name="centerForm:tabView:j_idt1795"]').click();
  await page.locator('#centerForm\\:tabView').getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:tabView:btn_spoc_next_senarai_semakan_tab"]').click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:tabView:kodCaraBayar_label"]').click();
  await page.locator('[id="centerForm:tabView:kodCaraBayar_items"]').getByRole("option", { name: "Tunai" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("textbox", { name: "Amaun (RM) :" }).click();
  await page.getByRole("textbox", { name: "Amaun (RM) :" }).fill('3000');
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:tabView:paymentMethodPanel"] div').filter({ hasText: "Tambah" }).click();
  await page.getByRole("button", { name: "Tambah", exact: true }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Hantar" }).click();
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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('magesraao87@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.waitForTimeout(5000);
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
    has: page.getByRole('gridcell').filter({ hasText: transaksiId })
  });

  const statusCell = row.getByRole('gridcell').nth(statusIndex);

  await statusCell.waitFor({ state: "visible" }); // safer than waitForTimeout

  const statusText = await statusCell.innerText();

  if (statusText.trim() !== "Semakan Permohonan") {
    throw new Error(`${transaksiId} status is NOT 'Semakan Permohonan' → Found: ${statusText}`);
  }

  await page.waitForTimeout(10000);
});