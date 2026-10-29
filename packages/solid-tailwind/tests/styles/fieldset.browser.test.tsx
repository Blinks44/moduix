import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(() => (
    <Fieldset class="w-1/2 max-w-sm gap-2" data-testid="fieldset">
      <FieldsetLegend class="pb-0 text-sm" data-testid="legend">
        Account details
      </FieldsetLegend>
      <FieldsetHelperText class="text-primary" data-testid="helper">
        Helpful details
      </FieldsetHelperText>
    </Fieldset>
  ));

  expect([...screen.getByTestId('fieldset').classList]).toEqual(
    expect.arrayContaining(['w-1/2', 'max-w-sm', 'gap-2']),
  );
  expect([...screen.getByTestId('legend').classList]).toEqual(
    expect.arrayContaining(['pb-0', 'text-sm']),
  );
  expect([...screen.getByTestId('helper').classList]).toEqual(
    expect.arrayContaining(['text-primary']),
  );
  await expect.element(page.locator('[data-slot="fieldset-root"]')).toHaveCSS('gap', '8px');
  await expect.element(page.locator('[data-slot="fieldset-root"]')).toHaveCSS('max-width', '384px');
});