import { expect, test } from "@playwright/test";

test.describe("sitio público", () => {
  test("home en español carga y ofrece llamada", async ({ page }) => {
    await page.goto("/es");
    await expect(page).toHaveTitle(/Aura/i);
    await expect(page.locator('a[href="/es/reservar"]').first()).toBeVisible();
  });

  test("home en inglés carga", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveTitle(/Aura/i);
    await expect(page.getByRole("link").first()).toBeVisible();
  });

  test("navega a especialidades y proceso de viaje", async ({ page }) => {
    await page.goto("/es/especialidades");
    await expect(page.getByRole("heading", { name: /explora antes de decidir/i })).toBeVisible();
    await page.getByRole("link", { name: /empieza tu viaje/i }).click();
    await expect(page).toHaveURL(/\/es\/como-funciona$/);
    await expect(page.getByRole("heading", { name: /experiencia coordinada/i })).toBeVisible();
  });

  test("formulario muestra sus campos esenciales", async ({ page }) => {
    await page.goto("/es/reservar");
    await expect(page.getByLabel(/nombre/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/teléfono|telefono/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /solicitar|enviar/i })).toBeVisible();
  });
});
