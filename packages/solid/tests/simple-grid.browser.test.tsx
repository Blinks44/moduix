import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { SimpleGrid } from '../src';

test('renders the default single-column root with stable hooks and a forwarded ref', () => {
  let ref!: HTMLDivElement;

  render(() => <SimpleGrid ref={(element) => (ref = element)} data-testid="grid" />);
  const grid = screen.getByTestId('grid');

  expect(ref).toBe(grid);
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

test('creates fixed or intrinsic columns and lets minChildWidth take precedence', async () => {
  const [minChildWidth, setMinChildWidth] = createSignal<number | undefined>();
  render(() => (
    <SimpleGrid
      columns={3}
      minChildWidth={minChildWidth()}
      data-testid="grid"
      style={{ width: '480px' }}
    >
      <div>One</div>
      <div>Two</div>
      <div>Three</div>
    </SimpleGrid>
  ));
  const grid = screen.getByTestId('grid');

  expect(getComputedStyle(grid).gridTemplateColumns).toBe('160px 160px 160px');

  setMinChildWidth(240);

  await expect
    .poll(() => grid.style.gridTemplateColumns)
    .toBe('repeat(auto-fit, minmax(min(100%, 240px), 1fr))');
  expect(getComputedStyle(grid).gridTemplateColumns).toBe('240px 240px');
});

test('applies gaps and lets style override generated layout styles', () => {
  render(() => (
    <SimpleGrid
      columns={2}
      gap={12}
      rowGap="1rem"
      columnGap={8}
      data-testid="grid"
      style={{ display: 'block', 'grid-template-columns': 'subgrid' }}
    />
  ));
  const grid = screen.getByTestId('grid');

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
  render(() => (
    <SimpleGrid asChild={(props) => <ul {...props()} aria-label="Projects" />} columns={2} />
  ));
  const grid = screen.getByRole('list', { name: 'Projects' });

  expect(grid.getAttribute('data-slot')).toBe('simple-grid-root');
  expect(grid.style.gridTemplateColumns).toBe('repeat(2, minmax(0px, 1fr))');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let ref: HTMLDivElement | undefined;

  render(() => (
    <SimpleGrid
      ref={(element) => (ref = element)}
      asChild={(props) => <section {...props()} aria-label="Projects" />}
    />
  ));

  expect(screen.getByRole('region', { name: 'Projects' }).isConnected).toBe(true);
  expect(ref).toBeUndefined();
});

test('rejects invalid column counts', () => {
  for (const columns of [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
    expect(() => render(() => <SimpleGrid columns={columns} />)).toThrow(
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
    expect(() => render(() => <SimpleGrid minChildWidth={minChildWidth} />)).toThrow(
      'SimpleGrid `minChildWidth` must be a finite non-negative number.',
    );
  }
});

test('preserves the Solid style string form while keeping generated styles first', () => {
  render(() => (
    <SimpleGrid
      data-testid="grid"
      gap={12}
      style="display: block; grid-template-columns: subgrid"
    />
  ));
  const grid = screen.getByTestId('grid');

  expect(grid.style.display).toBe('block');
  expect(grid.style.gridTemplateColumns).toBe('subgrid');
  expect(grid.style.gap).toBe('12px');
});