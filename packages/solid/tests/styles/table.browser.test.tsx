import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Table, TableBody, TableEmpty } from '@/index';

test('renders interactive, striped, sticky, and column-border state hooks', () => {
  render(() => (
    <Table
      data-testid="table"
      interactive
      showColumnBorder
      stickyHeader
      striped
      class="consumer-class"
    />
  ));

  const table = screen.getByTestId('table');

  expect(table.hasAttribute('data-interactive')).toBe(true);
  expect(table.hasAttribute('data-show-column-border')).toBe(true);
  expect(table.hasAttribute('data-sticky-header')).toBe(true);
  expect(table.hasAttribute('data-striped')).toBe(true);
  expect(table?.classList.contains('consumer-class')).toBe(true);
});

test('renders the default and custom empty states', async () => {
  let emptyRef!: HTMLTableCellElement;
  render(() => (
    <Table>
      <TableBody>
        <TableEmpty colSpan={3} data-testid="default-empty" />
        <TableEmpty ref={(element) => (emptyRef = element)} colSpan={3} data-testid="custom-empty">
          No invoices found.
        </TableEmpty>
      </TableBody>
    </Table>
  ));

  const defaultEmpty = screen.getByTestId('default-empty');
  const customEmpty = screen.getByTestId('custom-empty');

  const defaultEmptyLocator = page.getByTestId('default-empty');
  await expect.element(defaultEmptyLocator).toContainText('No results.');
  expect(defaultEmpty.dataset).toMatchObject({ part: 'empty', slot: 'table-empty' });
  await expect.element(defaultEmptyLocator).toHaveAttribute('colspan', '3');
  expect(defaultEmpty.closest('tr')?.hasAttribute('data-empty')).toBe(true);
  const customEmptyLocator = page.getByTestId('custom-empty');
  await expect.element(customEmptyLocator).toContainText('No invoices found.');
  expect(emptyRef).toBe(customEmpty);
  expect(customEmpty.getAttribute('data-part')).toBe('empty');
  await expect.element(customEmptyLocator).toHaveAttribute('colspan', '3');
});