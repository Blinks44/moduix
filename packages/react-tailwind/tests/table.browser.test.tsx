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
  TableEmpty,
  TableFooter,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '../src';

test('renders the native table anatomy with stable hooks and defaults', async () => {
  render(
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
  expect([...scrollArea.classList]).toEqual(
    expect.arrayContaining(['overflow-x-auto', 'border', 'bg-card']),
  );
  expect(table.tagName).toBe('TABLE');

  expect(table.dataset).toMatchObject({
    scope: 'table',
    part: 'root',
    slot: 'table-root',
    size: 'lg',
    variant: 'outline',
  });
  expect([...table.classList]).toEqual(
    expect.arrayContaining(['text-md', 'leading-6', 'border-collapse', 'border']),
  );
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
  expect([...columnHeader.classList]).toEqual(
    expect.arrayContaining(['px-4', 'py-3', 'text-muted-foreground', 'font-medium']),
  );
  expect(numericHeader.hasAttribute('data-numeric')).toBe(true);
  expect([...numericHeader!.classList]).toEqual(
    expect.arrayContaining(['text-end', 'tabular-nums']),
  );
  expect(cell.tagName).toBe('TD');
  expect(cell.getAttribute('data-part')).toBe('cell');
  expect([...cell!.classList]).toEqual(expect.arrayContaining(['relative', 'align-middle']));
});

test.each(['sm', 'md', 'lg'] as const)('renders the %s size preset', (size) => {
  render(<Table data-testid="table" size={size} />);

  expect(screen.getByTestId('table').getAttribute('data-size')).toBe(size);
});

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
  expect(table.classList.contains('w-full')).toBe(false);
});

test('scopes interactive row styles to body rows', async () => {
  render(
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
    </Table>,
  );

  const body = screen.getByTestId('body');
  const bodyRow = screen.getByTestId('body-row');

  expect(body?.classList.contains('group/table-body')).toBe(true);
  expect([...bodyRow!.classList]).toEqual(
    expect.arrayContaining([
      'transition-colors',
      'duration-200',
      'ease-in-out',
      'motion-reduce:transition-none',
    ]),
  );
  expect([...bodyRow!.classList]).toEqual(
    expect.arrayContaining([
      'group-data-[interactive]/table:group-data-[slot=table-body]/table-body:[&:not([data-empty])]:hover:bg-muted',
      'group-data-[interactive]/table:group-data-[slot=table-body]/table-body:[&:not([data-empty])]:focus-within:bg-muted',
      'group-data-[striped]/table:group-data-[slot=table-body]/table-body:[&:nth-child(even):not([data-empty]):not(:hover):not(:focus-within)]:bg-muted/35',
    ]),
  );

  const headerRow = screen.getByTestId('header-row');
  const header = page.getByTestId('header-row');
  const row = page.getByTestId('body-row');
  await header.hover();
  const initialBackground = getComputedStyle(bodyRow).backgroundColor;
  const headerBackground = getComputedStyle(headerRow).backgroundColor;

  await row.hover();
  await expect.poll(() => getComputedStyle(bodyRow).backgroundColor).not.toBe(initialBackground);
  expect(getComputedStyle(headerRow).backgroundColor).toBe(headerBackground);

  await header.hover();
  await expect.poll(() => getComputedStyle(bodyRow).backgroundColor).toBe(initialBackground);
  expect(getComputedStyle(headerRow).backgroundColor).toBe(headerBackground);
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
    variant: 'line',
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
    <Table asChild size="sm" variant="outline">
      <section aria-label="Invoice table" />
    </Table>,
  );

  expect(screen.getByRole('region', { name: 'Invoice table' }).dataset).toMatchObject({
    scope: 'table',
    part: 'root',
    slot: 'table-root',
    size: 'sm',
    variant: 'outline',
  });
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
  expect([...defaultEmpty.classList]).toEqual(
    expect.arrayContaining(['py-6', 'text-center', 'text-muted-foreground']),
  );
  expect(defaultEmpty.closest('tr')?.hasAttribute('data-empty')).toBe(true);
  expect(defaultEmpty.closest('tr')?.classList.contains('motion-reduce:transition-none')).toBe(
    true,
  );
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