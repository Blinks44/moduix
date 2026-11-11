import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import { Table } from '@/index';

test('renders interactive, striped, sticky, and column-border state hooks', () => {
  render(Table, {
    props: {
      interactive: true,
      showColumnBorder: true,
      stickyHeader: true,
      striped: true,
      class: 'consumer-class w-auto',
      'data-testid': 'table',
    },
  });

  const table = screen.getByTestId('table');

  expect(table.hasAttribute('data-interactive')).toBe(true);
  expect(table.hasAttribute('data-show-column-border')).toBe(true);
  expect(table.hasAttribute('data-sticky-header')).toBe(true);
  expect(table.hasAttribute('data-striped')).toBe(true);
  expect([...table.classList]).toEqual(expect.arrayContaining(['consumer-class', 'w-auto']));
});