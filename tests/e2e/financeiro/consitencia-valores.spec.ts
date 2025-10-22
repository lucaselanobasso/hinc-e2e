import { expect, test } from '@playwright/test'
import { elements } from '../financeiro/helpers/pom';
import { compareMonetaryElements, cleanMonetaryValue, clickButtonByText } from '../financeiro/helpers/utils';

test.describe('Consistência Inter-seção, valores comprometidos', ()=>{
    test.beforeEach(async({page})=>{
        const auth = process.env.VITE_PLAYWRIGHT_TOKEN
        await page.goto(`/financial/${auth}`)
    })

    test('Titulo da página deve ser "Dashboards"', async({page})=>{
       await expect(page).toHaveTitle('Dashboards')
    })

    test('Heading "Módulo Financeiro" deve estar visível', async({page})=>{
        await expect(page.getByText('Módulo Financeiro')).toBeVisible();
    })

    test('Deve possuir o nome do empreendimento na header', async({page})=>{
        const nomeEmpreendimento = await page.locator('._enterpriseDropdown_1e397_32>h1').textContent();
        expect(nomeEmpreendimento).toBe('Base Sucesso');
    })

    test('Validar que valor total comprometido Receitas cards é igual a valor comprometido Entradas fluxo de caixa lista', async({page})=>{
        const comprometidoReceitasCard = await elements.comprometidoReceitasCard(page);
        await clickButtonByText(page, 'Lista');
        const comprometidoEntradasFluxoCaixaLista = await elements.comprometidoEntradasFluxoCaixaLista(page);
        compareMonetaryElements(comprometidoReceitasCard, comprometidoEntradasFluxoCaixaLista, 0.01);
    })

     test('Validar que valor total comprometido Despesas cards é igual a valor comprometido Saidas fluxo de caixa lista', async({page})=>{
        const comprometidoDespesasCard = await elements.comprometidoDespesasCard(page);
        await clickButtonByText(page, 'Lista');
        const comprometidoSaidasFluxoCaixaLista = await elements.comprometidoSaidasFluxoCaixaLista(page);
        compareMonetaryElements(comprometidoDespesasCard, comprometidoSaidasFluxoCaixaLista, 0.01);
    })

    test('Validar que valor comprometido Entradas fluxo de caixa lista é igual a Comprometido Indice Receitas', async({page})=>{
        await clickButtonByText(page, 'Lista');
        const comprometidoEntradasFluxoCaixaLista = await elements.comprometidoEntradasFluxoCaixaLista(page);
        const comprometidoIndiceReceitas = await elements.comprometidoIndiceReceitas(page);
        compareMonetaryElements(comprometidoEntradasFluxoCaixaLista, comprometidoIndiceReceitas, 0.01);
    })

    test('Validar que valor comprometido Saidas fluxo de caixa lista é igual a Comprometido Indice Despesas', async({page})=>{
        await clickButtonByText(page, 'Lista');
        const comprometidoSaidasFluxoCaixaLista = await elements.comprometidoSaidasFluxoCaixaLista(page);
        const comprometidoIndiceDespesas = await elements.comprometidoIndiceDespesas(page);
        compareMonetaryElements(comprometidoSaidasFluxoCaixaLista, comprometidoIndiceDespesas, 0.01);
    })
})