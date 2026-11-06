import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import EmptyPartsFloatingPanel from '../../../svelte/tests/floating-panel/EmptyPartsFloatingPanel.svelte';

test('keeps consumer classes last on component parts and utility classes on empty parts', async () => {
  render(EmptyPartsFloatingPanel);
  const content = screen.getByRole('dialog');
  expect([...content.classList]).toEqual(expect.arrayContaining(['rounded-none', 'bg-muted']));

  await expect
    .element(page.locator('[data-slot="floating-panel-content"]'))
    .toHaveCSS('border-radius', '0px');
});