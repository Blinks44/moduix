import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import BasicHarness from '../../../svelte/tests/split-button/BasicHarness.svelte';

test('matches CSS Modules trigger padding and preserves all joined utilities with consumer overrides last', async () => {
  render(BasicHarness, {
    props: {
      popup: false,
      action: { class: 'rounded-md p-0 text-xs' },
      root: { 'aria-label': 'Project actions' },
    },
  });
  await expect
    .element(page.getByRole('button', { name: 'More actions' }))
    .toHaveCSS('padding-left', '12px');
  await expect
    .element(page.getByRole('button', { name: 'More actions' }))
    .toHaveCSS('padding-right', '12px');
});

test('lets consumers replace trigger padding without losing separator utilities', async () => {
  render(BasicHarness, {
    props: { popup: false, trigger: { size: 'lg', class: 'px-0 ms-0' } },
  });
  const trigger = screen.getByRole('button', { name: 'More actions' });
  await expect
    .element(page.getByRole('button', { name: 'More actions' }))
    .toHaveCSS('padding-left', '0px');
  await expect
    .element(page.getByRole('button', { name: 'More actions' }))
    .toHaveCSS('padding-right', '0px');
  expect(trigger.classList.contains('ms-0')).toBe(true);
});