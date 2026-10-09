import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Container } from '../src';

test('updates size and gutter without replacing the host', () => {
  const [size, setSize] = createSignal<'lg' | 'full'>('lg');
  const [gutter, setGutter] = createSignal<'md' | 'none'>('md');
  render(() => <Container data-testid="container" size={size()} gutter={gutter()} />);
  const container = screen.getByTestId('container');
  setSize('full');
  setGutter('none');
  expect(screen.getByTestId('container')).toBe(container);
  expect(container.getAttribute('data-size')).toBe('full');
  expect(container.getAttribute('data-gutter')).toBe('none');
  expect([...container.classList]).toEqual(expect.arrayContaining(['max-w-none', 'px-0']));
  expect(container.className).not.toContain('max-w-[calc');
  expect(container.className).not.toContain('px-[clamp');
});

test.each([
  ['xs', '640px'],
  ['sm', '768px'],
  ['md', '1024px'],
  ['lg', '1152px'],
  ['xl', '1440px'],
  ['full', 'none'],
] as const)('applies the %s maximum width', (size, maxWidth) => {
  render(() => <Container data-testid="container" size={size} gutter="none" />);

  expect(screen.getByTestId('container').getAttribute('data-size')).toBe(size);
  expect(getComputedStyle(screen.getByTestId('container')).maxWidth).toBe(maxWidth);
});

test.each([
  ['none', 0, 0, 0],
  ['sm', 12, 3, 24],
  ['md', 16, 4, 32],
  ['lg', 24, 5, 48],
] as const)('applies the %s gutter and includes it in maximum width', (gutter, min, vw, max) => {
  render(() => <Container data-testid="container" gutter={gutter} />);

  expect(screen.getByTestId('container').getAttribute('data-gutter')).toBe(gutter);
  const style = getComputedStyle(screen.getByTestId('container'));
  const padding = Math.min(max, Math.max(min, (window.innerWidth * vw) / 100));
  expect(parseFloat(style.paddingInlineStart)).toBeCloseTo(padding);
  expect(parseFloat(style.paddingInlineEnd)).toBeCloseTo(padding);
  expect(parseFloat(style.maxWidth)).toBeCloseTo(1152 + padding * 2);
});

test('preserves default layout, refs, and owned hooks when consumer props conflict', () => {
  let rootRef!: HTMLDivElement;
  render(() => (
    <Container
      ref={(element) => (rootRef = element)}
      data-testid="container"
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
      data-size="custom"
      data-gutter="custom"
      class="consumer-class"
    />
  ));
  const container = screen.getByTestId('container');

  expect(container.getAttribute('data-scope')).toBe('container');
  expect(container.getAttribute('data-part')).toBe('root');
  expect(container.getAttribute('data-slot')).toBe('container-root');
  expect(container.getAttribute('data-size')).toBe('lg');
  expect(container.getAttribute('data-gutter')).toBe('md');
  expect([...container.classList]).toEqual(expect.arrayContaining(['consumer-class']));
  expect(rootRef).toBe(container);
  expect([...container.classList]).toEqual(
    expect.arrayContaining(['w-full', 'min-w-0', 'mx-auto']),
  );
  expect('Root' in Container).toBe(false);
  const style = getComputedStyle(container);
  expect(style.display).toBe('block');
  expect(style.minWidth).toBe('0px');
  expect(parseFloat(style.maxWidth)).toBeCloseTo(1152 + parseFloat(style.paddingInlineStart) * 2);
});

test('lets consumer Tailwind utilities override conflicting defaults', () => {
  render(() => <Container data-testid="container" class="w-1/2 max-w-sm px-2" />);
  const container = screen.getByTestId('container');

  expect([...container.classList]).toEqual(expect.arrayContaining(['w-1/2', 'max-w-sm', 'px-2']));
  expect([...container.classList]).not.toContain('w-full');
  expect(container.className).not.toContain('max-w-[calc');
  expect(container.className).not.toContain('px-[clamp');
  const style = getComputedStyle(container);
  expect(style.maxWidth).toBe('384px');
  expect(style.paddingInlineStart).toBe('8px');
  expect(style.paddingInlineEnd).toBe('8px');
  expect(container.getBoundingClientRect().width).toBeCloseTo(
    Math.min(384, container.parentElement!.clientWidth / 2),
  );
});

test('preserves semantic root composition with native Ark Solid asChild', () => {
  let rootRef: HTMLDivElement | undefined;
  render(() => (
    <Container
      ref={(element) => (rootRef = element)}
      asChild={(props) => <main {...props()} aria-label="Page content" />}
      size="md"
      gutter="lg"
    />
  ));
  const main = screen.getByRole('main', { name: 'Page content' });

  expect(main.getAttribute('data-scope')).toBe('container');
  expect(main.getAttribute('data-part')).toBe('root');
  expect(main.getAttribute('data-slot')).toBe('container-root');
  expect(main.getAttribute('data-size')).toBe('md');
  expect(main.getAttribute('data-gutter')).toBe('lg');
  expect(rootRef).toBeUndefined();
});