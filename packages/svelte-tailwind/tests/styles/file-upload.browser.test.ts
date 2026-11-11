import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import FileUploadOverride from './FileUploadOverride.svelte';

test('applies utility overrides and sizes empty visual parts', async () => {
  const { container } = render(FileUploadOverride);
  await expect.element(page.getByTestId('dropzone')).toBeVisible();
  const root = container.querySelector('[data-slot="file-upload-root"]')!;
  expect([...root.classList]).toEqual(expect.arrayContaining(['w-1/2', 'text-muted-foreground']));
  // Resolve color-mix tokens through real CSS instead of comparing their source strings.
  const colors = document.createElement('span');
  colors.style.cssText = 'background-color: var(--color-muted)';
  root.append(colors);
  const { backgroundColor } = getComputedStyle(colors);
  colors.remove();
  const dropzone = page.getByTestId('dropzone');
  await expect.element(dropzone).toHaveCSS('display', 'grid');
  await expect.element(dropzone).toHaveCSS('min-height', '128px');
  await expect.element(dropzone).toHaveCSS('border-top-style', 'dashed');
  await expect.element(dropzone).toHaveCSS('padding', '20px');
  for (const id of ['icon', 'preview']) {
    await expect.element(page.getByTestId(id)).toHaveCSS('display', 'flex');
    await expect.element(page.getByTestId(id)).toHaveCSS('width', '40px');
    await expect.element(page.getByTestId(id)).toHaveCSS('height', '40px');
  }
  const icon = root.querySelector('[data-testid="icon"]')!;
  expect(parseFloat(getComputedStyle(icon).borderTopLeftRadius)).toBeGreaterThanOrEqual(20);
  await expect.element(page.getByTestId('preview')).toHaveCSS('background-color', backgroundColor);
});