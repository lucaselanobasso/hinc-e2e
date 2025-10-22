import { expect, test } from '@playwright/test';

export const elements = {
    nomeEmpreendimento: (page) => page.locator('._enterpriseDropdown_1e397_32>h1').textContent(),

    comprometidoReceitasCard: (page) => page.locator('._value_q7biy_25').nth(2).textContent(),
    comprometidoDespesasCard: (page) => page.locator('._value_q7biy_25').nth(5).textContent(),

    comprometidoEntradasFluxoCaixaLista: (page) => page.locator('[col-id="comprometido"]').nth(1).textContent(),
    comprometidoSaidasFluxoCaixaLista: (page) => page.locator('[col-id="comprometido"]').nth(2).textContent(),

    comprometidoIndiceReceitas: (page) => page.locator('._info_item_ydohh_76').nth(3).textContent(),
    comprometidoIndiceDespesas: (page) => page.locator('._info_item_ydohh_76').nth(7).textContent(),

}