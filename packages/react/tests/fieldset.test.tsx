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

test('connects the legend, description, and error text to the native fieldset', () => {
  render(
    <Fieldset invalid>
      <FieldsetLegend>Contact details</FieldsetLegend>
      <FieldsetHelperText>We only use these details to contact you.</FieldsetHelperText>
      <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
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
      <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
    </Fieldset>,
  );

  expect(screen.queryByText('Enter a valid email address.')).not.toBeInTheDocument();

  rerender(
    <Fieldset invalid>
      <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
    </Fieldset>,
  );

  expect(screen.getByText('Enter a valid email address.')).toBeVisible();
});

test('disables native descendants', () => {
  render(
    <Fieldset disabled>
      <FieldsetLegend>Shipping address</FieldsetLegend>
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
        <FieldsetLegend asChild ref={legendRef}>
          <legend>Account details</legend>
        </FieldsetLegend>
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
    <FieldsetRootProvider value={fieldset}>
      <FieldsetLegend>Account details</FieldsetLegend>
      <FieldsetContext>
        {({ invalid }) => <output data-testid="render-prop-state">{String(invalid)}</output>}
      </FieldsetContext>
      <ContextState />
    </FieldsetRootProvider>
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