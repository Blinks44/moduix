import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRootProvider,
} from '@/index';

const checkboxComponents = {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRootProvider,
};

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render({
    components: checkboxComponents,
    template: `
      <Checkbox class="gap-4 text-primary" data-testid="root">
        <CheckboxControl class="rounded-md bg-muted p-1" />
        <CheckboxLabel>Notifications</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    `,
  });
  const root = screen.getByTestId('root');
  const control = root.querySelector('[data-slot="checkbox-control"]')!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  expect([...control.classList]).toEqual(expect.arrayContaining(['rounded-md', 'bg-muted', 'p-1']));
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '16px');
  await expect
    .element(page.locator('[data-slot="checkbox-control"]'))
    .toHaveCSS('padding-left', '4px');
});