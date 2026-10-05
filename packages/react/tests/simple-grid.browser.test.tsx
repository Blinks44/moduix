import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { SimpleGrid } from '../src';

test('renders the default single-column root with stable hooks and a forwarded ref', () => {
  const ref = createRef<HTMLDivElement>();
  const { getByTestId } = render(<SimpleGrid ref={ref} data-testid="grid" />);
  const grid = getByTestId('grid');

  expect(ref.current).toBe(grid);
  expect(grid.getAttribute('data-scope')).toBe('simple-grid');
  expect(grid.getAttribute('data-part')).toBe('root');
  expect(grid.getAttribute('data-slot')).toBe('simple-grid-root');
  expect(grid.style.display).toBe('grid');
  expect(grid.style.gridTemplateColumns).toBe('minmax(0px, 1fr)');
  expect(getComputedStyle(grid).display).toBe('grid');
  expect(getComputedStyle(grid).gridTemplateColumns).toBe(
    `${grid.getBoundingClientRect().width}px`,
  );
});

test('creates fixed or intrinsic columns and lets minChildWidth take precedence', () => {
  const { getByTestId, rerender } = render(
    <SimpleGrid columns={3} data-testid="grid" style={{ width: '480px' }}>
      <div>One</div>
      <div>Two</div>
      <div>Three</div>
    </SimpleGrid>,
  );
  const grid = getByTestId('grid');

  expect(getComputedStyle(grid).gridTemplateColumns).toBe('160px 160px 160px');

  rerender(
    <SimpleGrid columns={3} minChildWidth={240} data-testid="grid" style={{ width: '480px' }}>
      <div>One</div>
      <div>Two</div>
      <div>Three</div>
    </SimpleGrid>,
  );

  expect(grid.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(min(100%, 240px), 1fr))');
  expect(getComputedStyle(grid).gridTemplateColumns).toBe('240px 240px');
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
  expect(grid.style.gap).toBe('1rem 8px');
  expect(grid.style.rowGap).toBe('1rem');
  expect(grid.style.columnGap).toBe('8px');
  expect(getComputedStyle(grid)).toMatchObject({
    display: 'block',
    rowGap: '16px',
    columnGap: '8px',
  });
});

test('preserves semantic children with asChild', () => {
  const { getByRole } = render(
    <SimpleGrid asChild columns={2}>
      <ul aria-label="Projects" />
    </SimpleGrid>,
  );
  const grid = getByRole('list', { name: 'Projects' });

  expect(grid.getAttribute('data-slot')).toBe('simple-grid-root');
  expect(grid.style.gridTemplateColumns).toBe('repeat(2, minmax(0px, 1fr))');
});

test('rejects invalid column counts', () => {
  for (const columns of [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
    expect(() => render(<SimpleGrid columns={columns} />)).toThrow(
      'SimpleGrid `columns` must be a finite positive integer.',
    );
  }
});

test('rejects invalid numeric minimum child widths', () => {
  for (const minChildWidth of [
    -1,
    Number.NaN,
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
  ]) {
    expect(() => render(<SimpleGrid minChildWidth={minChildWidth} />)).toThrow(
      'SimpleGrid `minChildWidth` must be a finite non-negative number.',
    );
  }
});