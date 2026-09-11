import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Stack } from '../src';

test('renders a flex root with stable styling hooks', () => {
  render(() => (
    <Stack data-part="custom" data-scope="custom" data-slot="custom" data-testid="stack" />
  ));

  const stack = screen.getByTestId('stack');

  expect(stack).toHaveAttribute('data-scope', 'stack');
  expect(stack).toHaveAttribute('data-part', 'root');
  expect(stack).toHaveAttribute('data-slot', 'stack-root');
});

test('exposes the same root through the namespace API', () => {
  expect(Stack.Root).toBe(Stack);

  render(() => <Stack.Root data-testid="stack-root">Content</Stack.Root>);

  expect(screen.getByTestId('stack-root')).toHaveTextContent('Content');
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

  expect(stack.style.getPropertyValue('--moduix-stack-direction-mobile')).toBe('column-reverse');
  expect(stack.style.getPropertyValue('--moduix-stack-direction-desktop')).toBe('row-reverse');
  expect(stack.style.getPropertyValue('--moduix-stack-flex')).toBe('1 1 0%');
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

  expect(desktopOnly.style.getPropertyValue('--moduix-stack-direction-mobile')).toBe('row');
  expect(desktopOnly.style.getPropertyValue('--moduix-stack-direction-desktop')).toBe('row');
  expect(mobileOnly.style.getPropertyValue('--moduix-stack-direction-mobile')).toBe(
    'column-reverse',
  );
  expect(mobileOnly.style.getPropertyValue('--moduix-stack-direction-desktop')).toBe(
    'column-reverse',
  );
});

test('keeps the default direction on nested roots', () => {
  render(() => (
    <Stack direction="row" data-testid="outer">
      <Stack data-testid="inner" />
    </Stack>
  ));

  const inner = screen.getByTestId('inner');

  expect(inner.style.getPropertyValue('--moduix-stack-direction-mobile')).toBe('column');
  expect(inner.style.getPropertyValue('--moduix-stack-direction-desktop')).toBe('column');
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

  expect(defaults.style.getPropertyValue('--moduix-stack-direction-mobile')).toBe('column');
  expect(defaults.style.getPropertyValue('--moduix-stack-direction-desktop')).toBe('column');
  expect(defaults.style.getPropertyValue('--moduix-stack-flex')).toBe('');
  expect(defaults.style.gap).toBe('');
  expect(overridden).toHaveStyle({ flexWrap: 'nowrap', gap: '2rem' });
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