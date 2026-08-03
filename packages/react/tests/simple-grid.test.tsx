import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { SimpleGrid } from '../src';

test('renders the default single-column root with stable hooks and a forwarded ref', () => {
  const ref = createRef<HTMLDivElement>();
  const { getByTestId } = render(<SimpleGrid ref={ref} data-testid="grid" />);
  const grid = getByTestId('grid');

  expect(ref.current).toBe(grid);
  expect(grid).toHaveAttribute('data-scope', 'simple-grid');
  expect(grid).toHaveAttribute('data-part', 'root');
  expect(grid).toHaveAttribute('data-slot', 'simple-grid-root');
  expect(grid.style.display).toBe('grid');
  expect(grid.style.gridTemplateColumns).toBe('minmax(0, 1fr)');
});

test('creates fixed or intrinsic columns and lets minChildWidth take precedence', () => {
  const { getByTestId, rerender } = render(<SimpleGrid columns={3} data-testid="grid" />);
  const grid = getByTestId('grid');

  expect(grid.style.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))');

  rerender(<SimpleGrid columns={3} minChildWidth={240} data-testid="grid" />);

  expect(grid.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(min(100%, 240px), 1fr))');
});

test('applies gaps and lets style override generated layout styles', () => {
  const { getByTestId } = render(
    <SimpleGrid
      columns={2}
      gap={12}
      rowGap="1rem"
      columnGap={8}
      data-testid="grid"
      style={{ display: 'block', gridTemplateColumns: 'subgrid' }}
    />,
  );
  const grid = getByTestId('grid');

  expect(grid.style.display).toBe('block');
  expect(grid.style.gridTemplateColumns).toBe('subgrid');
  expect(grid.style.gap).toBe('12px');
  expect(grid.style.rowGap).toBe('1rem');
  expect(grid.style.columnGap).toBe('8px');
});

test('preserves semantic children with asChild', () => {
  const { getByRole } = render(
    <SimpleGrid asChild columns={2}>
      <ul aria-label="Projects" />
    </SimpleGrid>,
  );
  const grid = getByRole('list', { name: 'Projects' });

  expect(grid).toHaveAttribute('data-slot', 'simple-grid-root');
  expect(grid.style.gridTemplateColumns).toBe('repeat(2, minmax(0, 1fr))');
});

test('rejects invalid column counts', () => {
  for (const columns of [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
    expect(() => render(<SimpleGrid columns={columns} />)).toThrow(
      'SimpleGrid `columns` must be a finite positive integer.',
    );
  }
});