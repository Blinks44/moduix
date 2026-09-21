import { expect, test } from '@rstest/core';
import { render, screen, waitFor } from '@solidjs/testing-library';
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

test('connects the legend, description, and error text to the native fieldset', () => {
  render(() => (
    <Fieldset invalid>
      <FieldsetLegend>Contact details</FieldsetLegend>
      <FieldsetHelperText>We only use these details to contact you.</FieldsetHelperText>
      <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
    </Fieldset>
  ));

  const fieldset = screen.getByRole('group', { name: 'Contact details' });
  const helperText = screen.getByText('We only use these details to contact you.');
  const errorText = screen.getByText('Enter a valid email address.');

  expect(fieldset).toHaveAttribute('data-invalid');
  expect(fieldset.getAttribute('aria-describedby')).toContain(helperText.id);
  expect(fieldset.getAttribute('aria-describedby')).toContain(errorText.id);
  expect(errorText).toHaveAttribute('aria-live', 'polite');
});

test('renders error text only while invalid', async () => {
  const [invalid, setInvalid] = createSignal(false);

  render(() => (
    <Fieldset invalid={invalid()}>
      <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
    </Fieldset>
  ));

  expect(screen.queryByText('Enter a valid email address.')).not.toBeInTheDocument();

  setInvalid(true);

  await waitFor(() => expect(screen.getByText('Enter a valid email address.')).toBeVisible());
});

test('disables native descendants', () => {
  render(() => (
    <Fieldset disabled>
      <FieldsetLegend>Shipping address</FieldsetLegend>
      <input aria-label="Street" />
    </Fieldset>
  ));

  expect(screen.getByRole('textbox', { name: 'Street' })).toBeDisabled();
});

test('forwards refs through native parts', () => {
  let rootRef!: HTMLFieldSetElement;
  let legendRef!: HTMLLegendElement;

  render(() => (
    <Fieldset ref={(element) => (rootRef = element)}>
      <FieldsetLegend ref={(element) => (legendRef = element)}>Account details</FieldsetLegend>
    </Fieldset>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'fieldset-root');
  expect(legendRef).toHaveAttribute('data-slot', 'fieldset-legend');
});

test('preserves native asChild composition without forwarding refs through Ark Solid', () => {
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
  const legend = screen.getByText('Account details');

  expect(fieldset.tagName).toBe('FIELDSET');
  expect(fieldset).toHaveAttribute('data-slot', 'fieldset-root');
  expect(legend).toHaveAttribute('data-slot', 'fieldset-legend');
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

test('keeps RootProvider and state context exports Ark-shaped', () => {
  render(() => <ExternalFieldsetState />);

  expect(screen.getByRole('group', { name: 'Account details' })).toHaveAttribute(
    'data-slot',
    'fieldset-root-provider',
  );
  expect(screen.getByTestId('render-prop-state')).toHaveTextContent('true');
  expect(screen.getByTestId('hook-state')).toHaveTextContent('true');
});
