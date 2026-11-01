import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { SimpleGrid } from '@/index';

test('renders the default single-column root with stable hooks, utilities, and a forwarded ref', () => {
  const ref = createRef<HTMLDivElement>();
  const { getByTestId } = render(<SimpleGrid ref={ref} data-testid="grid" />);
  const grid = getByTestId('grid');

  expect(ref.current).toBe(grid);
  expect(grid.getAttribute('data-scope')).toBe('simple-grid');
  expect(grid.getAttribute('data-part')).toBe('root');
  expect(grid.getAttribute('data-slot')).toBe('simple-grid-root');
  expect(getComputedStyle(grid).display).toBe('grid');
  expect(getComputedStyle(grid).gridTemplateColumns).toBe(
    `${grid.getBoundingClientRect().width}px`,
  );
});

test('lets consumer Tailwind utilities override fixed defaults', () => {
  const { getByTestId } = render(<SimpleGrid className="block grid-cols-2" data-testid="grid" />);
  const grid = getByTestId('grid');

  expect([...grid.classList]).toEqual(expect.arrayContaining(['block', 'grid-cols-2']));
  expect(getComputedStyle(grid).display).toBe('block');
});