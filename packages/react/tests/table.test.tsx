import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Table } from '../src';

test('renders native table anatomy with styling state hooks', () => {
  render(
    <Table stickyHeader striped interactive showColumnBorder size="lg" variant="outline">
      <Table.Caption side="top">Invoices</Table.Caption>
      <Table.ColumnGroup>
        <Table.Column htmlWidth="40%" />
      </Table.ColumnGroup>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader scope="col">Invoice</Table.ColumnHeader>
          <Table.ColumnHeader numeric scope="col">
            Amount
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>INV001</Table.Cell>
          <Table.Cell numeric>$250.00</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>,
  );

  const table = screen.getByRole('table', { name: 'Invoices' });

  expect(table).toHaveAttribute('data-slot', 'table-root');
  expect(table).toHaveAttribute('data-size', 'lg');
  expect(table).toHaveAttribute('data-variant', 'outline');
  expect(table).toHaveAttribute('data-sticky-header');
  expect(table).toHaveAttribute('data-striped');
  expect(table).toHaveAttribute('data-interactive');
  expect(table).toHaveAttribute('data-show-column-border');
  expect(screen.getByRole('columnheader', { name: 'Amount' })).toHaveAttribute('data-numeric');
  expect(screen.getByRole('columnheader', { name: 'Invoice' })).toHaveAttribute('scope', 'col');
  expect(table.querySelector('col')).toHaveAttribute('width', '40%');
});

test('renders an empty row that stays addressable through its cell ref', () => {
  const emptyRef = createRef<HTMLTableCellElement>();

  render(
    <Table>
      <Table.Body>
        <Table.Empty ref={emptyRef} colSpan={2}>
          No invoices found.
        </Table.Empty>
      </Table.Body>
    </Table>,
  );

  const cell = screen.getByRole('cell', { name: 'No invoices found.' });

  expect(cell).toHaveAttribute('data-slot', 'table-empty');
  expect(cell).toHaveAttribute('colspan', '2');
  expect(cell.closest('tr')).toHaveAttribute('data-empty');
  expect(emptyRef.current).toBe(cell);
});

test('keeps sticky-column hooks on native table cells', () => {
  render(
    <Table.ScrollArea>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader data-sticky="start">Project</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell data-sticky="start">Docs redesign</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Table.ScrollArea>,
  );

  expect(screen.getByRole('columnheader', { name: 'Project' })).toHaveAttribute(
    'data-sticky',
    'start',
  );
  expect(screen.getByRole('cell', { name: 'Docs redesign' })).toHaveAttribute(
    'data-sticky',
    'start',
  );
});