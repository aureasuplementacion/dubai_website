import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("accesibilidad crítica", () => {
  for (const path of ["/es", "/es/especialidades", "/es/contacto", "/en"]) {
    test(`${path} no tiene violaciones críticas`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations.filter((item) => ["critical", "serious"].includes(item.impact || ""))).toEqual([]);
    });
  }
});
