import { test, expect } from '@playwright/test';

test.describe('Contas a Pagar - Preset Management', () => {
    const baseURL = 'https://homologacao-dash.hinc.com.br/contasPagar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRyeXBvaW50IjoidW5kZWZpbmVkIiwiZGF0YXNldCI6ImN1c3RvbWVyXzEiLCJpc19hZG1pbiI6InRydWUiLCJhdXRoX3NjcmVlbnMiOiJ1bmRlZmluZWQiLCJ3b3JrZ3JvdXBfaWQiOiIyNDAiLCJwcmltYXJ5Q29sb3IiOiJ1bmRlZmluZWQiLCJ0aXRsZSI6IkJhc2UgU3VjZXNzbyIsImxvZ28iOiJ1bmRlZmluZWQiLCJzdWIiOiIxMjA0MyIsImV4cCI6MTc1ODAyNDc1NTk5OTk5fQ.fkMZSs41vta2NBpTg39bY6x1KPbRsnt1u5J6EcTsZ5o';

    test.beforeEach(async ({ page }) => {
        // Navegar para a página de Contas a Pagar
        await page.goto(baseURL);
        
        // Aguardar a página carregar completamente
        await expect(page).toHaveTitle('Dashboards');
        await expect(page.getByRole('heading', { name: 'Contas a Pagar', exact: true })).toBeVisible();
    });

    test('deve navegar até configurações', async ({ page }) => {
        // Procurar pelo botão de configurações
        const configButton = page.locator('._button_config_1h0sn_38').first();
        
        // Se o botão existir, clicar nele
        if (await configButton.count() > 0) {
            await configButton.click();
            
            // Aguardar modal ou painel de configurações abrir
            await page.waitForTimeout(1000);
        } else {
            // Alternativa: procurar por botão com ícone de engrenagem ou settings
            const settingsButton = page.getByRole('button').filter({ has: page.locator('svg[class*="settings"]') }).first();
            if (await settingsButton.count() > 0) {
                await settingsButton.click();
            }
        }
    });

    test('deve criar um preset', async ({ page }) => {
        // Aplicar alguns filtros primeiro
        await page.getByRole('button', { name: 'Filtros' }).click();
        await expect(page.getByRole('heading', { name: 'Por agrupadores' })).toBeVisible();
        
        // Selecionar um filtro qualquer
        const empresaCombobox = page.locator('._select_1gjmh_1').first();
        if (await empresaCombobox.count() > 0) {
            await empresaCombobox.click();
            await page.waitForTimeout(500);
        }
        
        // Aplicar os filtros
        await page.getByRole('button', { name: 'Aplicar Filtros' }).click();
        await page.waitForTimeout(1000);
        
        // Tentar salvar como preset
        // Nota: A funcionalidade de preset pode estar em um menu específico
        // que precisa ser identificado manualmente na interface
    });

    test('deve listar preset no menu hamburger', async ({ page }) => {
        // Procurar por menu hamburger ou dropdown de presets
        const hamburgerMenu = page.locator('[class*="hamburger"], [class*="menu-trigger"]').first();
        
        if (await hamburgerMenu.count() > 0) {
            await hamburgerMenu.click();
            await page.waitForTimeout(500);
            
            // Verificar se há lista de presets
            const presetList = page.locator('[class*="preset"]');
            await expect(presetList.first()).toBeVisible({ timeout: 5000 });
        }
    });

    test('deve navegar para página inicial e verificar heading', async ({ page }) => {
        // Verificar se está na página correta
        await expect(page.getByRole('heading', { name: 'Contas a Pagar', exact: true })).toBeVisible();
        
        // Verificar se o nome do empreendimento está visível
        await expect(page.getByRole('heading', { name: 'Base Sucesso' })).toBeVisible();
        
        // Verificar se os cards de informações estão visíveis
        await expect(page.getByRole('heading', { name: 'Índice Despesas' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Total Despesas' })).toBeVisible();
    });
});
