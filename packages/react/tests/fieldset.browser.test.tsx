import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  Fieldset,
  FieldsetContext,
  FieldsetErrorText,
  FieldsetHelperText,
  FieldsetLegend,
  FieldsetRootProvider,
  useFieldset,
  useFieldsetContext,
} from '../src';

test('updates invalid state and connects legend, description, and error text', async () => {
  const content = (
    <>
      <FieldsetLegend>Contact details</FieldsetLegend>
      <FieldsetHelperText>We only use these details to contact you.</FieldsetHelperText>
      <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
    </>
  );
  const { rerender } = render(<Fieldset invalid={false}>{content}</Fieldset>);
  const fieldset = screen.getByRole('group', { name: 'Contact details' });
  const helperText = screen.getByText('We only use these details to contact you.');
  await expect
    .element(page.getByRole('group', { name: 'Contact details' }))
    .not.toHaveAttribute('data-invalid');
  const textLocator = page.getByText('Enter a valid email address.', { exact: true });
  await expect.element(textLocator).toHaveCount(0);
  rerender(<Fieldset invalid>{content}</Fieldset>);
  await expect.element(textLocator).toBeVisible();
  const errorText = screen.getByText('Enter a valid email address.');
  await expect
    .element(page.getByRole('group', { name: 'Contact details' }))
    .toHaveAttribute('data-invalid');
  await expect.poll(() => fieldset.getAttribute('aria-describedby')).toContain(helperText.id);
  await expect.poll(() => fieldset.getAttribute('aria-describedby')).toContain(errorText.id);
  await expect.element(textLocator).toHaveAttribute('aria-live', 'polite');
});

test('disables native descendants', async () => {
  render(
    <Fieldset disabled>
      <FieldsetLegend>Shipping address</FieldsetLegend>
      <input aria-label="Street" />
    </Fieldset>,
  );

  await expect.element(page.getByRole('textbox', { name: 'Street', exact: true })).toBeDisabled();
});

test('preserves native composition and forwards refs through asChild', () => {
  const rootRef = createRef<HTMLFieldSetElement>();
  const legendRef = createRef<HTMLLegendElement>();

  render(
    <Fieldset asChild ref={rootRef}>
      <fieldset>
        <FieldsetLegend asChild ref={legendRef}>
          <legend>Account details</legend>
        </FieldsetLegend>
      </fieldset>
    </Fieldset>,
  );

  expect(rootRef.current).toBe(screen.getByRole('group', { name: 'Account details' }));
  expect(rootRef.current!.getAttribute('data-slot')).toBe('fieldset-root');
  expect(legendRef.current!.getAttribute('data-slot')).toBe('fieldset-legend');
});

function ContextState() {
  const { invalid } = useFieldsetContext();

  return <output data-testid="hook-state">{String(invalid)}</output>;
}

function ExternalFieldsetState() {
  const fieldset = useFieldset({ invalid: true });

  return (
    <FieldsetRootProvider value={fieldset}>
      <FieldsetLegend>Account details</FieldsetLegend>
      <FieldsetContext>
        {({ invalid }) => <output data-testid="render-prop-state">{String(invalid)}</output>}
      </FieldsetContext>
      <ContextState />
    </FieldsetRootProvider>
  );
}

test('keeps RootProvider and state context exports Ark-shaped', async () => {
  render(<ExternalFieldsetState />);

  await expect
    .element(page.getByRole('group', { name: 'Account details', exact: true }))
    .toHaveAttribute('data-slot', 'fieldset-root-provider');
  await expect.element(page.getByTestId('render-prop-state')).toContainText('true');
  await expect.element(page.getByTestId('hook-state')).toContainText('true');
});