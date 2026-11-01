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
});