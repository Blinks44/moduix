import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Fieldset, useFieldset, useFieldsetContext } from '../src';

test('connects the legend, description, and error text to the native fieldset', () => {
  render(
    <Fieldset invalid>
      <Fieldset.Legend>Contact details</Fieldset.Legend>
      <Fieldset.HelperText>We only use these details to contact you.</Fieldset.HelperText>
      <Fieldset.ErrorText>Enter a valid email address.</Fieldset.ErrorText>
    </Fieldset>,
  );

  const fieldset = screen.getByRole('group', { name: 'Contact details' });
  const helperText = screen.getByText('We only use these details to contact you.');
  const errorText = screen.getByText('Enter a valid email address.');

  expect(fieldset).toHaveAttribute('data-invalid');
  expect(fieldset.getAttribute('aria-describedby')).toContain(helperText.id);
  expect(fieldset.getAttribute('aria-describedby')).toContain(errorText.id);
  expect(errorText).toHaveAttribute('aria-live', 'polite');
});

test('renders error text only while invalid', () => {
  const { rerender } = render(
    <Fieldset>
      <Fieldset.ErrorText>Enter a valid email address.</Fieldset.ErrorText>
    </Fieldset>,
  );

  expect(screen.queryByText('Enter a valid email address.')).not.toBeInTheDocument();

  rerender(
    <Fieldset invalid>
      <Fieldset.ErrorText>Enter a valid email address.</Fieldset.ErrorText>
    </Fieldset>,
  );

  expect(screen.getByText('Enter a valid email address.')).toBeVisible();
});

test('disables native descendants', () => {
  render(
    <Fieldset disabled>
      <Fieldset.Legend>Shipping address</Fieldset.Legend>
      <input aria-label="Street" />
    </Fieldset>,
  );

  expect(screen.getByRole('textbox', { name: 'Street' })).toBeDisabled();
});

test('preserves native composition and forwards refs through asChild', () => {
  const rootRef = createRef<HTMLFieldSetElement>();
  const legendRef = createRef<HTMLLegendElement>();

  render(
    <Fieldset asChild ref={rootRef}>
      <fieldset>
        <Fieldset.Legend asChild ref={legendRef}>
          <legend>Account details</legend>
        </Fieldset.Legend>
      </fieldset>
    </Fieldset>,
  );

  expect(rootRef.current).toBe(screen.getByRole('group', { name: 'Account details' }));
  expect(rootRef.current).toHaveAttribute('data-slot', 'fieldset-root');
  expect(legendRef.current).toHaveAttribute('data-slot', 'fieldset-legend');
});

function ContextState() {
  const { invalid } = useFieldsetContext();

  return <output data-testid="hook-state">{String(invalid)}</output>;
}

function ExternalFieldsetState() {
  const fieldset = useFieldset({ invalid: true });

  return (
    <Fieldset.RootProvider value={fieldset}>
      <Fieldset.Legend>Account details</Fieldset.Legend>
      <Fieldset.Context>
        {({ invalid }) => <output data-testid="render-prop-state">{String(invalid)}</output>}
      </Fieldset.Context>
      <ContextState />
    </Fieldset.RootProvider>
  );
}

test('keeps RootProvider and state context exports Ark-shaped', () => {
  render(<ExternalFieldsetState />);

  expect(screen.getByRole('group', { name: 'Account details' })).toHaveAttribute(
    'data-slot',
    'fieldset-root-provider',
  );
  expect(screen.getByTestId('render-prop-state')).toHaveTextContent('true');
  expect(screen.getByTestId('hook-state')).toHaveTextContent('true');
});