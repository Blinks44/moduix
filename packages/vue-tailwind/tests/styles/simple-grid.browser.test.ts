import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { SimpleGrid } from '@/index';

test('lets consumer utilities override fixed defaults without duplicate classes', () => {
  const { getByTestId } = render(SimpleGrid, {
    props: { class: 'block grid-cols-2' },
    attrs: { 'data-testid': 'grid' },
  });
  const grid = getByTestId('grid');
  expect([...grid.classList]).toEqual(expect.arrayContaining(['block', 'grid-cols-2']));
  expect(grid.className).toBe('block grid-cols-2');
  expect(grid.style.display).toBe('');
  expect(grid.style.gridTemplateColumns).toBe('');
  expect(getComputedStyle(grid).display).toBe('block');
});