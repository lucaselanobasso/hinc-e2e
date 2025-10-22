import { expect } from '@playwright/test';

export function cleanMonetaryValue(value) {
    if (!value || typeof value !== 'string') {
        return 0;
    }
    let cleanValue = value
        .replace(/[R$\s€$£¥()-]/g, '')
        .replace(/[^\d,.]/g, '')
    if (cleanValue.includes(',')) {
        cleanValue = cleanValue.replace(/\./g, '').replace(',', '.');
    }
    return parseFloat(cleanValue) || 0;
}

export function expectMonetaryValuesToBeClose(actual, expected, tolerance = 0.01) {
    const actualNumber = typeof actual === 'string' ? cleanMonetaryValue(actual) : actual;
    const expectedNumber = typeof expected === 'string' ? cleanMonetaryValue(expected) : expected;
    expect(actualNumber).toBeCloseTo(expectedNumber, 2);
}

export function compareMonetaryElements(element1, element2, tolerance = 0.01) {
    const value1 = cleanMonetaryValue(element1);
    const value2 = cleanMonetaryValue(element2);
    expect(value1).toBeCloseTo(value2, 2);
}

export function clickButtonByText(page, buttonText) {
    return page.locator('button', { hasText: buttonText }).click();
}

// export async function createAndSelectNewPreset(page, presetName) {
//     await page.locator('._header_6wxw3_29 > ._buttonDropdown_49dsl_1').click();
//     await page.getByText('Novo Preset').click();
//     await page.fill('input[placeholder="Digite o nome do preset"]', presetName);
//     await clickButtonByText(page, 'Criar');
//     await page.locator('._header_6wxw3_29 > ._buttonDropdown_49dsl_1').click();
//     await page.getByText(presetName).click();
// }
