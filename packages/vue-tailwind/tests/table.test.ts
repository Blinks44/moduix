import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
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

test('renders the native table anatomy with stable hooks and defaults', () => {
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
  render(Table, { props: { size }, attrs: { 'data-testid': 'table' } });

  expect(screen.getByTestId('table')).toHaveAttribute('data-size', size);
});

test('renders interactive, striped, sticky, and column-border state hooks', () => {
  render(Table, {
    props: {
      interactive: true,
      showColumnBorder: true,
      stickyHeader: true,
      striped: true,
      class: 'consumer-class w-auto',
    },
    attrs: { 'data-testid': 'table' },
  });

  const table = screen.getByTestId('table');
  expect(table).toHaveAttribute('data-interactive');
  expect(table).toHaveAttribute('data-show-column-border');
  expect(table).toHaveAttribute('data-sticky-header');
  expect(table).toHaveAttribute('data-striped');
  expect(table).toHaveClass('consumer-class', 'w-auto');
  expect(table).not.toHaveClass('w-full');
});

test('scopes interactive row styles to body rows', () => {
  render({
    components: tableComponents,
    template: `
      <Table interactive striped>
        <TableHeader><TableRow data-testid="header-row"><TableColumnHeader>Invoice</TableColumnHeader></TableRow></TableHeader>
        <TableBody data-testid="body"><TableRow data-testid="body-row"><TableCell>INV001</TableCell></TableRow></TableBody>
      </Table>
    `,
  });

  const body = screen.getByTestId('body');
  const bodyRow = screen.getByTestId('body-row');
  expect(body).toHaveClass('group/table-body');
  expect(bodyRow).toHaveClass(
    'transition-colors duration-200 ease-in-out motion-reduce:transition-none',
    'group-data-[interactive]/table:group-data-[slot=table-body]/table-body:[&:not([data-empty])]:hover:bg-muted',
    'group-data-[interactive]/table:group-data-[slot=table-body]/table-body:[&:not([data-empty])]:focus-within:bg-muted',
    'group-data-[striped]/table:group-data-[slot=table-body]/table-body:[&:nth-child(even):not([data-empty]):not(:hover):not(:focus-within)]:bg-muted/35',
  );
});

test('keeps public hooks when consumer data attributes conflict', () => {
  render({
    components: tableComponents,
    template: `
      <Table data-testid="table" data-scope="custom" data-part="custom" data-slot="custom"
        data-size="custom" data-variant="custom">
        <TableCaption data-testid="caption" data-scope="custom" data-part="custom"
          data-slot="custom" data-side="custom" />
        <TableRow data-testid="row" data-scope="custom" data-part="custom" data-slot="custom" />
      </Table>
    `,
  });

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

test('supports native refs, fallthrough attrs, classes, and listeners', async () => {
  const tableRef = ref<ComponentPublicInstance>();
  const scrollAreaRef = ref<ComponentPublicInstance>();
  const captionRef = ref<ComponentPublicInstance>();
  const rowRef = ref<ComponentPublicInstance>();
  const cellRef = ref<ComponentPublicInstance>();
  const handleClick = rs.fn();
  const Harness = defineComponent({
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

  render(Harness);

  const table = screen.getByTestId('table');
  const row = screen.getByTestId('row');
  expect(tableRef.value?.$el).toBe(table);
  expect(scrollAreaRef.value?.$el).toHaveAttribute('data-slot', 'table-scroll-area');
  expect(captionRef.value?.$el).toHaveAttribute('data-slot', 'table-caption');
  expect(rowRef.value?.$el).toBe(row);
  expect(cellRef.value?.$el).toHaveAttribute('data-slot', 'table-cell');
  expect(table).toHaveClass('table-consumer');
  expect(screen.getByTestId('scroll-area')).toHaveClass('scroll-consumer');
  await fireEvent.click(row);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('preserves semantic root composition with native Ark Vue asChild', () => {
  render({
    components: { Table },
    template:
      '<Table as-child size="sm" variant="outline"><section aria-label="Invoice table" /></Table>',
  });

  const section = screen.getByRole('region', { name: 'Invoice table' });
  expect(section).toHaveAttribute('data-scope', 'table');
  expect(section).toHaveAttribute('data-part', 'root');
  expect(section).toHaveAttribute('data-slot', 'table-root');
  expect(section).toHaveAttribute('data-size', 'sm');
  expect(section).toHaveAttribute('data-variant', 'outline');
});

test('forwards refs through native Ark Vue asChild composition', () => {
  const tableRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: { Table },
    setup: () => ({ tableRef }),
    template: '<Table ref="tableRef" as-child><section aria-label="Invoice table" /></Table>',
  });

  render(Harness);

  const section = screen.getByRole('region', { name: 'Invoice table' });
  expect(tableRef.value?.$el).toBe(section);
  expect(tableRef.value?.$el).toHaveAttribute('data-slot', 'table-root');
});

test('renders default and custom empty states with cell refs', () => {
  const emptyRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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

  render(Harness);

  const defaultEmpty = screen.getByTestId('default-empty');
  const customEmpty = screen.getByTestId('custom-empty');
  expect(defaultEmpty).toHaveTextContent('No results.');
  expect(defaultEmpty).toHaveAttribute('data-part', 'empty');
  expect(defaultEmpty).toHaveAttribute('data-slot', 'table-empty');
  expect(defaultEmpty).toHaveAttribute('colspan', '3');
  expect(defaultEmpty.closest('tr')).toHaveAttribute('data-empty');
  expect(customEmpty).toHaveTextContent('No invoices found.');
  expect(emptyRef.value?.$el).toBe(customEmpty);
  expect(customEmpty).toHaveAttribute('data-part', 'empty');
  expect(customEmpty).toHaveAttribute('colspan', '3');
});

test('supports replacing only the generated empty cell with asChild', () => {
  const emptyRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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

  render(Harness);

  const emptyCell = screen.getByTestId('custom-empty-cell');
  expect(emptyCell.tagName).toBe('TD');
  expect(emptyCell).toHaveClass('custom-empty');
  expect(emptyCell.closest('tr')).toHaveAttribute('data-empty');
  expect(emptyCell).toHaveAttribute('data-scope', 'table');
  expect(emptyCell).toHaveAttribute('data-part', 'empty');
  expect(emptyCell).toHaveAttribute('data-slot', 'table-empty');
  expect(emptyCell).toHaveAttribute('colspan', '2');
  expect(emptyRef.value?.$el).toBe(emptyCell);
});

test('forwards the column slot to a semantic asChild host and preserves htmlWidth precedence', () => {
  const columnRef = ref<ComponentPublicInstance>();
  render(
    defineComponent({
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
    }),
  );
  const column = screen.getByTestId('custom-column');
  expect(column.tagName).toBe('COL');
  expect(column).toHaveAttribute('width', '40%');
  expect(column).toHaveAttribute('data-slot', 'table-column');
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

  expect(screen.getByRole('columnheader', { name: 'Project' })).toHaveAttribute(
    'data-sticky',
    'start',
  );
  expect(screen.getByRole('cell', { name: 'Docs redesign' })).toHaveAttribute(
    'data-sticky',
    'start',
  );
});

test('hydrates native table sections, spanning cells, and an empty row', async () => {
  const emptyRef = ref<ComponentPublicInstance>();
  const App = defineComponent({
    components: tableComponents,
    setup: () => ({ emptyRef }),
    template: `
      <Table>
        <TableColumnGroup><TableColumn html-width="50%" /><TableColumn /></TableColumnGroup>
        <TableCaption>Invoices</TableCaption>
        <TableHeader><TableRow><TableColumnHeader>Invoice</TableColumnHeader><TableColumnHeader>Amount</TableColumnHeader></TableRow></TableHeader>
        <TableBody><TableEmpty ref="emptyRef" :col-span="2" /></TableBody>
        <TableFooter><TableRow><TableCell :colspan="2">Total</TableCell></TableRow></TableFooter>
      </Table>
    `,
  });
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(App));
  document.body.append(host);
  const cell = host.querySelector('[data-slot="table-empty"]');
  const table = host.querySelector('table');
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(App);
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelector('table')).toBe(table);
    expect(host.querySelector('[data-slot="table-empty"]')).toBe(cell);
    expect(emptyRef.value?.$el).toBe(cell);
    expect(cell).toHaveAttribute('colspan', '2');
    expect(host.querySelector('tfoot td')).toHaveAttribute('colspan', '2');
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
  const App = defineComponent({
    components: tableComponents,
    template: `
      <TableScrollArea>
        <Table as-child data-testid="table" class="hydrated-table">
          <section aria-label="Invoice table">Invoice table</section>
        </Table>
      </TableScrollArea>
    `,
  });
  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('<section');
  expect(html).toContain('data-slot="table-root"');
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const section = host.querySelector('section');
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(App);
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelector('section')).toBe(section);
    expect(section).toHaveClass('hydrated-table');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});