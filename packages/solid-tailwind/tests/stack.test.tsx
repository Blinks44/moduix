import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Stack } from '../src';

test('renders a flex root with stable styling hooks and default utilities', () => {
  render(() => (
    <Stack data-part="custom" data-scope="custom" data-slot="custom" data-testid="stack" />
  ));

  const stack = screen.getByTestId('stack');

  expect(stack).toHaveAttribute('data-scope', 'stack');
  expect(stack).toHaveAttribute('data-part', 'root');
  expect(stack).toHaveAttribute('data-slot', 'stack-root');
  expect(stack).toHaveClass('flex', 'flex-col');
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

  expect(stack).toHaveClass('flex', 'flex-col-reverse', 'sm:flex-row-reverse', 'flex-1');
  expect(stack).toHaveStyle({
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'space-between',
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

  expect(desktopOnly).toHaveClass('flex-row', 'sm:flex-row');
  expect(mobileOnly).toHaveClass('flex-col-reverse', 'sm:flex-col-reverse');
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
  expect(overridden).toHaveClass('flex-row', 'sm:flex-row', 'flex-1');
  expect(overridden).toHaveStyle({ flexWrap: 'nowrap', gap: '2rem' });
});

test('lets consumer Tailwind utilities override fixed defaults', () => {
  render(() => <Stack direction="row" fill class="flex-none flex-col" data-testid="stack" />);
  const stack = screen.getByTestId('stack');

  expect(stack).toHaveClass('flex-none', 'flex-col');
  expect(stack).not.toHaveClass('flex-1', 'flex-row');
});

test('forwards a ref through the ordinary Ark Solid root path', () => {
  let ref!: HTMLDivElement;

  render(() => <Stack ref={(element) => (ref = element)} data-testid="stack" />);

  expect(ref).toBe(screen.getByTestId('stack'));
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
  expect(section).toHaveClass('section-class', 'stack-class');
  expect(section).toHaveStyle({ color: 'red' });
  expect(section).toHaveAttribute('data-slot', 'stack-root');
});