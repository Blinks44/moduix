import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Stack } from '../src';

const isDesktop = () => window.matchMedia('(min-width: 640px)').matches;

test('renders a flex root with stable styling hooks', () => {
  render(<Stack data-part="custom" data-scope="custom" data-slot="custom" data-testid="stack" />);

  const stack = screen.getByTestId('stack');

  expect(stack.getAttribute('data-scope')).toBe('stack');
  expect(stack.getAttribute('data-part')).toBe('root');
  expect(stack.getAttribute('data-slot')).toBe('stack-root');
  expect(getComputedStyle(stack).display).toBe('flex');
  expect(getComputedStyle(stack).flexDirection).toBe('column');
});

test('writes flex props and reverse directions as root styles', () => {
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
    flexDirection: isDesktop() ? 'row-reverse' : 'column-reverse',
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

  const desktopOnly = getComputedStyle(screen.getByTestId('desktop-only'));

  expect(getComputedStyle(screen.getByTestId('string')).flexDirection).toBe('row');
  // The mobile branch is not rendered at the test viewport, so read the value it resolves to.
  expect(desktopOnly.getPropertyValue('--_stack-direction')).toBe('column');
  expect(desktopOnly.flexDirection).toBe(isDesktop() ? 'row' : 'column');
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

  expect(defaults.getAttribute('style')).toBeNull();
  expect(getComputedStyle(defaults).flex).toBe('0 1 auto');
  expect(overridden.style).toMatchObject({ flexWrap: 'nowrap', gap: '2rem' });
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