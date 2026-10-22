import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Stack } from '../src';

test('renders a flex root with stable styling hooks and default utilities', () => {
  render(<Stack data-part="custom" data-scope="custom" data-slot="custom" data-testid="stack" />);

  const stack = screen.getByTestId('stack');

  expect(stack.getAttribute('data-scope')).toBe('stack');
  expect(stack.getAttribute('data-part')).toBe('root');
  expect(stack.getAttribute('data-slot')).toBe('stack-root');
  expect([...stack.classList]).toEqual(expect.arrayContaining(['flex', 'flex-col']));
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

  expect([...stack.classList]).toEqual(
    expect.arrayContaining(['flex', 'flex-col-reverse', 'sm:flex-row-reverse', 'flex-1']),
  );
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

test('does not pass direction or fill to nested roots', () => {
  render(
    <Stack direction="row" fill data-testid="outer">
      <Stack data-testid="inner" />
    </Stack>,
  );

  const inner = screen.getByTestId('inner');

  expect(getComputedStyle(inner).flexDirection).toBe('column');
  expect(getComputedStyle(inner).flexGrow).toBe('0');
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
  expect([...overridden.classList]).toEqual(expect.arrayContaining(['flex-row', 'flex-1']));
  expect(overridden.style).toMatchObject({ flexWrap: 'nowrap', gap: '2rem' });
});

test('lets consumer Tailwind utilities override fixed defaults', () => {
  render(<Stack direction="row" fill className="flex-none flex-col" data-testid="stack" />);
  const stack = screen.getByTestId('stack');

  expect([...stack.classList]).toEqual(expect.arrayContaining(['flex-none', 'flex-col']));
  expect([...stack.classList]).not.toContain('flex-1');
  expect([...stack.classList]).not.toContain('flex-row');
  expect(getComputedStyle(stack).flex).toBe('0 0 auto');
  expect(getComputedStyle(stack).flexDirection).toBe('column');
});

test('forwards an HTMLElement ref and merges root props onto an asChild element', () => {
  const ref = createRef<HTMLElement>();

  render(
    <Stack asChild ref={ref} gap={12} className="stack-class">
      <section aria-label="Project updates" className="section-class" style={{ color: 'red' }} />
    </Stack>,
  );

  const section = screen.getByRole('region', { name: 'Project updates' });

  expect(ref.current).toBe(section);
  expect(section.style.gap).toBe('12px');
  expect([...section.classList]).toEqual(expect.arrayContaining(['section-class', 'stack-class']));
  expect(section.style).toMatchObject({ color: 'red' });
  expect(section.getAttribute('data-slot')).toBe('stack-root');
});