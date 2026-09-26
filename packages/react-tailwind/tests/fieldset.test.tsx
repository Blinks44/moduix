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

test('renders the component-owned Tailwind defaults', () => {
  render(
    <Fieldset>
      <FieldsetLegend data-testid="legend">Account details</FieldsetLegend>
      <FieldsetHelperText data-testid="helper">Helpful details</FieldsetHelperText>
    </Fieldset>,
  );

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
  render(
    <Fieldset className="w-1/2 max-w-sm gap-2" data-testid="fieldset">
      <FieldsetLegend className="pb-0 text-sm" data-testid="legend">
        Account details
      </FieldsetLegend>
      <FieldsetHelperText className="text-primary" data-testid="helper">
        Helpful details
      </FieldsetHelperText>
    </Fieldset>,
  );

  expect(screen.getByTestId('fieldset')).toHaveClass('w-1/2', 'max-w-sm', 'gap-2');
  expect(screen.getByTestId('fieldset')).not.toHaveClass('w-full', 'max-w-none', 'gap-4');
  expect(screen.getByTestId('legend')).toHaveClass('pb-0', 'text-sm');
  expect(screen.getByTestId('legend')).not.toHaveClass('pb-3', 'text-lg');
  expect(screen.getByTestId('helper')).toHaveClass('text-primary');
  expect(screen.getByTestId('helper')).not.toHaveClass('text-muted-foreground');
});