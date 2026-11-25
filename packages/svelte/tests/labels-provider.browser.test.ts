import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import LabelsProviderHarness from './labels-provider/LabelsProviderHarness.svelte';

test('overrides default a11y labels via LabelsProvider and ModuixProvider', async () => {
  render(LabelsProviderHarness);

  await expect.element(page.getByTestId('outer-close')).toHaveAttribute('aria-label', 'Fermer');
  await expect
    .element(page.getByTestId('outer-spinner'))
    .toHaveAttribute('aria-label', 'Chargement');
  await expect.element(page.getByTestId('inner-close')).toHaveAttribute('aria-label', 'Schliessen');
  await expect
    .element(page.getByTestId('inner-spinner'))
    .toHaveAttribute('aria-label', 'Chargement');
  await expect
    .element(page.getByTestId('explicit-close'))
    .toHaveAttribute('aria-label', 'Custom close');
  await expect.element(page.getByTestId('rtl-close')).toHaveAttribute('aria-label', 'إغلاق');
});