import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
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
import SsrTable from './fixtures/SsrTable.vue';
import SsrTableHost from './fixtures/SsrTableHost.vue';

const tableComponents = {
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
};

test('renders the native table anatomy with stable hooks', async () => {
  render({
    components: tableComponents,
    template: `
      <TableScrollArea data-testid="scroll-area">
        <Table data-testid="table" size="lg" variant="outline">
          <TableColumnGroup data-testid="column-group">
            <TableColumn data-testid="column" html-width="40%" />
          </TableColumnGroup>
          <TableCaption data-testid="caption" side="top">Recent invoices</TableCaption>
          <TableHeader data-testid="header">
            <TableRow data-testid="header-row">
              <TableColumnHeader data-testid="column-header" scope="col">Invoice</TableColumnHeader>
              <TableColumnHeader data-testid="numeric-header" numeric>Amount</TableColumnHeader>
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
              <TableCell :colspan="1">Total</TableCell>
              <TableCell numeric>$250.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableScrollArea>
    `,
  });

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
    variant: 'outline',
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
  render(Table, { props: { size }, attrs: { 'data-testid': 'table' } });

  expect(screen.getByTestId('table').getAttribute('data-size')).toBe(size);
});

test('renders interactive, striped, sticky, and column-border state hooks', () => {
  render(Table, {
    props: {
      interactive: true,
      showColumnBorder: true,
      stickyHeader: true,
      striped: true,
      class: 'consumer-class',
    },
    attrs: { 'data-testid': 'table' },
  });

  const table = screen.getByTestId('table');

  expect(table.hasAttribute('data-interactive')).toBe(true);
  expect(table.hasAttribute('data-show-column-border')).toBe(true);
  expect(table.hasAttribute('data-sticky-header')).toBe(true);
  expect(table.hasAttribute('data-striped')).toBe(true);
  expect(table?.classList.contains('consumer-class')).toBe(true);
});

test('keeps public hooks when consumer data attributes conflict', () => {
  render({
    components: tableComponents,
    template: `
      <Table data-testid="table" data-scope="custom" data-part="custom" data-slot="custom"
        data-size="custom" data-variant="custom">
        <TableCaption data-testid="caption" data-scope="custom" data-part="custom"
          data-slot="custom" data-side="custom" />
        <TableBody><TableRow data-testid="row" data-scope="custom" data-part="custom" data-slot="custom" /></TableBody>
      </Table>
    `,
  });

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

test('supports native refs, fallthrough attrs, classes, and listeners', async () => {
  const tableRef = ref<ComponentPublicInstance>();
  const scrollAreaRef = ref<ComponentPublicInstance>();
  const captionRef = ref<ComponentPublicInstance>();
  const rowRef = ref<ComponentPublicInstance>();
  const cellRef = ref<ComponentPublicInstance>();
  const handleClick = rs.fn();

  render({
    components: tableComponents,
    setup: () => ({ tableRef, scrollAreaRef, captionRef, rowRef, cellRef, handleClick }),
    template: `
      <TableScrollArea ref="scrollAreaRef" data-testid="scroll-area" class="scroll-consumer">
        <Table ref="tableRef" class="table-consumer" data-testid="table">
          <TableCaption ref="captionRef">Invoices</TableCaption>
          <TableBody>
            <TableRow ref="rowRef" data-testid="row" @click="handleClick">
              <TableCell ref="cellRef">INV001</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableScrollArea>
    `,
  });

  const table = screen.getByTestId('table');
  const row = screen.getByTestId('row');
  expect(tableRef.value?.$el).toBe(table);
  expect(scrollAreaRef.value?.$el?.getAttribute('data-slot')).toBe('table-scroll-area');
  expect(captionRef.value?.$el?.getAttribute('data-slot')).toBe('table-caption');
  expect(rowRef.value?.$el).toBe(row);
  expect(cellRef.value?.$el?.getAttribute('data-slot')).toBe('table-cell');
  expect(table?.classList.contains('table-consumer')).toBe(true);
  expect(screen.getByTestId('scroll-area')?.classList.contains('scroll-consumer')).toBe(true);
  await page.getByTestId('row').click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('preserves semantic root composition with native Ark Vue asChild', () => {
  render({
    components: { Table },
    template:
      '<Table as-child size="sm" variant="outline"><section aria-label="Invoice table" /></Table>',
  });

  expect(screen.getByRole('region', { name: 'Invoice table' }).dataset).toMatchObject({
    scope: 'table',
    part: 'root',
    slot: 'table-root',
    size: 'sm',
    variant: 'outline',
  });
});

test('forwards refs through native Ark Vue asChild composition', () => {
  const tableRef = ref<ComponentPublicInstance>();

  render({
    components: { Table },
    setup: () => ({ tableRef }),
    template: '<Table ref="tableRef" as-child><section aria-label="Invoice table" /></Table>',
  });

  const section = screen.getByRole('region', { name: 'Invoice table' });
  expect(tableRef.value?.$el).toBe(section);
  expect(tableRef.value?.$el?.getAttribute('data-slot')).toBe('table-root');
});

test('renders default and custom empty states with cell refs', async () => {
  const emptyRef = ref<ComponentPublicInstance>();

  render({
    components: tableComponents,
    setup: () => ({ emptyRef }),
    template: `
      <Table>
        <TableBody>
          <TableEmpty :col-span="3" data-testid="default-empty" />
          <TableEmpty ref="emptyRef" :col-span="3" data-testid="custom-empty">No invoices found.</TableEmpty>
        </TableBody>
      </Table>
    `,
  });

  const defaultEmpty = screen.getByTestId('default-empty');
  const customEmpty = screen.getByTestId('custom-empty');
  const defaultEmptyLocator = page.getByTestId('default-empty');
  await expect.element(defaultEmptyLocator).toContainText('No results.');
  expect(defaultEmpty.dataset).toMatchObject({ part: 'empty', slot: 'table-empty' });
  await expect.element(defaultEmptyLocator).toHaveAttribute('colspan', '3');
  expect(defaultEmpty.closest('tr')?.hasAttribute('data-empty')).toBe(true);
  const customEmptyLocator = page.getByTestId('custom-empty');
  await expect.element(customEmptyLocator).toContainText('No invoices found.');
  expect(emptyRef.value?.$el).toBe(customEmpty);
  expect(customEmpty.getAttribute('data-part')).toBe('empty');
  await expect.element(customEmptyLocator).toHaveAttribute('colspan', '3');
});

test('supports replacing only the generated empty cell with asChild', async () => {
  const emptyRef = ref<ComponentPublicInstance>();

  render({
    components: tableComponents,
    setup: () => ({ emptyRef }),
    template: `
      <Table>
        <TableBody>
          <TableEmpty ref="emptyRef" :col-span="2" class="custom-empty" as-child>
            <td data-testid="custom-empty-cell">Nothing to review.</td>
          </TableEmpty>
        </TableBody>
      </Table>
    `,
  });

  const emptyCell = screen.getByTestId('custom-empty-cell');
  expect(emptyCell.tagName).toBe('TD');
  expect(emptyCell?.classList.contains('custom-empty')).toBe(true);
  expect(emptyCell.closest('tr')?.hasAttribute('data-empty')).toBe(true);

  expect(emptyCell.dataset).toMatchObject({ scope: 'table', part: 'empty', slot: 'table-empty' });
  await expect.element(page.getByTestId('custom-empty-cell')).toHaveAttribute('colspan', '2');
  expect(emptyRef.value?.$el).toBe(emptyCell);
});

test('forwards the column slot to a semantic asChild host and preserves htmlWidth precedence', async () => {
  const columnRef = ref<ComponentPublicInstance>();
  render({
    components: tableComponents,
    setup: () => ({ columnRef }),
    template: `
      <Table>
        <TableColumnGroup>
          <TableColumn ref="columnRef" as-child html-width="40%" width="60%">
            <col data-testid="custom-column" />
          </TableColumn>
        </TableColumnGroup>
      </Table>
    `,
  });
  const column = screen.getByTestId('custom-column');
  expect(column.tagName).toBe('COL');
  await expect.element(page.getByTestId('custom-column')).toHaveAttribute('width', '40%');
  expect(column.getAttribute('data-slot')).toBe('table-column');
  expect(columnRef.value?.$el).toBe(column);
});

test('keeps sticky-column hooks on native table cells', () => {
  render({
    components: tableComponents,
    template: `
      <TableScrollArea>
        <Table>
          <TableHeader><TableRow><TableColumnHeader data-sticky="start">Project</TableColumnHeader></TableRow></TableHeader>
          <TableBody><TableRow><TableCell data-sticky="start">Docs redesign</TableCell></TableRow></TableBody>
        </Table>
      </TableScrollArea>
    `,
  });

  expect(screen.getByRole('columnheader', { name: 'Project' }).getAttribute('data-sticky')).toBe(
    'start',
  );
  expect(screen.getByRole('cell', { name: 'Docs redesign' }).getAttribute('data-sticky')).toBe(
    'start',
  );
});

test('hydrates native table sections, spanning cells, and an empty row', async () => {
  const html = await renderToString(createSSRApp(SsrTable));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverHosts = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrTable);
  try {
    const instance = app.mount(host);
    await nextTick();
    expect([...host.querySelectorAll('[data-slot]')]).toHaveLength(serverHosts.length);
    [...host.querySelectorAll('[data-slot]')].forEach((element, index) =>
      expect(element).toBe(serverHosts[index]),
    );
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    const cell = host.querySelector('[data-slot="table-empty"]');
    expect(
      instance.$refs.emptyRef && (instance.$refs.emptyRef as ComponentPublicInstance).$el,
    ).toBe(cell);
    expect(cell?.getAttribute('colspan')).toBe('2');
    expect(host.querySelector('tfoot td')?.getAttribute('colspan')).toBe('2');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});

test('renders and hydrates the native anatomy without replacement', async () => {
  const html = await renderToString(createSSRApp(SsrTableHost));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverHosts = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrTableHost);
  try {
    app.mount(host);
    await nextTick();
    expect([...host.querySelectorAll('[data-slot]')]).toHaveLength(serverHosts.length);
    [...host.querySelectorAll('[data-slot]')].forEach((element, index) =>
      expect(element).toBe(serverHosts[index]),
    );
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    expect(host.querySelector('section')?.classList.contains('hydrated-table')).toBe(true);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});