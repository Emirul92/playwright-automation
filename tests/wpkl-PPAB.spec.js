import { test, expect } from '@playwright/test';
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

test('WPKL Permohonan Pertukaran Alamat Bil (PPAB) - Hasil', async ({ page }) => {

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
  // Log Masuk
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('lengseehup@outlook.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();

  // WPKL
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.waitForTimeout(1000);

  // menu selection
  await page.locator('.menu-1').click();
  await page.waitForTimeout(1000)
  await page.getByRole('link', { name: 'Hasil' }).click();
  await page.getByRole('link', { name: 'Buat Permohonan' }).click();
  await page.waitForTimeout(1000);

  await page.locator('[id="centerForm:bandarPekanMukim"] span').waitFor({ state: "visible" });
  await page.locator('[id="centerForm:bandarPekanMukim"] span').click();
  await page.locator('[id="centerForm:bandarPekanMukim_2"]').click();
  await page.waitForTimeout(1000);
  await page.getByTitle('Sila pilih jenis hakmilik.').locator('span').click();
  await page.locator('[id="centerForm:jenisHakmilik_2"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).click();
  await page.getByRole('textbox', { name: 'No Hakmilik :' }).pressSequentially('53068', { delay: 100 });
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.getByRole('button', { name: 'Teruskan Permohonan' }).click();

  // const timestamp = new Date()
  //   .toISOString()
  //   .replace(/[-T:.Z]/g, '')  
  //   .slice(0, 14); 
  await page.getByRole('textbox', { name: 'Alamat Bil (Kemaskini) :' }).click();
  await page.getByRole('textbox', { name: 'Alamat Bil (Kemaskini) :' }).fill(`${Date.now()}`);
  await page.waitForTimeout(1000);
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatSurat2"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatSurat2"]').fill('TAMAN HARTAMAS');
  await page.waitForTimeout(1000);
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatSurat3"]').click();
  await page.locator('input[name="centerForm:mainTab:tabItem1:alamatSurat3"]').fill('JALAN BAHAGIA');
  await page.waitForTimeout(1000  );
  await page.getByRole('textbox', { name: 'Poskod :' }).click();
  await page.getByRole('textbox', { name: 'Poskod :' }).fill('50480');
  await page.waitForTimeout(1000);
// Negeri dropdown
await page.locator('#centerForm\\:mainTab\\:tabItem1\\:negeriSurat > .ui-selectonemenu-trigger > .ui-icon').click();
await page
  .locator('#centerForm\\:mainTab\\:tabItem1\\:negeriSurat_items')
  .getByRole('option', { name: 'WILAYAH PERSEKUTUAN KUALA LUMPUR' })
  .click();
await page.waitForTimeout(2000);

// Bandar dropdown
await page.locator('#centerForm\\:mainTab\\:tabItem1\\:bandarSurat > .ui-selectonemenu-trigger > .ui-icon').click();
await page
  .locator('#centerForm\\:mainTab\\:tabItem1\\:bandarSurat_items')
  .getByRole('option', { name: 'KUALA LUMPUR' })
  .click();
  await page.getByRole('textbox', { name: 'No. Telefon :' }).click();
  await page.getByRole('textbox', { name: 'No. Telefon :' }).fill('0136786543');
  await page.waitForTimeout(3000);
  const emailField = page.getByRole('textbox', { name: 'Emel :' });
  await emailField.click();
  await emailField.fill('');
  await emailField.type('siti@gmail.com', { delay: 100 }); // simulate real typing
  await page.keyboard.press('Tab'); // trigger blur validation
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.waitForTimeout(3000);
  const filePath = path.resolve("C:/Users/Nur Ainisa/Downloads/playwright/playwright-demo/TEST1.pdf");
    const input = page.locator(
      `input[name="centerForm:mainTab:tabItem3:dokumenDisertakanTbl:1:uploadDok_input"]`
    );
  await input.setInputFiles(filePath);
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: 'Dengan ini saya mengakui' }).locator('span').click();
  await page.getByRole('button', { name: 'Seterusnya' }).click();
  await page.getByRole('button', { name: 'Sahkan' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Hantar' }).click();
  await page.waitForTimeout(1000);

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
  await page.locator('#username').fill('khatmas@ptgwp.gov.my');
  await page.locator('#password').click();
  await page.locator('#password').fill('etanah123#');
  await page.locator('form').click()
  await page.getByRole('button', { name: 'Submit' }).dblclick();
  await page.locator('#menu-30 span').nth(1).click();
  await page.getByRole('link', { name: 'Pergerakan Fail' }).click();
  await page.getByRole('textbox', { name: 'ID Permohonan/No. Serahan :' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'ID Permohonan/No. Serahan :' }).fill(transaksiId);
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
  // Log Masuk
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('lengseehup@outlook.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();

  // WPKL
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.waitForTimeout(1000);

  // menu selection
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

  await page.waitForTimeout(5000);
});