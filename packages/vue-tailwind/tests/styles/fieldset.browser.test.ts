import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import {
  Fieldset,
  FieldsetContext,
  FieldsetErrorText,
  FieldsetHelperText,
  FieldsetLegend,
  FieldsetRootProvider,
} from '@/index';

const fieldsetComponents = {
  Fieldset,
  FieldsetContext,
  FieldsetErrorText,
  FieldsetHelperText,
  FieldsetLegend,
  FieldsetRootProvider,
};

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render({
    components: fieldsetComponents,
    template: `
      <Fieldset class="gap-2 max-w-64">
        <FieldsetLegend class="text-primary">Styled fieldset</FieldsetLegend>
        <FieldsetHelperText class="text-primary">Visible to project members.</FieldsetHelperText>
      </Fieldset>
    `,
  });

  const fieldset = screen.getByRole('group', { name: 'Styled fieldset' });
  expect([...fieldset.classList]).toEqual(expect.arrayContaining(['gap-2', 'max-w-64']));
  expect([
    ...screen.getByRole('group', { name: 'Styled fieldset' }).querySelector('legend')!.classList,
  ]).toEqual(expect.arrayContaining(['text-primary']));
  await expect.element(page.locator('[data-slot="fieldset-root"]')).toHaveCSS('gap', '8px');
  await expect.element(page.locator('[data-slot="fieldset-root"]')).toHaveCSS('max-width', '256px');
});