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
  expect([...fieldset.classList]).toEqual(
    expect.arrayContaining(['flex', 'w-full', 'max-w-none', 'min-w-0', 'gap-4']),
  );
  expect([...screen.getByText('Contact details').classList]).toEqual(
    expect.arrayContaining([
      'inline-block',
      'max-w-full',
      'wrap-anywhere',
      'pb-3',
      'text-lg',
      'font-semibold',
      'text-foreground',
    ]),
  );
  expect([...helperText.classList]).toEqual(
    expect.arrayContaining(['wrap-anywhere', 'text-sm', 'text-muted-foreground']),
  );
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

test('lets consumer Tailwind classes override conflicting defaults', async () => {
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

  expect([...screen.getByTestId('fieldset').classList]).toEqual(
    expect.arrayContaining(['w-1/2', 'max-w-sm', 'gap-2']),
  );
  expect(
    ['w-full', 'max-w-none', 'gap-4'].some((name) =>
      screen.getByTestId('fieldset').classList.contains(name),
    ),
  ).toBe(false);
  expect([...screen.getByTestId('legend').classList]).toEqual(
    expect.arrayContaining(['pb-0', 'text-sm']),
  );
  expect(
    ['pb-3', 'text-lg'].some((name) => screen.getByTestId('legend').classList.contains(name)),
  ).toBe(false);
  expect([...screen.getByTestId('helper').classList]).toEqual(
    expect.arrayContaining(['text-primary']),
  );
  expect(screen.getByTestId('helper').classList.contains('text-muted-foreground')).toBe(false);
  await expect.element(page.locator('[data-slot="fieldset-root"]')).toHaveCSS('gap', '8px');
  await expect.element(page.locator('[data-slot="fieldset-root"]')).toHaveCSS('max-width', '384px');
});