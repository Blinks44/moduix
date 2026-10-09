import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
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
  const [invalid, setInvalid] = createSignal(false);
  render(() => (
    <Fieldset invalid={invalid()}>
      <>
        <FieldsetLegend>Contact details</FieldsetLegend>
        <FieldsetHelperText>We only use these details to contact you.</FieldsetHelperText>
        <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
      </>
    </Fieldset>
  ));
  const fieldset = screen.getByRole('group', { name: 'Contact details' });
  const helperText = screen.getByText('We only use these details to contact you.');
  await expect
    .element(page.getByRole('group', { name: 'Contact details' }))
    .not.toHaveAttribute('data-invalid');
  const textLocator = page.getByText('Enter a valid email address.', { exact: true });
  await expect.element(textLocator).toHaveCount(0);
  setInvalid(true);
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
  render(() => (
    <Fieldset disabled>
      <FieldsetLegend>Shipping address</FieldsetLegend>
      <input aria-label="Street" />
    </Fieldset>
  ));

  await expect.element(page.getByRole('textbox', { name: 'Street', exact: true })).toBeDisabled();
});

test('forwards refs through native parts', () => {
  let rootRef!: HTMLFieldSetElement;
  let legendRef!: HTMLLegendElement;

  render(() => (
    <Fieldset ref={(element) => (rootRef = element)}>
      <FieldsetLegend ref={(element) => (legendRef = element)}>Account details</FieldsetLegend>
    </Fieldset>
  ));

  expect(rootRef.getAttribute('data-slot')).toBe('fieldset-root');
  expect(legendRef.getAttribute('data-slot')).toBe('fieldset-legend');
});

test('preserves native asChild composition without forwarding refs through Ark Solid', async () => {
  let rootRef: HTMLFieldSetElement | undefined;
  let legendRef: HTMLLegendElement | undefined;

  render(() => (
    <Fieldset asChild={(props) => <fieldset {...props()} />} ref={(element) => (rootRef = element)}>
      <FieldsetLegend
        asChild={(props) => <legend {...props()} />}
        ref={(element) => (legendRef = element)}
      >
        Account details
      </FieldsetLegend>
    </Fieldset>
  ));

  const fieldset = screen.getByRole('group', { name: 'Account details' });

  expect(fieldset.tagName).toBe('FIELDSET');
  await expect
    .element(page.getByRole('group', { name: 'Account details', exact: true }))
    .toHaveAttribute('data-slot', 'fieldset-root');
  await expect
    .element(page.getByText('Account details', { exact: true }))
    .toHaveAttribute('data-slot', 'fieldset-legend');
  expect(rootRef).toBeUndefined();
  expect(legendRef).toBeUndefined();
});

function ContextState() {
  const fieldset = useFieldsetContext();

  return <output data-testid="hook-state">{String(fieldset().invalid)}</output>;
}

function ExternalFieldsetState() {
  const fieldset = useFieldset({ invalid: true });

  return (
    <FieldsetRootProvider value={fieldset}>
      <FieldsetLegend>Account details</FieldsetLegend>
      <FieldsetContext>
        {(context) => <output data-testid="render-prop-state">{String(context().invalid)}</output>}
      </FieldsetContext>
      <ContextState />
    </FieldsetRootProvider>
  );
}

test('keeps RootProvider and state context exports Ark-shaped', async () => {
  render(() => <ExternalFieldsetState />);

  await expect
    .element(page.getByRole('group', { name: 'Account details', exact: true }))
    .toHaveAttribute('data-slot', 'fieldset-root-provider');
  await expect.element(page.getByTestId('render-prop-state')).toContainText('true');
  await expect.element(page.getByTestId('hook-state')).toContainText('true');
});