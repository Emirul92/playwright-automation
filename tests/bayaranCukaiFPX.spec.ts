import { test, expect } from "@playwright/test";

test.use({
  ignoreHTTPSErrors: true
});

test("WPKL Awam - Bayaran Cukai Tanah dan Petak (FPX)", async ({ page }) => {

  //-------Constant Declaration---------
  // Maklumat Hakmilik:
  const bandarPekanMukim = '02-Mukim Batu';
  const jnsHakmilik = 'GM-Geran Mukim';
  const noHakmilik = '5626';

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
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'ID Pengguna' }).fill('preakz@gmail.com');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).click();
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('textbox', { name: 'Kata Laluan' }).fill('etanah123#');
  await page.locator('iframe[title="eTanahAwam"]').contentFrame().getByRole('button', { name: 'Log Masuk' }).click();
  await page.locator(".bottom-wrapper-content-1 > div:nth-child(2) > a").click();
  await page.locator(".menu-3").click();
  await page.waitForTimeout(5000);
  await page.getByRole("button", { name: "Tutup" }).click();
  await page.getByRole("row", { name: "No. Akaun ID Hakmilik Tanah" }).locator("span").nth(1).click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:mainMenuTab:bandarPekanMukim2_label"]').click();
  //await page.locator(`[id="centerForm:mainMenuTab:bandarPekanMukim2_${bandarPekanMukim}"]`).click();
  //await page.locator('[id="centerForm:mainMenuTab:bandarPekanMukim2_2"]').click();
  await page.locator('.ui-selectonemenu-panel:visible').getByRole('option', { name: bandarPekanMukim }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id="centerForm:mainMenuTab:jenisHakmilik_label"]').click();
  //await page.locator(`[id="centerForm:mainMenuTab:jenisHakmilik_${jnsHakmilik}"]`).click();
  //await page.locator('[id="centerForm:mainMenuTab:jenisHakmilik_4"]').click();
  await page.locator('.ui-selectonemenu-panel:visible').getByRole('option', { name: jnsHakmilik }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("textbox", { name: "No Hakmilik :" }).click();
  await page.getByRole("textbox", { name: "No Hakmilik :" }).fill(noHakmilik);
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Cari" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Bayar/Semak Cukai Tanah/Petak" }).click();
  await page.waitForTimeout(5000);
  await page.mouse.wheel(0, 800);
  await page.getByRole('button', { name: 'Bayar' }).click();
  //const bayarBtn = page.getByRole("button", { name: "Bayar" });

  //if ((await bayarBtn.count()) === 0) {
  //  test.skip(true, "No Bayar button found, skipping test.");
  //}
  // Update the hakmilik record to mark it as used after successful test completion
  //try {
  //  await updateHakmilikIdUsedStatus(doc_id);
  //  console.log(`Successfully updated hakmilik record ${doc_id} as used.`);
  //} catch (error) {
  //  console.error(`Failed to update hakmilik record ${doc_id} as used:`, error);
  //}
  //await bayarBtn.click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Seterusnya" }).click();
  await page.waitForTimeout(3000);
  await page.locator('[id="myForm:paymentOnline:bank-selected"] div').nth(2).click();
  //await page.locator(`[id="myForm:paymentOnline:bank-selected_${bankFPX}"]`).click();
  await page.locator('[id="myForm:paymentOnline:bank-selected_24"]').click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).click();
  await page.getByRole('textbox', { name: 'No. Telefon Bimbit :' }).fill('0123574977');
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Seterusnya" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("textbox", { name: "User Id" }).click();
  await page.getByRole("textbox", { name: "User Id" }).fill("1234");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("1234");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
  await page.getByRole("button", { name: "Continue with Transaction" }).click();
  await page.waitForTimeout(10000);
  await page.getByRole("button", { name: "Cetak Resit Bayaran" }).waitFor();
  await page.getByRole("button", { name: "Cetak Resit Bayaran" }).click();
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(10000);
  await page.getByRole("button", { name: "Tutup" }).click();
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(3000);
});