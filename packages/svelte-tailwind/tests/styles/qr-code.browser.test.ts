import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import QrCodeOverride from './QrCodeOverride.svelte';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  const { container } = render(QrCodeOverride);

  const root = container.querySelector('[data-slot="qr-code-root"]')!;
  const frame = container.querySelector('[data-slot="qr-code-frame"]')!;
  const overlay = container.querySelector('[data-slot="qr-code-overlay"]')!;
  const trigger = container.querySelector('[data-slot="qr-code-download-trigger"]')!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['w-48', 'gap-4', 'text-primary']));
  expect([...frame.classList]).toEqual(expect.arrayContaining(['w-1/2']));
  expect([...overlay.classList]).toEqual(
    expect.arrayContaining(['size-control-xl', 'bg-muted', 'p-2']),
  );
  expect([...trigger.classList]).toEqual(
    expect.arrayContaining(['rounded-lg', 'bg-muted', 'px-2']),
  );
  await expect.element(page.locator('[data-slot="qr-code-root"]')).toHaveCSS('width', '192px');
  await expect.element(page.locator('[data-slot="qr-code-root"]')).toHaveCSS('gap', '16px');
  await expect.element(page.locator('[data-slot="qr-code-frame"]')).toHaveCSS('width', '96px');
  await expect.element(page.locator('[data-slot="qr-code-overlay"]')).toHaveCSS('width', '48px');
  await expect.element(page.locator('[data-slot="qr-code-overlay"]')).toHaveCSS('padding', '8px');
  await expect
    .element(page.locator('[data-slot="qr-code-download-trigger"]'))
    .toHaveCSS('padding-left', '8px');
});