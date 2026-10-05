import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, h, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { SimpleGrid } from '../src';
import TestSimpleGrid from './fixtures/TestSimpleGrid.vue';

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
  expect(grid.getAttribute('data-scope')).toBe('simple-grid');
  expect(grid.getAttribute('data-part')).toBe('root');
  expect(grid.getAttribute('data-slot')).toBe('simple-grid-root');
  expect([...grid.classList]).toEqual(expect.arrayContaining(['grid', 'grid-cols-1']));
  expect(grid.style.gridTemplateColumns).toBe('');
  expect(grid.hasAttribute('role')).toBe(false);
  expect(getComputedStyle(grid).display).toBe('grid');
  expect(getComputedStyle(grid).gridTemplateColumns).toBe(
    `${grid.getBoundingClientRect().width}px`,
  );
});

test('reactively resolves fixed and intrinsic columns, including strings and zero', async () => {
  const { getByTestId, rerender } = render(SimpleGrid, {
    props: { columns: 3, style: { width: '480px' } },
    slots: { default: () => [h('div', 'One'), h('div', 'Two'), h('div', 'Three')] },
    attrs: { 'data-testid': 'grid' },
  });
  const grid = getByTestId('grid');
  expect(getComputedStyle(grid).gridTemplateColumns).toBe('160px 160px 160px');
  await rerender({ columns: 3, minChildWidth: 240 });
  expect(grid.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(min(100%, 240px), 1fr))');
  expect(getComputedStyle(grid).gridTemplateColumns).toBe('240px 240px');
  await rerender({ minChildWidth: '10rem' });
  expect(grid.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(min(100%, 10rem), 1fr))');
  await rerender({ minChildWidth: 0 });
  expect(grid.style.gridTemplateColumns).toBe('repeat(auto-fit, minmax(min(100%, 0px), 1fr))');
  await rerender({ columns: undefined, minChildWidth: undefined });
  expect(grid.style.gridTemplateColumns).toBe('');
  expect(getByTestId('grid')).toBe(grid);
  expect(getComputedStyle(grid).gridTemplateColumns).toBe('480px');
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
  expect(grid.style.gap).toBe('1rem 8px');
  expect(grid.style.rowGap).toBe('1rem');
  expect(grid.style.columnGap).toBe('8px');
  expect(getComputedStyle(grid)).toMatchObject({
    display: 'block',
    rowGap: '16px',
    columnGap: '8px',
  });
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
  expect(grid.getAttribute('id')).toBe('projects');
  expect(grid.getAttribute('data-slot')).toBe('simple-grid-root');
  expect(grid.style.gridTemplateColumns).toBe('repeat(2, minmax(0px, 1fr))');
  expect([...grid.classList]).toEqual(expect.arrayContaining(['consumer-grid', 'project-list']));
  expect(grid.children).toHaveLength(2);
  expect(grid.firstElementChild?.textContent).toContain('Analytics');
  await page.getByRole('list', { name: 'Projects' }).click();
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

test('lets consumer utilities override fixed defaults without duplicate classes', () => {
  const { getByTestId } = render(SimpleGrid, {
    props: { class: 'block grid-cols-2' },
    attrs: { 'data-testid': 'grid' },
  });
  const grid = getByTestId('grid');
  expect([...grid.classList]).toEqual(expect.arrayContaining(['block', 'grid-cols-2']));
  expect([...grid.classList]).not.toContain('grid');
  expect([...grid.classList]).not.toContain('grid-cols-1');
  expect(grid.className).toBe('block grid-cols-2');
  expect(grid.style.display).toBe('');
  expect(grid.style.gridTemplateColumns).toBe('');
  expect(getComputedStyle(grid).display).toBe('block');
});

test('hydrates simple-grid without replacing the server host', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestSimpleGrid));
  document.body.append(host);
  const serverRoot = host.querySelector<HTMLElement>('ul')!;
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestSimpleGrid);
  try {
    const instance = app.mount(host) as InstanceType<typeof TestSimpleGrid>;
    await expect.element(page.getByRole('list', { name: 'Projects' })).toHaveCount(1);
    expect(host.querySelectorAll('ul')).toHaveLength(1);
    expect(host.querySelector('ul')).toBe(serverRoot);
    expect(serverRoot.dataset).toMatchObject({ slot: 'simple-grid-root' });
    expect([...serverRoot.classList]).toContain('hydrated-grid');
    expect(instance.rootRef?.$el).toBe(serverRoot);
    expect(serverRoot.children).toHaveLength(1);
    expect(serverRoot.style.gridTemplateColumns).toBe(
      'repeat(auto-fit, minmax(min(100%, 10rem), 1fr))',
    );
    expect(serverRoot.style.gap).toBe('12px');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});