import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Stack } from '@/index';

const isDesktop = () => window.matchMedia('(min-width: 640px)').matches;

test('renders a flex root with stable styling hooks', () => {
  let ref!: HTMLDivElement;
  render(() => (
    <Stack
      ref={(element) => (ref = element)}
      data-part="custom"
      data-scope="custom"
      data-slot="custom"
      data-testid="stack"
    />
  ));

  const stack = screen.getByTestId('stack');

  expect(stack.getAttribute('data-scope')).toBe('stack');
  expect(stack.getAttribute('data-part')).toBe('root');
  expect(stack.getAttribute('data-slot')).toBe('stack-root');
  expect(ref).toBe(stack);
  expect(getComputedStyle(stack).display).toBe('flex');
  expect(getComputedStyle(stack).flexDirection).toBe('column');
});

test('writes flex props and reverse directions as root styles', () => {
  render(() => (
    <Stack
      align="center"
      direction={{ mobile: 'column-reverse', desktop: 'row-reverse' }}
      fill
      gap={12}
      justify="space-between"
      wrap="wrap"
      data-testid="stack"
    />
  ));

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
  render(() => (
    <>
      <Stack direction="row" data-testid="string" />
      <Stack direction={{ desktop: 'row' }} data-testid="desktop-only" />
      <Stack direction={{ mobile: 'column-reverse' }} data-testid="mobile-only" />
    </>
  ));

  const desktopOnly = getComputedStyle(screen.getByTestId('desktop-only'));

  expect(getComputedStyle(screen.getByTestId('string')).flexDirection).toBe('row');
  // The mobile branch is not rendered at the test viewport, so read the value it resolves to.
  expect(desktopOnly.getPropertyValue('--_stack-direction')).toBe('column');
  expect(desktopOnly.flexDirection).toBe(isDesktop() ? 'row' : 'column');
  expect(getComputedStyle(screen.getByTestId('mobile-only')).flexDirection).toBe('column-reverse');
});

test('leaves optional layout styles unset and lets style override layout props', () => {
  render(() => (
    <>
      <Stack data-testid="defaults" />
      <Stack
        direction="row"
        fill
        gap={12}
        wrap="wrap"
        style={{ gap: '2rem', 'flex-wrap': 'nowrap' }}
        data-testid="overridden"
      />
      <Stack direction="row" gap={12} style="gap: 2rem" data-testid="string-style" />
    </>
  ));

  const defaults = screen.getByTestId('defaults');
  const stringStyle = screen.getByTestId('string-style');

  expect(defaults.style.length).toBe(0);
  expect(getComputedStyle(defaults).flex).toBe('0 1 auto');
  expect(screen.getByTestId('overridden').style).toMatchObject({ flexWrap: 'nowrap', gap: '2rem' });
  expect(stringStyle.style.gap).toBe('2rem');
  expect(getComputedStyle(stringStyle).flexDirection).toBe('row');
});