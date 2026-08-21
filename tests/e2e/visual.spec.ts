import { expect, test } from "@playwright/test";

test.describe("regresión visual crítica", () => {
  for (const path of ["/es", "/es/especialidades", "/es/reservar", "/admin/login"]) {
    test(`@visual ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`${path.replaceAll("/", "-").replace(/^-/, "")}.png`, { fullPage: true, animations: "disabled", caret: "hide", timeout: 15_000 });
    });
  }
});
