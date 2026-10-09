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

test('cross-falls back responsive directions when only one breakpoint is provided', () => {
  render(
    <>
      <Stack direction={{ desktop: 'row' }} data-testid="desktop-only" />
      <Stack direction={{ mobile: 'column-reverse' }} data-testid="mobile-only" />
    </>,
  );

  const desktopOnly = screen.getByTestId('desktop-only');
  const mobileOnly = screen.getByTestId('mobile-only');

  expect([...desktopOnly.classList]).toEqual(expect.arrayContaining(['flex-row', 'sm:flex-row']));
  expect([...mobileOnly.classList]).toEqual(
    expect.arrayContaining(['flex-col-reverse', 'sm:flex-col-reverse']),
  );
  expect(getComputedStyle(desktopOnly).flexDirection).toBe('row');
  expect(getComputedStyle(mobileOnly).flexDirection).toBe('column-reverse');
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
  expect([...overridden.classList]).toEqual(
    expect.arrayContaining(['flex-row', 'sm:flex-row', 'flex-1']),
  );
  expect(overridden.style).toMatchObject({ flexWrap: 'nowrap', gap: '2rem' });
});

test('lets consumer Tailwind utilities override fixed defaults', () => {
  render(<Stack direction="row" fill className="flex-none flex-col" data-testid="stack" />);
  const stack = screen.getByTestId('stack');

  expect([...stack.classList]).toEqual(expect.arrayContaining(['flex-none', 'flex-col']));
  expect([...stack.classList]).not.toContain('flex-1');
  expect([...stack.classList]).not.toContain('flex-row');
  expect(getComputedStyle(stack).flex).toBe('0 0 auto');
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