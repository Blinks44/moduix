import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Table } from '../src';

test('renders the native table anatomy with stable hooks', () => {
  render(
    <Table.ScrollArea data-testid="scroll-area">
      <Table data-testid="table" size="lg" variant="outline">
        <Table.ColumnGroup data-testid="column-group">
          <Table.Column data-testid="column" htmlWidth="40%" />
        </Table.ColumnGroup>
        <Table.Caption data-testid="caption" side="top">
          Recent invoices
        </Table.Caption>
        <Table.Header data-testid="header">
          <Table.Row data-testid="header-row">
            <Table.ColumnHeader data-testid="column-header" scope="col">
              Invoice
            </Table.ColumnHeader>
            <Table.ColumnHeader data-testid="numeric-header" numeric>
              Amount
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body data-testid="body">
          <Table.Row data-testid="row">
            <Table.Cell data-testid="cell">INV001</Table.Cell>
            <Table.Cell numeric>$250.00</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer data-testid="footer">
          <Table.Row>
            <Table.Cell colSpan={1}>Total</Table.Cell>
            <Table.Cell numeric>$250.00</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Table.ScrollArea>,
  );

  const table = screen.getByTestId('table');
  const scrollArea = screen.getByTestId('scroll-area');
  const columnGroup = screen.getByTestId('column-group');
  const column = screen.getByTestId('column');
  const caption = screen.getByTestId('caption');
  const header = screen.getByTestId('header');
  const body = screen.getByTestId('body');
  const footer = screen.getByTestId('footer');
  const row = screen.getByTestId('row');
  const columnHeader = screen.getByTestId('column-header');
  const numericHeader = screen.getByTestId('numeric-header');
  const cell = screen.getByTestId('cell');
  const numericCell = screen.getAllByText('$250.00')[0];

  expect(scrollArea.tagName).toBe('DIV');
  expect(scrollArea).toHaveAttribute('data-part', 'scroll-area');
  expect(scrollArea).toHaveAttribute('data-slot', 'table-scroll-area');
  expect(table.tagName).toBe('TABLE');
  expect(table).toHaveAttribute('data-scope', 'table');
  expect(table).toHaveAttribute('data-part', 'root');
  expect(table).toHaveAttribute('data-slot', 'table-root');
  expect(table).toHaveAttribute('data-size', 'lg');
  expect(table).toHaveAttribute('data-variant', 'outline');
  expect(columnGroup.tagName).toBe('COLGROUP');
  expect(columnGroup).toHaveAttribute('data-part', 'column-group');
  expect(columnGroup).toHaveAttribute('data-slot', 'table-column-group');
  expect(column.tagName).toBe('COL');
  expect(column).toHaveAttribute('data-part', 'column');
  expect(column).toHaveAttribute('data-slot', 'table-column');
  expect(column).toHaveAttribute('width', '40%');
  expect(caption.tagName).toBe('CAPTION');
  expect(caption).toHaveAttribute('data-part', 'caption');
  expect(caption).toHaveAttribute('data-side', 'top');
  expect(header.tagName).toBe('THEAD');
  expect(header).toHaveAttribute('data-part', 'header');
  expect(body.tagName).toBe('TBODY');
  expect(body).toHaveAttribute('data-part', 'body');
  expect(footer.tagName).toBe('TFOOT');
  expect(footer).toHaveAttribute('data-part', 'footer');
  expect(row.tagName).toBe('TR');
  expect(row).toHaveAttribute('data-part', 'row');
  expect(columnHeader.tagName).toBe('TH');
  expect(columnHeader).toHaveAttribute('scope', 'col');
  expect(columnHeader).toHaveAttribute('data-part', 'column-header');
  expect(numericHeader).toHaveAttribute('data-numeric', 'true');
  expect(cell.tagName).toBe('TD');
  expect(cell).toHaveAttribute('data-part', 'cell');
  expect(numericCell).toHaveAttribute('data-numeric', 'true');
});

test.each(['sm', 'md', 'lg'] as const)('renders the %s size preset', (size) => {
  render(<Table data-testid="table" size={size} />);

  expect(screen.getByTestId('table')).toHaveAttribute('data-size', size);
});

test('renders interactive, striped, sticky, and column-border state hooks', () => {
  render(
    <Table
      data-testid="table"
      interactive
      showColumnBorder
      stickyHeader
      striped
      className="consumer-class"
    />,
  );

  const table = screen.getByTestId('table');

  expect(table).toHaveAttribute('data-interactive');
  expect(table).toHaveAttribute('data-show-column-border');
  expect(table).toHaveAttribute('data-sticky-header');
  expect(table).toHaveAttribute('data-striped');
  expect(table).toHaveClass('consumer-class');
});

test('keeps public hooks when consumer data attributes conflict', () => {
  render(
    <Table
      data-testid="table"
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
      data-size="custom"
      data-variant="custom"
    >
      <Table.Caption
        data-testid="caption"
        data-scope="custom"
        data-part="custom"
        data-slot="custom"
        data-side="custom"
      />
      <Table.Row data-testid="row" data-scope="custom" data-part="custom" data-slot="custom" />
    </Table>,
  );

  const table = screen.getByTestId('table');
  const caption = screen.getByTestId('caption');
  const row = screen.getByTestId('row');

  expect(table).toHaveAttribute('data-scope', 'table');
  expect(table).toHaveAttribute('data-part', 'root');
  expect(table).toHaveAttribute('data-slot', 'table-root');
  expect(table).toHaveAttribute('data-size', 'md');
  expect(table).toHaveAttribute('data-variant', 'line');
  expect(caption).toHaveAttribute('data-scope', 'table');
  expect(caption).toHaveAttribute('data-part', 'caption');
  expect(caption).toHaveAttribute('data-slot', 'table-caption');
  expect(caption).toHaveAttribute('data-side', 'bottom');
  expect(row).toHaveAttribute('data-scope', 'table');
  expect(row).toHaveAttribute('data-part', 'row');
  expect(row).toHaveAttribute('data-slot', 'table-row');
});

test('supports native refs on the ordinary factory path', () => {
  const tableRef = createRef<HTMLTableElement>();
  const scrollAreaRef = createRef<HTMLDivElement>();
  const captionRef = createRef<HTMLTableCaptionElement>();
  const rowRef = createRef<HTMLTableRowElement>();
  const cellRef = createRef<HTMLTableCellElement>();

  render(
    <Table.ScrollArea ref={scrollAreaRef}>
      <Table ref={tableRef}>
        <Table.Caption ref={captionRef}>Invoices</Table.Caption>
        <Table.Body>
          <Table.Row ref={rowRef}>
            <Table.Cell ref={cellRef}>INV001</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Table.ScrollArea>,
  );

  expect(tableRef.current).toHaveAttribute('data-slot', 'table-root');
  expect(scrollAreaRef.current).toHaveAttribute('data-slot', 'table-scroll-area');
  expect(captionRef.current).toHaveAttribute('data-slot', 'table-caption');
  expect(rowRef.current).toHaveAttribute('data-slot', 'table-row');
  expect(cellRef.current).toHaveAttribute('data-slot', 'table-cell');
});

test('preserves semantic root composition with native Ark React asChild', () => {
  render(
    <Table asChild size="sm" variant="outline">
      <section aria-label="Invoice table" />
    </Table>,
  );

  const section = screen.getByRole('region', { name: 'Invoice table' });

  expect(section).toHaveAttribute('data-scope', 'table');
  expect(section).toHaveAttribute('data-part', 'root');
  expect(section).toHaveAttribute('data-slot', 'table-root');
  expect(section).toHaveAttribute('data-size', 'sm');
  expect(section).toHaveAttribute('data-variant', 'outline');
});

test('forwards refs through native Ark React asChild composition', () => {
  const tableRef = createRef<HTMLTableElement>();

  render(
    <Table ref={tableRef} asChild>
      <section aria-label="Invoice table" />
    </Table>,
  );

  expect(tableRef.current).toBe(screen.getByRole('region', { name: 'Invoice table' }));
  expect(tableRef.current).toHaveAttribute('data-slot', 'table-root');
});

test('renders the default and custom empty states', () => {
  const emptyRef = createRef<HTMLTableCellElement>();

  render(
    <Table>
      <Table.Body>
        <Table.Empty colSpan={3} data-testid="default-empty" />
        <Table.Empty ref={emptyRef} colSpan={3} data-testid="custom-empty">
          No invoices found.
        </Table.Empty>
      </Table.Body>
    </Table>,
  );

  const defaultEmpty = screen.getByTestId('default-empty');
  const customEmpty = screen.getByTestId('custom-empty');

  expect(defaultEmpty).toHaveTextContent('No results.');
  expect(defaultEmpty).toHaveAttribute('data-part', 'empty');
  expect(defaultEmpty).toHaveAttribute('data-slot', 'table-empty');
  expect(defaultEmpty).toHaveAttribute('colspan', '3');
  expect(defaultEmpty.closest('tr')).toHaveAttribute('data-empty');
  expect(customEmpty).toHaveTextContent('No invoices found.');
  expect(emptyRef.current).toBe(customEmpty);
  expect(customEmpty).toHaveAttribute('data-part', 'empty');
  expect(customEmpty).toHaveAttribute('colspan', '3');
});

test('supports replacing only the generated empty cell with asChild', () => {
  render(
    <Table>
      <Table.Body>
        <Table.Empty colSpan={2} className="custom-empty" asChild>
          <td data-testid="custom-empty-cell">Nothing to review.</td>
        </Table.Empty>
      </Table.Body>
    </Table>,
  );

  const emptyCell = screen.getByTestId('custom-empty-cell');

  expect(emptyCell.tagName).toBe('TD');
  expect(emptyCell).toHaveClass('custom-empty');
  expect(emptyCell.closest('tr')).toHaveAttribute('data-empty');
  expect(emptyCell).toHaveAttribute('data-scope', 'table');
  expect(emptyCell).toHaveAttribute('data-part', 'empty');
  expect(emptyCell).toHaveAttribute('data-slot', 'table-empty');
  expect(emptyCell).toHaveAttribute('colspan', '2');
  expect(emptyCell).toHaveTextContent('Nothing to review.');
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

test('preserves the empty-row contract when its cell uses asChild', () => {
  const emptyRef = createRef<HTMLTableCellElement>();

  render(
    <Table>
      <Table.Body>
        <Table.Empty asChild ref={emptyRef} colSpan={2} className="custom-empty">
          <td>No invoices found.</td>
        </Table.Empty>
      </Table.Body>
    </Table>,
  );

  const cell = screen.getByRole('cell', { name: 'No invoices found.' });

  expect(cell).toHaveAttribute('data-slot', 'table-empty');
  expect(cell).toHaveAttribute('colspan', '2');
  expect(cell).toHaveClass('custom-empty');
  expect(cell.closest('tr')).toHaveAttribute('data-empty');
  expect(emptyRef.current).toBe(cell);
});