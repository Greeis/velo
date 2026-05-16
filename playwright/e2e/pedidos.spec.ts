import { test, expect } from '@playwright/test'

import { generateCode } from '../support/helpers'

import { OrderLockupPage } from '../support/pages/OrderLockupPage'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data

    const order = {
      number: 'VLO-YAF0XN',
      status: 'APROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Graziele Almeida',
        email: 'g@dev.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-K8HW91',
      status: 'EM_ANALISE' as const,
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Graziele Almeida',
        email: 'teste@galmeida.com'
      },
      payment: 'À Vista'
    }


    // Act  
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-K8HW91',
      status: 'EM_ANALISE' as const,
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Graziele Almeida',
        email: 'teste@galmeida.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateCode()

    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order)


    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)

  })
})


// AAA - Arrange, Act, Assert

// test.describe('Consulta de Pedido', () => {
//   test.beforeEach(async ({ page }) => {
//     // Arrange - preparar o cenário
//     await page.goto('http://localhost:5173/')
//     await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

//     await page.getByRole('link', { name: 'Consultar Pedido' }).click()
//     await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
//   })

//   test('deve consultar um pedido aprovado', async ({ page }) => {

    // const order = {
    //   number: 'VLO-YAF0XN',
    //   status: 'APROVADO',
    //   color: 'Midnight Black',
    //   wheels: 'sport Wheels',
    //   customer: {
    //     name: 'Graziele Almeida',
    //     email: 'g@dev.com'
    //   },
    //   payment: 'À Vista'
    // }

//     // Act - agir no cenário
//     const orderLockupPage = new OrderLockupPage(page)
//     await orderLockupPage.searchOrder(order.number)

//     // Assert - verificar o resultado

//     // await page.waitForTimeout(10000) // timeout implicito
//     // await expect(page.getByText('Pedido', { exact: true })).toBeVisible({ timeout: 30_000 }) //30 segundos - timeout explicito 

//     // Exemplo de validacao 1
//     // await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 10_000 })
//     // await expect(page.getByTestId('order-result-id')).toContainText('VLO-YAF0XN')

//     // Exemplo de validacao 2
//     await expect(page.getByText('Pedido', { exact: true })).toBeVisible({ timeout: 10_000 })
//     await expect(page.getByText(order.number)).toBeVisible();
//     await expect(page.getByText('APROVADO')).toBeVisible()

//     // Exemplo de validacao 3
//     const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-YAF0XN"]')
//     await expect(orderCode).toBeVisible({ timeout: 10_000 })

//     // Exemplo de validacao 4
//     const containerPedido = page.getByRole('paragraph')
//       .filter({ hasText: /^Pedido$/ })
//       .locator('..')

//     // ^ -> começa com 
//     // $ -> acaba com 
//     await expect(containerPedido).toContainText(order.number, { timeout: 20_000 })

//     // Exemplo de validacao 5 - Validacao com snapshot
//     await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
//       - img
//       - paragraph: Pedido
//       - paragraph: ${order.number}
//       - status: 
//         - img
//         - text: ${order.status}
//       `);

//     await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
//       - img "Velô Sprint"
//       - paragraph: Modelo
//       - paragraph: Velô Sprint
//       - paragraph: Cor
//       - paragraph: ${order.color}
//       - paragraph: Interior
//       - paragraph: cream
//       - paragraph: Rodas
//       - paragraph: ${order.wheels}
//       - heading "Dados do Cliente" [level=4]
//       - paragraph: Nome
//       - paragraph: ${order.customer.name}
//       - paragraph: Email
//       - paragraph: ${order.customer.email}
//       - paragraph: Loja de Retirada
//       - paragraph
//       - paragraph: Data do Pedido
//       - paragraph: /\\d+\\/\\d+\\/\\d+/
//       - heading "Pagamento" [level=4]
//       - paragraph: ${order.payment}
//       - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
//       `)

//       const statusBadge = page.getByRole('status').filter({ hasText: order.status })

//       // validando a estilizacao do badge
//       await expect(statusBadge).toHaveClass(/bg-green-100/)

//       const statusIcon = statusBadge.locator('svg')
//       await expect(statusIcon).toHaveClass(/lucide-circle-check-big/) // verificando se o icone do check esta presente
//   })

//   test('deve consultar um pedido em analise', async ({ page }) => {

    // const order = {
    //   number: 'VLO-K8HW91',
    //   status: 'EM_ANALISE',
    //   color: 'Glacier Blue',
    //   wheels: 'aero Wheels',
    //   customer: {
    //     name: 'Graziele Almeida',
    //     email: 'teste@galmeida.com'
    //   },
    //   payment: 'À Vista'
    // }

//     // Act - agir no cenário
//     const orderLockupPage = new OrderLockupPage(page)
//     await orderLockupPage.searchOrder(order.number)

//     // Assert - verificar o resultado

//     // await page.waitForTimeout(10000) // timeout implicito
//     // await expect(page.getByText('Pedido', { exact: true })).toBeVisible({ timeout: 30_000 }) //30 segundos - timeout explicito 

//     // Exemplo de validacao 1
//     // await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 10_000 })
//     // await expect(page.getByTestId('order-result-id')).toContainText('VLO-YAF0XN')

//     // Exemplo de validacao 2
//     await expect(page.getByText('Pedido', { exact: true })).toBeVisible({ timeout: 10_000 })
//     await expect(page.getByText(order.number)).toBeVisible();
//     await expect(page.getByText('EM_ANALISE')).toBeVisible()

//     // Exemplo de validacao 3
//     const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-K8HW91"]')
//     await expect(orderCode).toBeVisible({ timeout: 10_000 })

//     // Exemplo de validacao 4
//     const containerPedido = page.getByRole('paragraph')
//       .filter({ hasText: /^Pedido$/ })
//       .locator('..')

//     // ^ -> começa com 
//     // $ -> acaba com 
//     await expect(containerPedido).toContainText(order.number, { timeout: 20_000 })

//     // Exemplo de validacao 5 - Validacao com snapshot
//     await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
//       - img
//       - paragraph: Pedido
//       - paragraph: ${order.number}
//       - status: 
//         - img
//         - text: ${order.status}
//       `);
      
//     await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
//       - img "Velô Sprint"
//       - paragraph: Modelo
//       - paragraph: Velô Sprint
//       - paragraph: Cor
//       - paragraph: ${order.color}
//       - paragraph: Interior
//       - paragraph: cream
//       - paragraph: Rodas
//       - paragraph: ${order.wheels}
//       - heading "Dados do Cliente" [level=4]
//       - paragraph: Nome
//       - paragraph: ${order.customer.name}
//       - paragraph: Email
//       - paragraph: ${order.customer.email}
//       - paragraph: Loja de Retirada
//       - paragraph
//       - paragraph: Data do Pedido
//       - paragraph: /\\d+\\/\\d+\\/\\d+/
//       - heading "Pagamento" [level=4]
//       - paragraph: ${order.payment}
//       - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
//       `)
//       const statusBadge = page.getByRole('status').filter({ hasText: order.status })

//       // validando a estilizacao do badge
//       await expect(statusBadge).toHaveClass(/bg-amber-100/)
//       await expect(statusBadge).toHaveClass(/text-amber-700/)

//       const statusIcon = statusBadge.locator('svg')
//       await expect(statusIcon).toHaveClass(/lucide-clock/) // verificando se o icone do clock esta presente
//   })


//   test('deve consultar um pedido reprovado', async ({ page }) => {

    // const order = {
    //   number: 'VLO-K8HW91',
    //   status: 'EM_ANALISE',
    //   color: 'Glacier Blue',
    //   wheels: 'aero Wheels',
    //   customer: {
    //     name: 'Graziele Almeida',
    //     email: 'teste@galmeida.com'
    //   },
    //   payment: 'À Vista'
    // }

//     // Act - agir no cenário
//     const orderLockupPage = new OrderLockupPage(page)
//     await orderLockupPage.searchOrder(order.number)

//     // Assert - verificar o resultado

//     const containerPedido = page.getByRole('paragraph')
//       .filter({ hasText: /^Pedido$/ })
//       .locator('..')
//     await expect(containerPedido).toContainText(order.number, { timeout: 20_000 })

//     await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
//       - img
//       - paragraph: Pedido
//       - paragraph: ${order.number}
//       - status: 
//         - img
//         - text: ${order.status}
//       `)

//       await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
//         - img "Velô Sprint"
//         - paragraph: Modelo
//         - paragraph: Velô Sprint
//         - paragraph: Cor
//         - paragraph: ${order.color}
//         - paragraph: Interior
//         - paragraph: cream
//         - paragraph: Rodas
//         - paragraph: ${order.wheels}
//         - heading "Dados do Cliente" [level=4]
//         - paragraph: Nome
//         - paragraph: ${order.customer.name}
//         - paragraph: Email
//         - paragraph: ${order.customer.email}
//         - paragraph: Loja de Retirada
//         - paragraph
//         - paragraph: Data do Pedido
//         - paragraph: /\\d+\\/\\d+\\/\\d+/
//         - heading "Pagamento" [level=4]
//         - paragraph: ${order.payment}
//         - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
//         `);

//         const statusBadge = page.getByRole('status').filter({ hasText: order.status })

//         // validando a estilizacao do badge
//         await expect(statusBadge).toHaveClass(/bg-red-100/)
//         await expect(statusBadge).toHaveClass(/text-red-700/)

//         const statusIcon = statusBadge.locator('svg')
//         await expect(statusIcon).toHaveClass(/lucide-circle-x/) // verificando se o icone do x esta presente
//   })


//   test('deve exibir mensagem quando o pedido nao é encontrando', async ({ page }) => {
//     const order = generateCode();

//     // Act - agir no cenário
//     await page.getByPlaceholder('Ex: VLO-ABC123').fill(order)
//     await page.getByRole('button', { name: 'Buscar Pedido' }).click()

//     const title = page.getByRole('heading', { name: 'Pedido não encontrado' })
//     await expect(title).toBeVisible()

//     const message = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente' })
//     await expect(message).toBeVisible()

//     //Usando o assert snapshot
//     await expect(page.locator('#root')).toMatchAriaSnapshot(`
//     - img
//     - heading "Pedido não encontrado" [level=3]
//     - paragraph: Verifique o número do pedido e tente novamente
//     `);
//   })
// })