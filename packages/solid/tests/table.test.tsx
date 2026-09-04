import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Table } from '../src';

test('renders the native table anatomy with stable hooks', () => {
  render(() => (
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
            <Table.ColumnHeader data-testid="column-header">Invoice</Table.ColumnHeader>
            <Table.ColumnHeader numeric>Amount</Table.ColumnHeader>
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
    </Table.ScrollArea>
  ));

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
  const cell = screen.getByTestId('cell');
  const numericHeader = screen.getByText('Amount');
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
  expect(columnHeader).toHaveAttribute('data-part', 'column-header');
  expect(numericHeader).toHaveAttribute('data-numeric', 'true');
  expect(cell.tagName).toBe('TD');
  expect(cell).toHaveAttribute('data-part', 'cell');
  expect(numericCell).toHaveAttribute('data-numeric', 'true');
});

test.each(['sm', 'md', 'lg'] as const)('renders the %s size preset', (size) => {
  render(() => <Table data-testid="table" size={size} />);

  expect(screen.getByTestId('table')).toHaveAttribute('data-size', size);
});

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

  expect(table).toHaveAttribute('data-interactive');
  expect(table).toHaveAttribute('data-show-column-border');
  expect(table).toHaveAttribute('data-sticky-header');
  expect(table).toHaveAttribute('data-striped');
  expect(table).toHaveClass('consumer-class');
});

test('keeps public hooks when consumer data attributes conflict', () => {
  render(() => (
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
    </Table>
  ));

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
  let tableRef!: HTMLTableElement;
  let scrollAreaRef!: HTMLDivElement;
  let captionRef!: HTMLTableCaptionElement;
  let rowRef!: HTMLTableRowElement;
  let cellRef!: HTMLTableCellElement;

  render(() => (
    <Table.ScrollArea ref={(element) => (scrollAreaRef = element)}>
      <Table ref={(element) => (tableRef = element)}>
        <Table.Caption ref={(element) => (captionRef = element)}>Invoices</Table.Caption>
        <Table.Body>
          <Table.Row ref={(element) => (rowRef = element)}>
            <Table.Cell ref={(element) => (cellRef = element)}>INV001</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Table.ScrollArea>
  ));

  expect(tableRef).toHaveAttribute('data-slot', 'table-root');
  expect(scrollAreaRef).toHaveAttribute('data-slot', 'table-scroll-area');
  expect(captionRef).toHaveAttribute('data-slot', 'table-caption');
  expect(rowRef).toHaveAttribute('data-slot', 'table-row');
  expect(cellRef).toHaveAttribute('data-slot', 'table-cell');
});

test('preserves semantic root composition with native Ark Solid asChild', () => {
  render(() => (
    <Table
      asChild={(props) => <section {...props()} aria-label="Invoice table" />}
      size="sm"
      variant="outline"
    />
  ));

  const section = screen.getByRole('region', { name: 'Invoice table' });

  expect(section).toHaveAttribute('data-scope', 'table');
  expect(section).toHaveAttribute('data-part', 'root');
  expect(section).toHaveAttribute('data-slot', 'table-root');
  expect(section).toHaveAttribute('data-size', 'sm');
  expect(section).toHaveAttribute('data-variant', 'outline');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let tableRef: HTMLTableElement | undefined;

  render(() => (
    <Table
      ref={(element) => (tableRef = element)}
      asChild={(props) => <section {...props()} aria-label="Invoice table" />}
    />
  ));

  expect(tableRef).toBeUndefined();
});

test('renders the default and custom empty states', () => {
  render(() => (
    <Table>
      <Table.Body>
        <Table.Empty colSpan={3} data-testid="default-empty" />
        <Table.Empty colSpan={3} data-testid="custom-empty">
          No invoices found.
        </Table.Empty>
      </Table.Body>
    </Table>
  ));

  const defaultEmpty = screen.getByTestId('default-empty');
  const customEmpty = screen.getByTestId('custom-empty');

  expect(defaultEmpty).toHaveTextContent('No results.');
  expect(defaultEmpty).toHaveAttribute('data-part', 'empty');
  expect(defaultEmpty).toHaveAttribute('data-slot', 'table-empty');
  expect(defaultEmpty).toHaveAttribute('colspan', '3');
  expect(defaultEmpty.closest('tr')).toHaveAttribute('data-empty');
  expect(customEmpty).toHaveTextContent('No invoices found.');
  expect(customEmpty).toHaveAttribute('data-part', 'empty');
  expect(customEmpty).toHaveAttribute('colspan', '3');
});

test('supports replacing only the generated empty cell with asChild', () => {
  render(() => (
    <Table>
      <Table.Body>
        <Table.Empty
          colSpan={2}
          asChild={(props) => (
            <td {...props()} data-testid="custom-empty-cell">
              Nothing to review.
            </td>
          )}
        />
      </Table.Body>
    </Table>
  ));

  const emptyCell = screen.getByTestId('custom-empty-cell');

  expect(emptyCell.tagName).toBe('TD');
  expect(emptyCell).toHaveAttribute('data-scope', 'table');
  expect(emptyCell).toHaveAttribute('data-part', 'empty');
  expect(emptyCell).toHaveAttribute('data-slot', 'table-empty');
  expect(emptyCell).toHaveAttribute('colspan', '2');
  expect(emptyCell).toHaveTextContent('Nothing to review.');
});