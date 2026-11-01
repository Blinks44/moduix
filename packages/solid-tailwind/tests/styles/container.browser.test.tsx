import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Container } from '@/index';

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
  expect(getComputedStyle(container).maxWidth).toBe('none');
  expect(getComputedStyle(container).paddingInlineStart).toBe('0px');
});

test('lets consumer Tailwind utilities override conflicting defaults', () => {
  render(() => <Container data-testid="container" class="w-1/2 max-w-sm px-2" />);
  const container = screen.getByTestId('container');

  expect([...container.classList]).toEqual(expect.arrayContaining(['w-1/2', 'max-w-sm', 'px-2']));
  const style = getComputedStyle(container);
  expect(style.maxWidth).toBe('384px');
  expect(style.paddingInlineStart).toBe('8px');
  expect(style.paddingInlineEnd).toBe('8px');
  expect(container.getBoundingClientRect().width).toBeCloseTo(
    Math.min(384, container.parentElement!.clientWidth / 2),
  );
});