import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Stack } from '../src';

test('renders a flex root with stable styling hooks and default utilities', () => {
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
  expect([...stack.classList]).toEqual(expect.arrayContaining(['flex', 'flex-col']));
  expect(ref).toBe(stack);
  expect(getComputedStyle(stack).display).toBe('flex');
  expect(getComputedStyle(stack).flexDirection).toBe('column');
});

test('writes flex props and reverse directions as native utilities and root styles', () => {
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
  render(() => (
    <>
      <Stack direction={{ desktop: 'row' }} data-testid="desktop-only" />
      <Stack direction={{ mobile: 'column-reverse' }} data-testid="mobile-only" />
    </>
  ));

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
    </>
  ));

  const defaults = screen.getByTestId('defaults');
  const overridden = screen.getByTestId('overridden');

  expect(defaults.style.gap).toBe('');
  expect([...overridden.classList]).toEqual(
    expect.arrayContaining(['flex-row', 'sm:flex-row', 'flex-1']),
  );
  expect(overridden.style).toMatchObject({ flexWrap: 'nowrap', gap: '2rem' });
});

test('lets consumer Tailwind utilities override fixed defaults', () => {
  render(() => <Stack direction="row" fill class="flex-none flex-col" data-testid="stack" />);
  const stack = screen.getByTestId('stack');

  expect([...stack.classList]).toEqual(expect.arrayContaining(['flex-none', 'flex-col']));
  expect([...stack.classList]).not.toContain('flex-1');
  expect([...stack.classList]).not.toContain('flex-row');
  expect(getComputedStyle(stack).flex).toBe('0 0 auto');
});

test('merges root props onto an asChild element without forwarding the root ref', () => {
  let rootRef: HTMLDivElement | undefined;
  let childRef!: HTMLElement;

  render(() => (
    <Stack
      asChild={(props) => (
        <section
          {...props({ class: 'section-class' })}
          ref={(element) => (childRef = element)}
          aria-label="Project updates"
        />
      )}
      ref={(element) => (rootRef = element)}
      gap={12}
      class="stack-class"
      style={{ color: 'red' }}
    />
  ));

  const section = screen.getByRole('region', { name: 'Project updates' });

  expect(rootRef).toBeUndefined();
  expect(childRef).toBe(section);
  expect(section.style.gap).toBe('12px');
  expect([...section.classList]).toEqual(expect.arrayContaining(['section-class', 'stack-class']));
  expect(section.style).toMatchObject({ color: 'red' });
  expect(section.getAttribute('data-slot')).toBe('stack-root');
});