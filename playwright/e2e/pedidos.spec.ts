import { test, expect } from '@playwright/test'

// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {

  // Arrange - preparar o cenário
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act - agir no cenário
  await page.getByPlaceholder('Ex: VLO-ABC123').fill('VLO-YAF0XN')
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()
  
  // Assert - verificar o resultado

  // await page.waitForTimeout(10000) // timeout implicito
  // await expect(page.getByText('Pedido', { exact: true })).toBeVisible({ timeout: 30_000 }) //30 segundos - timeout explicito 

  // await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 10_000 })
  // await expect(page.getByTestId('order-result-id')).toContainText('VLO-YAF0XN')

  await expect(page.getByText('Pedido', { exact: true })).toBeVisible({ timeout: 10_000 })
  await expect(page.getByText('VLO-YAF0XN')).toBeVisible();

  await expect(page.getByText('APROVADO')).toBeVisible() 

})