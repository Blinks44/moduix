import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumn,
  TableColumnGroup,
  TableColumnHeader,
  TableFooter,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@/index';

test('renders the native table anatomy with stable hooks', async () => {
  render(
    <TableScrollArea data-testid="scroll-area">
      <Table data-testid="table" size="lg">
        <TableColumnGroup data-testid="column-group">
          <TableColumn data-testid="column" width="40%" />
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
    </TableScrollArea>,
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

  const cell = screen.getByTestId('cell');
  const numericCell = screen.getAllByText('$250.00')[0];

  expect(scrollArea.tagName).toBe('DIV');
  expect(scrollArea.dataset).toMatchObject({ part: 'scroll-area', slot: 'table-scroll-area' });
  expect(table.tagName).toBe('TABLE');

  expect(table.dataset).toMatchObject({
    scope: 'table',
    part: 'root',
    slot: 'table-root',
    size: 'lg',
  });
  expect(columnGroup.tagName).toBe('COLGROUP');
  expect(columnGroup.dataset).toMatchObject({ part: 'column-group', slot: 'table-column-group' });
  expect(column.tagName).toBe('COL');

  expect(column.dataset).toMatchObject({ part: 'column', slot: 'table-column' });
  await expect.element(page.getByTestId('column')).toHaveAttribute('width', '40%');
  expect(caption.tagName).toBe('CAPTION');
  expect(caption.dataset).toMatchObject({ part: 'caption', side: 'top' });
  expect(header.tagName).toBe('THEAD');
  expect(header.getAttribute('data-part')).toBe('header');
  expect(body.tagName).toBe('TBODY');
  expect(body.getAttribute('data-part')).toBe('body');
  expect(footer.tagName).toBe('TFOOT');
  expect(footer.getAttribute('data-part')).toBe('footer');
  expect(row.tagName).toBe('TR');
  expect(row.getAttribute('data-part')).toBe('row');
  expect(columnHeader.tagName).toBe('TH');
  await expect.element(page.getByTestId('column-header')).toHaveAttribute('scope', 'col');
  expect(columnHeader.getAttribute('data-part')).toBe('column-header');
  expect(screen.getByTestId('numeric-header').getAttribute('data-numeric')).toBe('true');
  expect(cell.tagName).toBe('TD');
  expect(cell.getAttribute('data-part')).toBe('cell');
  expect(numericCell?.getAttribute('data-numeric')).toBe('true');
});

test.each(['sm', 'md', 'lg'] as const)('renders the %s size preset', (size) => {
  render(<Table data-testid="table" size={size} />);

  expect(screen.getByTestId('table').getAttribute('data-size')).toBe(size);
});

test('keeps public hooks when consumer data attributes conflict', () => {
  render(
    <Table
      data-testid="table"
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
      data-size="custom"
    >
      <TableCaption
        data-testid="caption"
        data-scope="custom"
        data-part="custom"
        data-slot="custom"
        data-side="custom"
      />
      <TableBody>
        <TableRow data-testid="row" data-scope="custom" data-part="custom" data-slot="custom" />
      </TableBody>
    </Table>,
  );

  expect(screen.getByTestId('table').dataset).toMatchObject({
    scope: 'table',
    part: 'root',
    slot: 'table-root',
    size: 'md',
  });

  expect(screen.getByTestId('caption').dataset).toMatchObject({
    scope: 'table',
    part: 'caption',
    slot: 'table-caption',
    side: 'bottom',
  });

  expect(screen.getByTestId('row').dataset).toMatchObject({
    scope: 'table',
    part: 'row',
    slot: 'table-row',
  });
});

test('supports native refs on the ordinary factory path', () => {
  const tableRef = createRef<HTMLTableElement>();
  const scrollAreaRef = createRef<HTMLDivElement>();
  const captionRef = createRef<HTMLTableCaptionElement>();
  const rowRef = createRef<HTMLTableRowElement>();
  const cellRef = createRef<HTMLTableCellElement>();

  render(
    <TableScrollArea ref={scrollAreaRef}>
      <Table ref={tableRef}>
        <TableCaption ref={captionRef}>Invoices</TableCaption>
        <TableBody>
          <TableRow ref={rowRef}>
            <TableCell ref={cellRef}>INV001</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableScrollArea>,
  );

  expect(tableRef.current?.getAttribute('data-slot')).toBe('table-root');
  expect(scrollAreaRef.current?.getAttribute('data-slot')).toBe('table-scroll-area');
  expect(captionRef.current?.getAttribute('data-slot')).toBe('table-caption');
  expect(rowRef.current?.getAttribute('data-slot')).toBe('table-row');
  expect(cellRef.current?.getAttribute('data-slot')).toBe('table-cell');
});

test('preserves semantic root composition with native Ark React asChild', () => {
  render(
    <Table asChild size="sm">
      <section aria-label="Invoice table" />
    </Table>,
  );

  expect(screen.getByRole('region', { name: 'Invoice table' }).dataset).toMatchObject({
    scope: 'table',
    part: 'root',
    slot: 'table-root',
    size: 'sm',
  });
});

test('forwards refs through native Ark React asChild composition', () => {
  const tableRef = createRef<HTMLTableElement>();

  render(
    <Table ref={tableRef} asChild>
      <section aria-label="Invoice table" />
    </Table>,
  );

  expect(tableRef.current).toBe(screen.getByRole('region', { name: 'Invoice table' }));
  expect(tableRef.current?.getAttribute('data-slot')).toBe('table-root');
});

test('keeps sticky-column hooks on native table cells', () => {
  render(
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
    </TableScrollArea>,
  );

  expect(screen.getByRole('columnheader', { name: 'Project' }).getAttribute('data-sticky')).toBe(
    'start',
  );
  expect(screen.getByRole('cell', { name: 'Docs redesign' }).getAttribute('data-sticky')).toBe(
    'start',
  );
});

test('renders the native table anatomy with stable hooks and defaults', async () => {
  render(
    <TableScrollArea data-testid="scroll-area">
      <Table data-testid="table" size="lg">
        <TableColumnGroup data-testid="column-group">
          <TableColumn data-testid="column" width="40%" />
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
    </TableScrollArea>,
  );

  const table = screen.getByTestId('table');
  const scrollArea = screen.getByTestId('scroll-area');
  const columnGroup = screen.getByTestId('column-group');

  const caption = screen.getByTestId('caption');
  const header = screen.getByTestId('header');
  const body = screen.getByTestId('body');
  const footer = screen.getByTestId('footer');
  const row = screen.getByTestId('row');
  const columnHeader = screen.getByTestId('column-header');
  const numericHeader = screen.getByTestId('numeric-header');
  const cell = screen.getByTestId('cell');

  expect(scrollArea.tagName).toBe('DIV');
  expect(scrollArea.dataset).toMatchObject({ part: 'scroll-area', slot: 'table-scroll-area' });
  expect(table.tagName).toBe('TABLE');

  expect(table.dataset).toMatchObject({
    scope: 'table',
    part: 'root',
    slot: 'table-root',
    size: 'lg',
  });
  expect(columnGroup.tagName).toBe('COLGROUP');
  expect(columnGroup.getAttribute('data-part')).toBe('column-group');

  expect(screen.getByTestId('column').dataset).toMatchObject({
    part: 'column',
    slot: 'table-column',
  });
  await expect.element(page.getByTestId('column')).toHaveAttribute('width', '40%');
  expect(caption.tagName).toBe('CAPTION');
  expect(caption.dataset).toMatchObject({ part: 'caption', side: 'top' });
  expect(header.tagName).toBe('THEAD');
  expect(header.getAttribute('data-part')).toBe('header');
  expect(body.tagName).toBe('TBODY');
  expect(body.getAttribute('data-part')).toBe('body');
  expect(footer.tagName).toBe('TFOOT');
  expect(footer.getAttribute('data-part')).toBe('footer');
  expect(row.tagName).toBe('TR');
  expect(row.getAttribute('data-part')).toBe('row');
  expect(columnHeader.tagName).toBe('TH');
  await expect.element(page.getByTestId('column-header')).toHaveAttribute('scope', 'col');
  expect(numericHeader.hasAttribute('data-numeric')).toBe(true);
  expect(cell.tagName).toBe('TD');
  expect(cell.getAttribute('data-part')).toBe('cell');
});