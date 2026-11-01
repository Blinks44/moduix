import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { SimpleGrid } from '@/index';

test('lets consumer classes override the default display and template', () => {
  const sheet = document.createElement('style');
  sheet.textContent =
    '.consumer-grid { display: inline-grid; grid-template-columns: 100px 200px; }';
  document.head.append(sheet);

  try {
    const grid = render(SimpleGrid, {
      props: { class: 'consumer-grid' },
      attrs: { 'data-testid': 'grid' },
    }).getByTestId('grid');

    expect(getComputedStyle(grid).display).toBe('inline-grid');
    expect(getComputedStyle(grid).gridTemplateColumns).toBe('100px 200px');
  } finally {
    sheet.remove();
  }
});