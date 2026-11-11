import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import CommandPaletteOverride from './CommandPaletteOverride.svelte';
import CommandPaletteShortcut from './CommandPaletteShortcut.svelte';

test('opens and closes from the shortcut while ignoring editable targets and repeats', async () => {
  render(CommandPaletteShortcut);

  await page.getByRole('textbox', { name: 'Editable target', exact: true }).press('Alt+k');
  await expect
    .element(page.getByRole('dialog', { name: 'Command palette', exact: true }))
    .toHaveCount(0);

  await page.getByRole('button', { name: 'Shortcut target', exact: true }).press('Alt+k');
  await expect
    .element(page.getByRole('dialog', { name: 'Command palette', exact: true }))
    .toBeVisible();
  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      altKey: true,
      code: 'KeyK',
      key: 'k',
      repeat: true,
    }),
  );
  await expect
    .element(page.getByRole('dialog', { name: 'Command palette', exact: true }))
    .toBeVisible();
  await page.getByRole('dialog').press('Alt+k');
  await expect
    .element(page.getByRole('dialog', { name: 'Command palette', exact: true }))
    .toHaveCount(0);
});

test('provides accessible search and consumer utilities override Tailwind defaults', async () => {
  render(CommandPaletteOverride);

  await page.getByRole('combobox', { name: 'Search commands', exact: true }).fill('open');

  await page.getByRole('button', { name: 'Clear search', exact: true }).click();
  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toHaveValue('');
  await expect
    .element(page.getByRole('combobox', { name: 'Search commands', exact: true }))
    .toBeFocused();

  const content = screen.getByRole('dialog', { name: 'Command palette' });
  const list = screen.getByRole('listbox');
  const item = screen.getByRole('option', { name: /Open settings/ });
  expect([...content!.classList]).toEqual(expect.arrayContaining(['max-h-96']));
  expect([...list!.classList]).toEqual(expect.arrayContaining(['p-0']));
  expect([...item!.classList]).toEqual(expect.arrayContaining(['rounded-none', 'px-0']));
  await expect.element(page.getByText('⌘K')).toBeAttached();
  await expect.element(page.getByText('Enter')).toBeAttached();
  const kbd = screen.getByTestId('command-kbd');
  expect(kbd.tagName).toBe('KBD');
  await expect.element(page.getByTestId('command-kbd')).toHaveAttribute('data-scope', 'kbd');
  await expect.element(page.getByTestId('command-kbd')).toHaveAttribute('data-part', 'root');

  await expect
    .element(page.locator('[data-slot="command-palette-content"]'))
    .toHaveCSS('max-height', '384px');
  await expect
    .element(page.locator('[data-slot="command-palette-list"]'))
    .toHaveCSS('padding', '0px');
  await expect
    .element(page.locator('[data-slot="command-palette-item"]'))
    .toHaveCSS('border-radius', '0px');
  await expect
    .element(page.locator('[data-slot="command-palette-item"]'))
    .toHaveCSS('padding-left', '0px');
});