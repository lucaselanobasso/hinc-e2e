import { expect, test } from '@playwright/test'

test.describe('Consistência Inter-seção, valores comprometidos', ()=>{
    test.beforeEach(async({page})=>{
        const auth = process.env.VITE_PLAYWRIGHT_TOKEN
        await page.goto(`/Engenharia/${auth}`)
    })

    test('Titulo da página deve ser "Dashboards"', async({page})=>{
       await expect(page).toHaveTitle('Dashboards')
    })

    test('Heading "Módulo de Engenharia" deve estar visível', async({page})=>{
       await expect(page.getByText('Módulo de Engenharia')).toBeVisible();
    })

    test('Deve possuir o nome do empreendimento na header', async({page})=>{
        const nomeEmpreendimento = await page.locator('._enterpriseDropdown_1e397_32>h1').textContent();
        expect(nomeEmpreendimento).toBe('Base Sucesso');
    })
})