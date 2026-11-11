import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import { Table } from '@/components/table';
import AsChildColumnTable from './table/AsChildColumnTable.svelte';
import AsChildEmptyTable from './table/AsChildEmptyTable.svelte';
import AsChildTable from './table/AsChildTable.svelte';
import ConflictingTable from './table/ConflictingTable.svelte';
import EmptyTable from './table/EmptyTable.svelte';
import RefsTable from './table/RefsTable.svelte';
import StickyTable from './table/StickyTable.svelte';
import TableAnatomy from './table/TableAnatomy.svelte';

test('renders the native table anatomy with stable hooks', async () => {
  render(TableAnatomy);

  const scrollArea = screen.getByTestId('scroll-area');
  const table = screen.getByTestId('table');
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
  expect(numericHeader.getAttribute('data-numeric')).toBe('true');
  expect(numericHeader.hasAttribute('data-numeric')).toBe(true);
  expect(cell.tagName).toBe('TD');
  expect(cell.getAttribute('data-part')).toBe('cell');
  expect(numericCell?.getAttribute('data-numeric')).toBe('true');
});

test.each(['sm', 'md', 'lg'] as const)('renders the %s size preset', (size) => {
  render(Table, { props: { size, 'data-testid': 'table' } });

  expect(screen.getByTestId('table').getAttribute('data-size')).toBe(size);
});

test('keeps public hooks when consumer data attributes conflict', () => {
  render(ConflictingTable);

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

test('supports native refs, fallthrough attrs, classes, and listeners', async () => {
  const handleClick = rs.fn();
  const { component } = render(RefsTable, { props: { handleClick } });

  const table = screen.getByTestId('table');
  const row = screen.getByTestId('row');
  const refs = component.getRefs();
  expect(refs.table).toBe(table);
  expect(refs.scrollArea?.getAttribute('data-slot')).toBe('table-scroll-area');
  expect(refs.caption?.getAttribute('data-slot')).toBe('table-caption');
  expect(refs.row).toBe(row);
  expect(refs.cell?.getAttribute('data-slot')).toBe('table-cell');
  expect(table.classList.contains('table-consumer')).toBe(true);
  expect(screen.getByTestId('scroll-area').classList.contains('scroll-consumer')).toBe(true);
  await page.getByTestId('row').click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('preserves semantic root composition with native Ark Svelte asChild', () => {
  render(AsChildTable);

  expect(screen.getByRole('region', { name: 'Invoice table' }).dataset).toMatchObject({
    scope: 'table',
    part: 'root',
    slot: 'table-root',
    size: 'sm',
  });
});

test('forwards refs through native Ark Svelte asChild composition', () => {
  const { component } = render(AsChildTable);

  const section = screen.getByRole('region', { name: 'Invoice table' });
  expect(component.getRoot()).toBe(section);
  expect(component.getRoot()?.getAttribute('data-slot')).toBe('table-root');
});

test('renders default and custom empty states with cell refs', async () => {
  const { component } = render(EmptyTable);

  const defaultEmpty = screen.getByTestId('default-empty');
  const customEmpty = screen.getByTestId('custom-empty');
  const defaultEmptyLocator = page.getByTestId('default-empty');
  await expect.element(defaultEmptyLocator).toContainText('No results.');
  expect(defaultEmpty.dataset).toMatchObject({ part: 'empty', slot: 'table-empty' });
  await expect.element(defaultEmptyLocator).toHaveAttribute('colspan', '3');
  expect(defaultEmpty.closest('tr')?.hasAttribute('data-empty')).toBe(true);
  const customEmptyLocator = page.getByTestId('custom-empty');
  await expect.element(customEmptyLocator).toContainText('No invoices found.');
  expect(component.getEmpty()).toBe(customEmpty);
  expect(customEmpty.getAttribute('data-part')).toBe('empty');
  await expect.element(customEmptyLocator).toHaveAttribute('colspan', '3');
});

test('supports replacing only the generated empty cell with asChild', async () => {
  const { component } = render(AsChildEmptyTable);

  const emptyCell = screen.getByTestId('custom-empty-cell');
  expect(emptyCell.tagName).toBe('TD');
  expect(emptyCell.classList.contains('custom-empty')).toBe(true);
  expect(emptyCell.closest('tr')?.hasAttribute('data-empty')).toBe(true);

  expect(emptyCell.dataset).toMatchObject({ scope: 'table', part: 'empty', slot: 'table-empty' });
  await expect.element(page.getByTestId('custom-empty-cell')).toHaveAttribute('colspan', '2');
  expect(component.getEmpty()).toBe(emptyCell);
});

test('forwards the column snippet to a semantic asChild host', async () => {
  const { component } = render(AsChildColumnTable);
  const column = screen.getByTestId('custom-column');
  expect(column.tagName).toBe('COL');
  await expect.element(page.getByTestId('custom-column')).toHaveAttribute('width', '40%');
  expect(column.getAttribute('data-slot')).toBe('table-column');
  expect(component.getColumn()).toBe(column);
});

test('keeps sticky-column hooks on native table cells', () => {
  render(StickyTable);

  expect(screen.getByRole('columnheader', { name: 'Project' }).getAttribute('data-sticky')).toBe(
    'start',
  );
  expect(screen.getByRole('cell', { name: 'Docs redesign' }).getAttribute('data-sticky')).toBe(
    'start',
  );
});