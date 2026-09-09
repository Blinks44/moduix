import { expect, test } from '@rstest/core';
import { render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Fieldset, useFieldset, useFieldsetContext } from '../src';

test('connects the legend, description, and error text to the native fieldset', () => {
  render(() => (
    <Fieldset invalid>
      <Fieldset.Legend>Contact details</Fieldset.Legend>
      <Fieldset.HelperText>We only use these details to contact you.</Fieldset.HelperText>
      <Fieldset.ErrorText>Enter a valid email address.</Fieldset.ErrorText>
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
      <Fieldset.ErrorText>Enter a valid email address.</Fieldset.ErrorText>
    </Fieldset>
  ));

  expect(screen.queryByText('Enter a valid email address.')).not.toBeInTheDocument();

  setInvalid(true);

  await waitFor(() => expect(screen.getByText('Enter a valid email address.')).toBeVisible());
});

test('disables native descendants', () => {
  render(() => (
    <Fieldset disabled>
      <Fieldset.Legend>Shipping address</Fieldset.Legend>
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
      <Fieldset.Legend ref={(element) => (legendRef = element)}>Account details</Fieldset.Legend>
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
      <Fieldset.Legend
        asChild={(props) => <legend {...props()} />}
        ref={(element) => (legendRef = element)}
      >
        Account details
      </Fieldset.Legend>
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
    <Fieldset.RootProvider value={fieldset}>
      <Fieldset.Legend>Account details</Fieldset.Legend>
      <Fieldset.Context>
        {(context) => <output data-testid="render-prop-state">{String(context().invalid)}</output>}
      </Fieldset.Context>
      <ContextState />
    </Fieldset.RootProvider>
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

test('renders the component-owned Tailwind defaults', () => {
  render(() => (
    <Fieldset>
      <Fieldset.Legend data-testid="legend">Account details</Fieldset.Legend>
      <Fieldset.HelperText data-testid="helper">Helpful details</Fieldset.HelperText>
    </Fieldset>
  ));

  expect(screen.getByRole('group')).toHaveClass('flex', 'w-full', 'max-w-none', 'min-w-0', 'gap-4');
  expect(screen.getByTestId('legend')).toHaveClass(
    'inline-block',
    'max-w-full',
    'wrap-anywhere',
    'pb-3',
    'text-lg',
    'font-semibold',
    'text-foreground',
  );
  expect(screen.getByTestId('helper')).toHaveClass(
    'wrap-anywhere',
    'text-sm',
    'text-muted-foreground',
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <Fieldset class="w-1/2 max-w-sm gap-2" data-testid="fieldset">
      <Fieldset.Legend class="pb-0 text-sm" data-testid="legend">
        Account details
      </Fieldset.Legend>
      <Fieldset.HelperText class="text-primary" data-testid="helper">
        Helpful details
      </Fieldset.HelperText>
    </Fieldset>
  ));

  expect(screen.getByTestId('fieldset')).toHaveClass('w-1/2', 'max-w-sm', 'gap-2');
  expect(screen.getByTestId('fieldset')).not.toHaveClass('w-full', 'max-w-none', 'gap-4');
  expect(screen.getByTestId('legend')).toHaveClass('pb-0', 'text-sm');
  expect(screen.getByTestId('legend')).not.toHaveClass('pb-3', 'text-lg');
  expect(screen.getByTestId('helper')).toHaveClass('text-primary');
  expect(screen.getByTestId('helper')).not.toHaveClass('text-muted-foreground');
});