import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { SimpleGrid } from '@/index';

test('renders the default single-column root with stable hooks and utilities', () => {
  let ref!: HTMLDivElement;

  render(() => <SimpleGrid ref={(element) => (ref = element)} data-testid="grid" />);
  const grid = screen.getByTestId('grid');

  expect(ref).toBe(grid);
  expect(grid.getAttribute('data-scope')).toBe('simple-grid');
  expect(grid.getAttribute('data-part')).toBe('root');
  expect(grid.getAttribute('data-slot')).toBe('simple-grid-root');
  expect(getComputedStyle(grid).display).toBe('grid');
  expect(getComputedStyle(grid).gridTemplateColumns).toBe(
    `${grid.getBoundingClientRect().width}px`,
  );
});

test('lets consumer Tailwind utilities override fixed defaults', () => {
  render(() => <SimpleGrid class="block grid-cols-2" data-testid="grid" />);
  const grid = screen.getByTestId('grid');

  expect([...grid.classList]).toEqual(expect.arrayContaining(['block', 'grid-cols-2']));
  expect(getComputedStyle(grid).display).toBe('block');
});