import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { Table } from '@/index';

test('renders interactive, striped, sticky, and column-border state hooks', () => {
  render(Table, {
    props: {
      interactive: true,
      showColumnBorder: true,
      stickyHeader: true,
      striped: true,
      class: 'consumer-class',
    },
    attrs: { 'data-testid': 'table' },
  });

  const table = screen.getByTestId('table');

  expect(table.hasAttribute('data-interactive')).toBe(true);
  expect(table.hasAttribute('data-show-column-border')).toBe(true);
  expect(table.hasAttribute('data-sticky-header')).toBe(true);
  expect(table.hasAttribute('data-striped')).toBe(true);
  expect(table?.classList.contains('consumer-class')).toBe(true);
});