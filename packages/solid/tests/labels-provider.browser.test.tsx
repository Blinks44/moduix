import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import { CloseButton, LabelsProvider, ModuixProvider, Spinner } from '@/index';

test('overrides default a11y labels via LabelsProvider and merges nested providers', async () => {
  render(() => (
    <LabelsProvider labels={{ close: 'Fermer', loading: 'Chargement' }}>
      <CloseButton data-testid="outer-close" />
      <Spinner data-testid="outer-spinner" />
      <LabelsProvider labels={{ close: 'Schliessen' }}>
        <CloseButton data-testid="inner-close" />
        <Spinner data-testid="inner-spinner" />
        <CloseButton data-testid="explicit-close" aria-label="Custom close" />
      </LabelsProvider>
    </LabelsProvider>
  ));

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
});

test('ModuixProvider configures both locale and a11y labels', async () => {
  render(() => (
    <ModuixProvider locale="ar-SA" labels={{ close: 'إغلاق' }}>
      <CloseButton data-testid="rtl-close" />
    </ModuixProvider>
  ));

  await expect.element(page.getByTestId('rtl-close')).toHaveAttribute('aria-label', 'إغلاق');
});