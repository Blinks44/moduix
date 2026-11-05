import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
// The shared harness resolves `@/` to this package's source.
import TestSimpleGrid from '../../../svelte/tests/simple-grid/TestSimpleGrid.svelte';

test('lets consumer utilities override fixed defaults without duplicate classes', () => {
  render(TestSimpleGrid, { props: { class: 'block grid-cols-2', 'data-testid': 'grid' } });
  const grid = screen.getByTestId('grid');
  expect([...grid.classList]).toEqual(expect.arrayContaining(['block', 'grid-cols-2']));
  expect(grid.className).toBe('block grid-cols-2');
  expect(grid.style.display).toBe('');
  expect(grid.style.gridTemplateColumns).toBe('');
  expect(getComputedStyle(grid).display).toBe('block');
});