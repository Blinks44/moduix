import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Table, TableBody, TableEmpty } from '@/index';

test('renders interactive, striped, sticky, and column-border state hooks', () => {
  render(
    <Table
      data-testid="table"
      interactive
      showColumnBorder
      stickyHeader
      striped
      className="consumer-class w-auto"
    />,
  );

  const table = screen.getByTestId('table');

  expect(table.hasAttribute('data-interactive')).toBe(true);
  expect(table.hasAttribute('data-show-column-border')).toBe(true);
  expect(table.hasAttribute('data-sticky-header')).toBe(true);
  expect(table.hasAttribute('data-striped')).toBe(true);
  expect([...table!.classList]).toEqual(expect.arrayContaining(['consumer-class', 'w-auto']));
});

test('renders the default and custom empty states', async () => {
  const emptyRef = createRef<HTMLTableCellElement>();

  render(
    <Table>
      <TableBody>
        <TableEmpty colSpan={3} data-testid="default-empty" />
        <TableEmpty ref={emptyRef} colSpan={3} data-testid="custom-empty">
          No invoices found.
        </TableEmpty>
      </TableBody>
    </Table>,
  );

  const defaultEmpty = screen.getByTestId('default-empty');
  const customEmpty = screen.getByTestId('custom-empty');

  const defaultEmptyLocator = page.getByTestId('default-empty');
  await expect.element(defaultEmptyLocator).toContainText('No results.');
  expect(defaultEmpty.dataset).toMatchObject({ part: 'empty', slot: 'table-empty' });
  await expect.element(defaultEmptyLocator).toHaveAttribute('colspan', '3');
  expect(defaultEmpty.closest('tr')?.hasAttribute('data-empty')).toBe(true);
  expect(defaultEmpty.closest('tr')?.getAttribute('data-slot')).toBe('table-row');
  const customEmptyLocator = page.getByTestId('custom-empty');
  await expect.element(customEmptyLocator).toContainText('No invoices found.');
  expect(emptyRef.current).toBe(customEmpty);
  expect(customEmpty.getAttribute('data-part')).toBe('empty');
  await expect.element(customEmptyLocator).toHaveAttribute('colspan', '3');
});

test('supports replacing only the generated empty cell with asChild', async () => {
  render(
    <Table>
      <TableBody>
        <TableEmpty colSpan={2} className="custom-empty" asChild>
          <td data-testid="custom-empty-cell">Nothing to review.</td>
        </TableEmpty>
      </TableBody>
    </Table>,
  );

  const emptyCell = screen.getByTestId('custom-empty-cell');

  expect(emptyCell.tagName).toBe('TD');
  expect(emptyCell?.classList.contains('custom-empty')).toBe(true);
  expect(emptyCell.closest('tr')?.hasAttribute('data-empty')).toBe(true);
  const customEmptyCell = page.getByTestId('custom-empty-cell');
  expect(emptyCell.dataset).toMatchObject({ scope: 'table', part: 'empty', slot: 'table-empty' });
  await expect.element(customEmptyCell).toHaveAttribute('colspan', '2');
  await expect.element(customEmptyCell).toContainText('Nothing to review.');
});