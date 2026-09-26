import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumn,
  TableColumnGroup,
  TableColumnHeader,
  TableEmpty,
  TableFooter,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '../src';

test('renders the native table anatomy with stable hooks and defaults', () => {
  render(() => (
    <TableScrollArea data-testid="scroll-area">
      <Table data-testid="table" size="lg" variant="outline">
        <TableColumnGroup data-testid="column-group">
          <TableColumn data-testid="column" htmlWidth="40%" />
        </TableColumnGroup>
        <TableCaption data-testid="caption" side="top">
          Recent invoices
        </TableCaption>
        <TableHeader data-testid="header">
          <TableRow data-testid="header-row">
            <TableColumnHeader data-testid="column-header" scope="col">
              Invoice
            </TableColumnHeader>
            <TableColumnHeader data-testid="numeric-header" numeric>
              Amount
            </TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody data-testid="body">
          <TableRow data-testid="row">
            <TableCell data-testid="cell">INV001</TableCell>
            <TableCell numeric>$250.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter data-testid="footer">
          <TableRow>
            <TableCell colSpan={1}>Total</TableCell>
            <TableCell numeric>$250.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableScrollArea>
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
  const numericHeader = screen.getByTestId('numeric-header');
  const cell = screen.getByTestId('cell');

  expect(scrollArea.tagName).toBe('DIV');
  expect(scrollArea).toHaveAttribute('data-part', 'scroll-area');
  expect(scrollArea).toHaveAttribute('data-slot', 'table-scroll-area');
  expect(scrollArea).toHaveClass('overflow-x-auto', 'border', 'bg-card');
  expect(table.tagName).toBe('TABLE');
  expect(table).toHaveAttribute('data-scope', 'table');
  expect(table).toHaveAttribute('data-part', 'root');
  expect(table).toHaveAttribute('data-slot', 'table-root');
  expect(table).toHaveAttribute('data-size', 'lg');
  expect(table).toHaveAttribute('data-variant', 'outline');
  expect(table).toHaveClass('text-md', 'leading-6', 'border-collapse', 'border');
  expect(columnGroup.tagName).toBe('COLGROUP');
  expect(columnGroup).toHaveAttribute('data-part', 'column-group');
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
  expect(columnHeader).toHaveClass('px-4', 'py-3', 'text-muted-foreground', 'font-medium');
  expect(numericHeader).toHaveAttribute('data-numeric');
  expect(numericHeader).toHaveClass('text-end', 'tabular-nums');
  expect(cell.tagName).toBe('TD');
  expect(cell).toHaveAttribute('data-part', 'cell');
  expect(cell).toHaveClass('relative', 'align-middle');
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
      class="consumer-class w-auto"
    />
  ));

  const table = screen.getByTestId('table');

  expect(table).toHaveAttribute('data-interactive');
  expect(table).toHaveAttribute('data-show-column-border');
  expect(table).toHaveAttribute('data-sticky-header');
  expect(table).toHaveAttribute('data-striped');
  expect(table).toHaveClass('consumer-class', 'w-auto');
  expect(table).not.toHaveClass('w-full');
});

test('scopes interactive row styles to body rows', () => {
  render(() => (
    <Table interactive striped>
      <TableHeader>
        <TableRow data-testid="header-row">
          <TableColumnHeader>Invoice</TableColumnHeader>
        </TableRow>
      </TableHeader>
      <TableBody data-testid="body">
        <TableRow data-testid="body-row">
          <TableCell>INV001</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ));

  const body = screen.getByTestId('body');
  const bodyRow = screen.getByTestId('body-row');

  expect(body).toHaveClass('group/table-body');
  expect(bodyRow).toHaveClass(
    'transition-colors duration-200 ease-in-out motion-reduce:transition-none',
    'group-data-[interactive]/table:group-data-[slot=table-body]/table-body:[&:not([data-empty])]:hover:bg-muted',
    'group-data-[interactive]/table:group-data-[slot=table-body]/table-body:[&:not([data-empty])]:focus-within:bg-muted',
    'group-data-[striped]/table:group-data-[slot=table-body]/table-body:[&:nth-child(even):not([data-empty])]:bg-muted/35',
  );
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
      <TableCaption
        data-testid="caption"
        data-scope="custom"
        data-part="custom"
        data-slot="custom"
        data-side="custom"
      />
      <TableRow data-testid="row" data-scope="custom" data-part="custom" data-slot="custom" />
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
    <TableScrollArea ref={(element) => (scrollAreaRef = element)}>
      <Table ref={(element) => (tableRef = element)}>
        <TableCaption ref={(element) => (captionRef = element)}>Invoices</TableCaption>
        <TableBody>
          <TableRow ref={(element) => (rowRef = element)}>
            <TableCell ref={(element) => (cellRef = element)}>INV001</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableScrollArea>
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

test('renders the default and custom empty states', () => {
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

  expect(defaultEmpty).toHaveTextContent('No results.');
  expect(defaultEmpty).toHaveAttribute('data-part', 'empty');
  expect(defaultEmpty).toHaveAttribute('data-slot', 'table-empty');
  expect(defaultEmpty).toHaveAttribute('colspan', '3');
  expect(defaultEmpty).toHaveClass('py-6', 'text-center', 'text-muted-foreground');
  expect(defaultEmpty.closest('tr')).toHaveAttribute('data-empty');
  expect(defaultEmpty.closest('tr')).toHaveClass('motion-reduce:transition-none');
  expect(customEmpty).toHaveTextContent('No invoices found.');
  expect(emptyRef).toBe(customEmpty);
  expect(customEmpty).toHaveAttribute('data-part', 'empty');
  expect(customEmpty).toHaveAttribute('colspan', '3');
});

test('supports replacing only the generated empty cell with asChild', () => {
  render(() => (
    <Table>
      <TableBody>
        <TableEmpty
          colSpan={2}
          class="custom-empty"
          asChild={(props) => (
            <td {...props()} data-testid="custom-empty-cell">
              Nothing to review.
            </td>
          )}
        />
      </TableBody>
    </Table>
  ));

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
  render(() => (
    <TableScrollArea>
      <Table>
        <TableHeader>
          <TableRow>
            <TableColumnHeader data-sticky="start">Project</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell data-sticky="start">Docs redesign</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableScrollArea>
  ));

  expect(screen.getByRole('columnheader', { name: 'Project' })).toHaveAttribute(
    'data-sticky',
    'start',
  );
  expect(screen.getByRole('cell', { name: 'Docs redesign' })).toHaveAttribute(
    'data-sticky',
    'start',
  );
});