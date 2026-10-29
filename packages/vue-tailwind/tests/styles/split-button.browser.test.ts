import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import {
  MenuItem,
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
} from '@/index';

const components = {
  MenuItem,
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  SplitButtonPositioner,
  SplitButtonContent,
};

test('matches CSS Modules trigger padding and preserves all joined utilities with consumer overrides last', async () => {
  render({
    components,
    template:
      '<SplitButton aria-label="Project actions"><SplitButtonAction class="rounded-md p-0 text-xs">Save</SplitButtonAction><SplitButtonTrigger /></SplitButton>',
  });
  await expect
    .element(page.getByRole('button', { name: 'More actions' }))
    .toHaveCSS('padding-left', '12px');
  await expect
    .element(page.getByRole('button', { name: 'More actions' }))
    .toHaveCSS('padding-right', '12px');
});

test('lets consumers replace trigger padding without losing separator utilities', async () => {
  render({
    components,
    template:
      '<SplitButton><SplitButtonAction>Save</SplitButtonAction><SplitButtonTrigger size="lg" class="px-0 ms-0" /></SplitButton>',
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