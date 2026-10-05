import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { List, ListItem } from '../src';
import SsrList from './fixtures/SsrList.vue';

const listComponents = { List, ListItem };

test.each([false, true])(
  'keeps the host and ref stable between semantic changes, asChild=%s',
  async (asChild) => {
    const element = ref<NonNullable<InstanceType<typeof List>['$props']['as']>>();
    const title = ref('Initial');
    const rootRef = ref<ComponentPublicInstance>();
    render({
      components: { List },
      setup: () => ({ element, title, rootRef, asChild }),
      template: `
      <List ref="rootRef" :as="element" :as-child="asChild" :title="title" data-testid="root">
        <ul><li>Content</li></ul>
      </List>
    `,
    });
    for (const as of ['ul', 'ol'] as const) {
      element.value = as;
      await nextTick();
      const host = screen.getByTestId('root');
      expect(host.tagName).toBe(asChild ? 'UL' : as.toUpperCase());
      expect(rootRef.value?.$el).toBe(host);
      title.value = as;
      await nextTick();
      expect(screen.getByTestId('root')).toBe(host);
      expect(rootRef.value?.$el).toBe(host);
      await expect.element(page.getByTestId('root')).toHaveAttribute('title', as);
      await expect.element(page.getByTestId('root')).toContainText('Content');
    }
    element.value = undefined;
    await nextTick();
    expect(screen.getByTestId('root').tagName).toBe(asChild ? 'UL' : 'UL');
  },
);

test('updates the semantic host when as changes', async () => {
  const element = ref<'ul' | 'ol'>('ul');

  render({
    components: listComponents,
    setup() {
      return { element };
    },
    template: `<List :as="element" :start="element === 'ol' ? 3 : undefined">Tasks</List>`,
  });

  expect(screen.getByRole('list').tagName).toBe('UL');
  element.value = 'ol';

  await expect.poll(() => screen.getByRole('list').tagName).toBe('OL');
  await expect.element(page.getByRole('list')).toHaveAttribute('start', '3');
  await expect.element(page.getByRole('list')).toContainText('Tasks');
});

test('renders semantic unordered-list defaults and forwards Vue refs and attrs', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const itemRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: listComponents,
    setup() {
      return { itemRef, rootRef };
    },
    template: `
      <List ref="rootRef" data-testid="list" data-probe="root" class="consumer-class">
        <ListItem ref="itemRef">Keep the item ref on its semantic host.</ListItem>
      </List>
    `,
  });

  const list = screen.getByTestId('list');
  const item = screen.getByText('Keep the item ref on its semantic host.');

  expect(list.tagName).toBe('UL');

  expect(list.dataset).toMatchObject({ gap: 'sm', marker: 'auto', size: 'md', tone: 'default' });
  expect(list?.classList.contains('consumer-class')).toBe(true);
  expect(rootRef.value?.$el).toBe(list);
  expect(itemRef.value?.$el).toBe(item);

  expect(item.dataset).toMatchObject({ scope: 'list', part: 'item', slot: 'list-item' });
});

test('renders semantic roots with stable hooks and native ordered-list props', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: listComponents,
    setup() {
      return { rootRef };
    },
    template: `
      <List ref="rootRef" as="ol" :start="3" type="A" data-testid="list">
        <ListItem>Prepare the release notes.</ListItem>
      </List>
    `,
  });

  const list = screen.getByTestId('list');

  expect(rootRef.value?.$el).toBe(list);
  expect(list.tagName).toBe('OL');
  const listLocator = page.getByTestId('list');
  await expect.element(listLocator).toHaveAttribute('start', '3');
  await expect.element(listLocator).toHaveAttribute('type', 'A');
  expect(list.dataset).toMatchObject({ scope: 'list', part: 'root', slot: 'list-root' });
});

test('keeps markerless list semantics and supports custom semantic roots', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: listComponents,
    setup() {
      return { rootRef };
    },
    template: `
      <List ref="rootRef" as-child marker="none">
        <ul aria-label="Release tasks">
          <ListItem as-child><li>Publish the package.</li></ListItem>
        </ul>
      </List>
    `,
  });

  const list = screen.getByRole('list', { name: 'Release tasks' });

  expect(rootRef.value?.$el).toBe(list);

  await expect
    .element(page.getByRole('list', { name: 'Release tasks' }))
    .toHaveAttribute('role', 'list');
  expect(list.dataset).toMatchObject({ marker: 'none', slot: 'list-root' });
  expect(screen.getByText('Publish the package.').getAttribute('data-slot')).toBe('list-item');
});

test('forwards native item listeners through the Ark factory', async () => {
  let clicks = 0;

  render({
    components: listComponents,
    setup() {
      return { handleClick: () => clicks++ };
    },
    template: `<List><ListItem @click="handleClick">Ready</ListItem></List>`,
  });
  await page.getByText('Ready').click();

  expect(clicks).toBe(1);
});

test('preserves list anatomy through hydration', async () => {
  const html = await renderToString(createSSRApp(SsrList));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverHosts = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrList);
  try {
    app.mount(host);
    await nextTick();
    expect([...host.querySelectorAll('[data-slot]')]).toHaveLength(serverHosts.length);
    [...host.querySelectorAll('[data-slot]')].forEach((element, index) =>
      expect(element).toBe(serverHosts[index]),
    );
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    expect(host.querySelector('ol')?.getAttribute('start')).toBe('3');
    expect(host.querySelector('[data-slot="list-root"]')?.getAttribute('data-marker')).toBe('none');
    expect(host.querySelector('[data-slot="list-item"]')?.textContent).toContain(
      'Prepare the release notes.',
    );
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});