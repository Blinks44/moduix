import { expect, rs, test } from '@rstest/core';
import { fireEvent, render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { SimpleGrid } from '../src';

test('renders the default single-column root with stable hooks and a native ref', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const { getByTestId } = render({
    components: { SimpleGrid },
    setup: () => ({ rootRef }),
    template:
      '<SimpleGrid ref="rootRef" data-testid="grid" data-scope="custom" data-part="custom" data-slot="custom" />',
  });
  const grid = getByTestId('grid');
  expect(rootRef.value?.$el).toBe(grid);
  expect(grid).toHaveAttribute('data-scope', 'simple-grid');
  expect(grid).toHaveAttribute('data-part', 'root');
  expect(grid).toHaveAttribute('data-slot', 'simple-grid-root');
  expect(grid).toHaveClass('grid', 'grid-cols-1');
  expect(grid.style.gridTemplateColumns).toBe('');
  expect(grid).not.toHaveAttribute('role');
});

test('reactively resolves fixed and intrinsic columns, including strings and zero', async () => {
  const { getByTestId, rerender } = render(SimpleGrid, {
    props: { columns: 3 },
    attrs: { 'data-testid': 'grid' },
  });
  const grid = getByTestId('grid');
  expect(grid.style.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))');
  await rerender({ columns: 3, minChildWidth: 240 });
  expect(grid.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(min(100%, 240px), 1fr))');
  await rerender({ minChildWidth: '10rem' });
  expect(grid.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(min(100%, 10rem), 1fr))');
  await rerender({ minChildWidth: 0 });
  expect(grid.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(min(100%, 0px), 1fr))');
  await rerender({ columns: undefined, minChildWidth: undefined });
  expect(grid.style.gridTemplateColumns).toBe('');
});

test('applies numeric gaps as pixels and lets styles override generated layout', () => {
  const { getByTestId } = render(SimpleGrid, {
    props: {
      columns: 2,
      gap: 12,
      rowGap: '1rem',
      columnGap: 8,
      style: { display: 'block', gridTemplateColumns: 'subgrid' },
    },
    attrs: { 'data-testid': 'grid' },
  });
  const grid = getByTestId('grid');
  expect(grid.style.display).toBe('block');
  expect(grid.style.gridTemplateColumns).toBe('subgrid');
  expect(grid.style.gap).toBe('12px');
  expect(grid.style.rowGap).toBe('1rem');
  expect(grid.style.columnGap).toBe('8px');
});

test('preserves native string and array style overrides', async () => {
  const { getByTestId, rerender } = render(SimpleGrid, {
    props: { gap: 12, style: 'display: block; grid-template-columns: subgrid; gap: 4px' },
    attrs: { 'data-testid': 'grid' },
  });
  const grid = getByTestId('grid');
  expect(grid.style.display).toBe('block');
  expect(grid.style.gridTemplateColumns).toBe('subgrid');
  expect(grid.style.gap).toBe('4px');
  await rerender({ style: [{ color: 'red', gap: '8px' }, { gap: '16px' }] });
  expect(grid.style.color).toBe('red');
  expect(grid.style.gap).toBe('16px');
});

test('preserves semantic asChild hosts, slots, attrs, classes, listeners, and refs', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const handleClick = rs.fn();
  const { getByRole } = render({
    components: { SimpleGrid },
    setup: () => ({ rootRef, handleClick }),
    template: `
      <SimpleGrid ref="rootRef" as-child :columns="2" class="consumer-grid" id="projects" @click="handleClick">
        <ul aria-label="Projects" class="project-list"><li>Analytics</li><li>Billing</li></ul>
      </SimpleGrid>
    `,
  });
  const grid = getByRole('list', { name: 'Projects' });
  expect(rootRef.value?.$el).toBe(grid);
  expect(grid).toHaveAttribute('id', 'projects');
  expect(grid).toHaveAttribute('data-slot', 'simple-grid-root');
  expect(grid.style.gridTemplateColumns).toBe('repeat(2, minmax(0, 1fr))');
  expect(grid).toHaveClass('consumer-grid', 'project-list');
  expect(grid.children).toHaveLength(2);
  expect(grid.firstElementChild).toHaveTextContent('Analytics');
  await fireEvent.click(grid);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('rejects invalid column counts even when minChildWidth has priority', () => {
  for (const columns of [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
    expect(() => render(SimpleGrid, { props: { columns, minChildWidth: 240 } })).toThrow(
      'SimpleGrid `columns` must be a finite positive integer.',
    );
  }
});

test('rejects invalid numeric minimum child widths', () => {
  for (const minChildWidth of [
    -1,
    Number.NaN,
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
  ]) {
    expect(() => render(SimpleGrid, { props: { minChildWidth } })).toThrow(
      'SimpleGrid `minChildWidth` must be a finite non-negative number.',
    );
  }
});

test('renders and hydrates semantic hosts without mismatches or replacement', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const App = defineComponent({
    components: { SimpleGrid },
    setup: () => ({ rootRef }),
    template: `
      <SimpleGrid ref="rootRef" as-child min-child-width="10rem" :gap="12" class="hydrated-grid">
        <ul aria-label="Projects"><li>Analytics</li></ul>
      </SimpleGrid>
    `,
  });
  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('<ul');
  expect(html).toContain('data-slot="simple-grid-root"');
  expect(html).toContain('gap:12px');
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const grid = host.querySelector('ul');
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(App);
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelector('ul')).toBe(grid);
    expect(rootRef.value?.$el).toBe(grid);
    expect(grid).toHaveClass('hydrated-grid');
    expect(grid?.children).toHaveLength(1);
    expect(grid?.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(min(100%, 10rem), 1fr))');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});

test('lets consumer utilities override fixed defaults without duplicate classes', () => {
  const { getByTestId } = render(SimpleGrid, {
    props: { class: 'block grid-cols-2' },
    attrs: { 'data-testid': 'grid' },
  });
  const grid = getByTestId('grid');
  expect(grid).toHaveClass('block', 'grid-cols-2');
  expect(grid).not.toHaveClass('grid', 'grid-cols-1');
  expect(grid.className).toBe('block grid-cols-2');
  expect(grid.style.display).toBe('');
  expect(grid.style.gridTemplateColumns).toBe('');
});