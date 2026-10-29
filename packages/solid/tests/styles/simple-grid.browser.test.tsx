import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { SimpleGrid } from '@/index';

test('renders the default single-column root with stable hooks and a forwarded ref', () => {
  let ref!: HTMLDivElement;

  render(() => <SimpleGrid ref={(element) => (ref = element)} data-testid="grid" />);
  const grid = screen.getByTestId('grid');

  expect(ref).toBe(grid);
  expect(grid.getAttribute('data-scope')).toBe('simple-grid');
  expect(grid.getAttribute('data-part')).toBe('root');
  expect(grid.getAttribute('data-slot')).toBe('simple-grid-root');
  expect(grid.style.gridTemplateColumns).toBe('');
  expect(getComputedStyle(grid).display).toBe('grid');
  expect(getComputedStyle(grid).gridTemplateColumns).toBe(
    `${grid.getBoundingClientRect().width}px`,
  );
});

test('lets consumer classes override the default display and template', () => {
  const sheet = document.createElement('style');
  sheet.textContent =
    '.consumer-grid { display: inline-grid; grid-template-columns: 100px 200px; }';
  document.head.append(sheet);

  try {
    const grid = render(() => <SimpleGrid class="consumer-grid" data-testid="grid" />).getByTestId(
      'grid',
    );

    expect(getComputedStyle(grid).display).toBe('inline-grid');
    expect(getComputedStyle(grid).gridTemplateColumns).toBe('100px 200px');
  } finally {
    sheet.remove();
  }
});