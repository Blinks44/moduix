import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Stack } from '@/index';

test('resolves responsive directions mobile-first', () => {
  render(
    <>
      <Stack direction="row" data-testid="string" />
      <Stack direction={{ desktop: 'row' }} data-testid="desktop-only" />
      <Stack direction={{ mobile: 'column-reverse' }} data-testid="mobile-only" />
    </>,
  );

  const responsiveClasses = (testId: string) =>
    [...screen.getByTestId(testId).classList].filter((name) => /^(sm:)?flex-(row|col)/.test(name));

  expect(responsiveClasses('string')).toEqual(['flex-row']);
  expect(responsiveClasses('desktop-only')).toEqual(['flex-col', 'sm:flex-row']);
  expect(responsiveClasses('mobile-only')).toEqual(['flex-col-reverse']);
  expect(getComputedStyle(screen.getByTestId('mobile-only')).flexDirection).toBe('column-reverse');
});

test('leaves optional layout styles unset and lets style override layout props', () => {
  render(
    <>
      <Stack data-testid="defaults" />
      <Stack
        direction="row"
        fill
        gap={12}
        wrap="wrap"
        style={{ gap: '2rem', flexWrap: 'nowrap' }}
        data-testid="overridden"
      />
    </>,
  );

  const defaults = screen.getByTestId('defaults');
  const overridden = screen.getByTestId('overridden');

  expect(defaults.style.gap).toBe('');
  expect(overridden.style).toMatchObject({ flexWrap: 'nowrap', gap: '2rem' });
});

test('renders a flex root with stable styling hooks and default utilities', () => {
  render(<Stack data-part="custom" data-scope="custom" data-slot="custom" data-testid="stack" />);

  const stack = screen.getByTestId('stack');

  expect(stack.getAttribute('data-scope')).toBe('stack');
  expect(stack.getAttribute('data-part')).toBe('root');
  expect(stack.getAttribute('data-slot')).toBe('stack-root');
  expect(getComputedStyle(stack).display).toBe('flex');
  expect(getComputedStyle(stack).flexDirection).toBe('column');
});

test('writes flex props and reverse directions as native utilities and root styles', () => {
  render(
    <Stack
      align="center"
      direction={{ mobile: 'column-reverse', desktop: 'row-reverse' }}
      fill
      gap={12}
      justify="space-between"
      wrap="wrap"
      data-testid="stack"
    />,
  );

  const stack = screen.getByTestId('stack');

  expect(stack.style).toMatchObject({
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'space-between',
  });
  expect(getComputedStyle(stack)).toMatchObject({
    display: 'flex',
    flexDirection: window.matchMedia('(min-width: 640px)').matches
      ? 'row-reverse'
      : 'column-reverse',
    flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
  });
});

test('lets consumer Tailwind utilities override fixed defaults', () => {
  render(<Stack direction="row" fill className="flex-none flex-col" data-testid="stack" />);
  const stack = screen.getByTestId('stack');

  expect([...stack.classList]).toEqual(expect.arrayContaining(['flex-none', 'flex-col']));
  expect(getComputedStyle(stack).flex).toBe('0 0 auto');
  expect(getComputedStyle(stack).flexDirection).toBe('column');
});