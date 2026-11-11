import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildSimpleGrid from './simple-grid/AsChildSimpleGrid.svelte';
import TestSimpleGrid from './simple-grid/TestSimpleGrid.svelte';

test('renders the default single-column root with stable hooks and a native ref', () => {
  const { component } = render(TestSimpleGrid, {
    props: {
      'data-testid': 'grid',
      'data-scope': 'custom',
      'data-part': 'custom',
      'data-slot': 'custom',
    },
  });
  const grid = screen.getByTestId('grid');
  expect(component.getRef()).toBe(grid);
  expect(grid.getAttribute('data-scope')).toBe('simple-grid');
  expect(grid.getAttribute('data-part')).toBe('root');
  expect(grid.getAttribute('data-slot')).toBe('simple-grid-root');
  expect(grid.style.gridTemplateColumns).toBe('');
  expect(grid.hasAttribute('role')).toBe(false);
  expect(getComputedStyle(grid).display).toBe('grid');
  expect(getComputedStyle(grid).gridTemplateColumns).toBe(
    `${grid.getBoundingClientRect().width}px`,
  );
});

test('reactively resolves fixed and intrinsic columns, including strings and zero', async () => {
  const { rerender } = render(TestSimpleGrid, {
    props: { columns: 3, style: 'width: 480px', withChildren: true, 'data-testid': 'grid' },
  });
  const grid = screen.getByTestId('grid');
  expect(getComputedStyle(grid).gridTemplateColumns).toBe('160px 160px 160px');
  await rerender({ columns: 3, minChildWidth: 240 });
  expect(grid.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(min(100%, 240px), 1fr))');
  expect(getComputedStyle(grid).gridTemplateColumns).toBe('240px 240px');
  await rerender({ minChildWidth: '10rem' });
  expect(grid.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(min(100%, 10rem), 1fr))');
  await rerender({ minChildWidth: 0 });
  expect(grid.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(min(100%, 0px), 1fr))');
  await rerender({ columns: undefined, minChildWidth: undefined });
  expect(grid.style.gridTemplateColumns).toBe('');
  expect(screen.getByTestId('grid')).toBe(grid);
  expect(getComputedStyle(grid).gridTemplateColumns).toBe('480px');
});

test('applies numeric gaps as pixels and lets styles override generated layout', () => {
  render(TestSimpleGrid, {
    props: {
      columns: 2,
      gap: 12,
      rowGap: '1rem',
      columnGap: 8,
      style: 'display: block; grid-template-columns: subgrid',
      'data-testid': 'grid',
    },
  });
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

test('preserves native string style overrides', async () => {
  const { rerender } = render(TestSimpleGrid, {
    props: {
      gap: 12,
      style: 'display: block; grid-template-columns: subgrid; gap: 4px',
      'data-testid': 'grid',
    },
  });
  const grid = screen.getByTestId('grid');
  expect(grid.style.display).toBe('block');
  expect(grid.style.gridTemplateColumns).toBe('subgrid');
  expect(grid.style.gap).toBe('4px');
  await rerender({ style: 'color: red; gap: 8px; gap: 16px' });
  expect(grid.style.color).toBe('red');
  expect(grid.style.gap).toBe('16px');
});

test('applies a lone gap to both axes across updates', async () => {
  const { rerender } = render(TestSimpleGrid, {
    props: { columns: 2, gap: 12, 'data-testid': 'grid' },
  });
  const grid = screen.getByTestId('grid');
  expect(getComputedStyle(grid)).toMatchObject({ rowGap: '12px', columnGap: '12px' });
  await rerender({ columns: 3, gap: 12 });
  expect(grid.style.gridTemplateColumns).toBe('repeat(3, minmax(0px, 1fr))');
  expect(getComputedStyle(grid)).toMatchObject({ rowGap: '12px', columnGap: '12px' });
});

test('preserves semantic asChild hosts, attrs, classes, listeners, and refs', async () => {
  const handleClick = rs.fn();
  const { component } = render(AsChildSimpleGrid, { props: { onclick: handleClick } });
  const grid = screen.getByRole('list', { name: 'Projects' });
  expect(component.getRef()).toBe(grid);
  expect(grid.getAttribute('id')).toBe('projects');
  expect(grid.getAttribute('data-slot')).toBe('simple-grid-root');
  expect(grid.style.gridTemplateColumns).toBe('repeat(2, minmax(0px, 1fr))');
  expect([...grid.classList]).toEqual(expect.arrayContaining(['consumer-grid', 'project-list']));
  expect(grid.children).toHaveLength(2);
  expect(grid.firstElementChild?.textContent).toContain('Analytics');
  await page.getByRole('list', { name: 'Projects' }).click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});