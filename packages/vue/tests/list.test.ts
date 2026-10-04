import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { List, ListItem } from '../src';

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
      expect(host).toHaveAttribute('title', as);
      expect(host).toHaveTextContent('Content');
    }
    element.value = undefined;
    await nextTick();
    expect(screen.getByTestId('root').tagName).toBe(asChild ? 'UL' : 'UL');
  },
);

test('updates the semantic host when as changes', async () => {
  const element = ref<'ul' | 'ol'>('ul');
  const Harness = defineComponent({
    components: listComponents,
    setup() {
      return { element };
    },
    template: `<List :as="element" :start="element === 'ol' ? 3 : undefined">Tasks</List>`,
  });

  render(Harness);

  expect(screen.getByRole('list').tagName).toBe('UL');
  element.value = 'ol';

  await waitFor(() => expect(screen.getByRole('list').tagName).toBe('OL'));
  expect(screen.getByRole('list')).toHaveAttribute('start', '3');
  expect(screen.getByRole('list')).toHaveTextContent('Tasks');
});

test('renders semantic unordered-list defaults and forwards Vue refs and attrs', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const itemRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
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

  render(Harness);

  const list = screen.getByTestId('list');
  const item = screen.getByText('Keep the item ref on its semantic host.');

  expect(list.tagName).toBe('UL');
  expect(list).toHaveAttribute('data-gap', 'sm');
  expect(list).toHaveAttribute('data-marker', 'auto');
  expect(list).toHaveAttribute('data-size', 'md');
  expect(list).toHaveAttribute('data-tone', 'default');
  expect(list).toHaveClass('consumer-class');
  expect(rootRef.value?.$el).toBe(list);
  expect(itemRef.value?.$el).toBe(item);
  expect(item).toHaveAttribute('data-scope', 'list');
  expect(item).toHaveAttribute('data-part', 'item');
  expect(item).toHaveAttribute('data-slot', 'list-item');
});

test('renders semantic roots with stable hooks and native ordered-list props', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
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

  render(Harness);

  const list = screen.getByTestId('list');

  expect(rootRef.value?.$el).toBe(list);
  expect(list.tagName).toBe('OL');
  expect(list).toHaveAttribute('start', '3');
  expect(list).toHaveAttribute('type', 'A');
  expect(list).toHaveAttribute('data-scope', 'list');
  expect(list).toHaveAttribute('data-part', 'root');
  expect(list).toHaveAttribute('data-slot', 'list-root');
});

test('keeps markerless list semantics and supports custom semantic roots', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
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

  render(Harness);

  const list = screen.getByRole('list', { name: 'Release tasks' });
  const item = screen.getByText('Publish the package.');

  expect(rootRef.value?.$el).toBe(list);
  expect(list).toHaveAttribute('role', 'list');
  expect(list).toHaveAttribute('data-marker', 'none');
  expect(list).toHaveAttribute('data-slot', 'list-root');
  expect(item).toHaveAttribute('data-slot', 'list-item');
});

test('forwards native item listeners through the Ark factory', async () => {
  let clicks = 0;
  const Harness = defineComponent({
    components: listComponents,
    setup() {
      return { handleClick: () => clicks++ };
    },
    template: `<List><ListItem @click="handleClick">Ready</ListItem></List>`,
  });

  render(Harness);
  await fireEvent.click(screen.getByText('Ready'));

  expect(clicks).toBe(1);
});

test('preserves list anatomy through SSR and hydration', async () => {
  const App = defineComponent({
    components: listComponents,
    template: `
      <List as="ol" marker="none" start="3">
        <ListItem>Prepare the release notes.</ListItem>
      </List>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('<ol');
  expect(html).toContain('data-slot="list-root"');
  expect(html).toContain('data-slot="list-item"');
  expect(html).toContain('role="list"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);

  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelector('ol')).toHaveAttribute('start', '3');
  expect(host.querySelector('[data-slot="list-root"]')).toHaveAttribute('data-marker', 'none');
  expect(host.querySelector('[data-slot="list-item"]')).toHaveTextContent(
    'Prepare the release notes.',
  );

  app.unmount();
  host.remove();
});