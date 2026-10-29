import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import { SplitButton, SplitButtonAction, SplitButtonTrigger } from '@/index';

test('keeps component-owned utilities visible and lets consumers replace conflicts', async () => {
  render(() => (
    <SplitButton aria-label="Project actions">
      <SplitButtonAction class="rounded-md p-0 text-xs">Save</SplitButtonAction>
      <SplitButtonTrigger size="lg" class="px-0" />
    </SplitButton>
  ));

  await expect
    .element(page.getByRole('button', { name: 'More actions' }))
    .toHaveCSS('padding-left', '0px');
  await expect
    .element(page.getByRole('button', { name: 'More actions' }))
    .toHaveCSS('padding-right', '0px');
});