import { test, expect } from '@playwright/test'

// AAA - Arrange, Act, Assert (Dado, Quando, Então) PREPARAR, AGIR, VERIFICAR

test('deve consultar um pedido aprovado', async ({ page }) => {

  // Arrange - preparar o cenário
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act - agir no cenário
  await page.getByTestId('search-order-id').fill('VLO-YAF0XN')

  await page.getByTestId('search-order-button').click()
  
  // Assert - verificar o resultado
  await expect(page.getByTestId('order-result-id')).toBeVisible()
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-YAF0XN')

  await expect(page.getByTestId('order-result-status')).toBeVisible()
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
})