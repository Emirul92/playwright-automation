import { test, expect } from '@playwright/test';
//import { faker } from '@faker-js/faker/locale/en'; // install faker-js : 'npm install @faker-js/faker'

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

// Function to generate random IC number
function generateMalaysianIC() {
  const year = faker.number.int({ min: 70, max: 99 }).toString();
  const month = faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0');
  const day = faker.number.int({ min: 1, max: 28 }).toString().padStart(2, '0');
  const stateCodes = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '14'];
  const pb = faker.helpers.arrayElement(stateCodes);
  const lastFour = faker.string.numeric(4);
  return `${year}${month}${day}${pb}${lastFour}`;
}

test('WPKL Awam - Pengurusan Wakil (Untuk daftar runner JUB)', async ({ page }) => {

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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('jurukurparamount@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.waitForTimeout(1000);
  // WPKL
  await page.locator('.bottom-wrapper-content-2 > div:nth-child(2)').click();
  await page.waitForTimeout(1000);

  // Menu Selection
  await page.locator('.menu-9').dispatchEvent('click');
  await page.waitForTimeout(1000);

  // Pengurusan Wakil - Pendaftaran Wakil
  const randomName = faker.person.fullName().toUpperCase();   // To generate random name
  await page.getByRole('textbox', { name: 'Nama Penuh :' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Nama Penuh :' }).pressSequentially(randomName);
  await page.waitForTimeout(2000);

  // await page.getByRole('textbox', { name: 'Nama Penuh :' }).fill('TEmt'); // manual fill in name
  // await page.waitForTimeout(1000);

  // To generate random Ic
  const icNumber = generateMalaysianIC();
  await page.getByRole('textbox', { name: 'No. Kad Pengenalan Baru :' }).click();
  await page.getByRole('textbox', { name: 'No. Kad Pengenalan Baru :' }).fill(icNumber);
  console.log(`Extracted IC: ${icNumber}`);
  await page.waitForTimeout(2000);

  // await page.getByRole('textbox', { name: 'No. Kad Pengenalan Baru :' }).fill('800219125432'); // manual fill in IC number
  // await page.waitForTimeout(1000);

  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).fill('0194234567');
  await page.waitForTimeout(1000);

  await page.getByRole('row', { name: 'Dengan ini saya mengakui' }).locator('span').click();
  await page.waitForTimeout(1000);
  
  await page.getByRole('button', { name: 'Simpan' }).click();

  await page.locator('div').filter({ hasText: /^Berjaya$/ }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Tutup' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Senarai Wakil' }).click();
  await page.waitForTimeout(5000);
  console.log('TEST END');


});