import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { List, ListIndicator, ListItem } from '../src';
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

  expect(list.dataset).toMatchObject({ gap: 'sm', marker: 'disc', size: 'md', tone: 'default' });
  expect([...list.classList]).toEqual(
    expect.arrayContaining([
      'flex',
      'flex-col',
      'gap-(--_list-gap)',
      'list-disc',
      'ps-5',
      'text-md',
      'text-foreground',
      'consumer-class',
    ]),
  );
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
      <List ref="rootRef" as="ol" :start="3" reversed data-testid="list">
        <ListItem>Prepare the release notes.</ListItem>
      </List>
    `,
  });

  const list = screen.getByTestId('list');

  expect(rootRef.value?.$el).toBe(list);
  expect(list.tagName).toBe('OL');
  const listLocator = page.getByTestId('list');
  await expect.element(listLocator).toHaveAttribute('start', '3');
  await expect.element(listLocator).toHaveAttribute('reversed');
  expect(list.dataset).toMatchObject({ scope: 'list', part: 'root', slot: 'list-root' });
  expect([...list!.classList]).toEqual(expect.arrayContaining(['list-decimal', 'ps-5']));
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
  expect(list?.classList.contains('list-none')).toBe(true);
  expect(screen.getByText('Publish the package.').getAttribute('data-slot')).toBe('list-item');
});

test('lets consumer utilities override conflicting defaults', () => {
  render({
    components: listComponents,
    template: `<List class="gap-6 ps-0 text-lg text-primary" data-testid="list"><ListItem>Ready</ListItem></List>`,
  });

  const list = screen.getByTestId('list');
  expect([...list.classList]).toEqual(
    expect.arrayContaining(['gap-6', 'ps-0', 'text-lg', 'text-primary']),
  );
  for (const utility of ['gap-(--_list-gap)', 'ps-5', 'text-md', 'text-foreground']) {
    expect(list.classList.contains(utility)).toBe(false);
  }
  expect(getComputedStyle(list)).toMatchObject({
    rowGap: '24px',
    paddingInlineStart: '0px',
    fontSize: '18px',
  });
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
test('derives the default marker from the host and maps size, gap, and tone', () => {
  render({
    components: listComponents,
    template: `
      <div>
        <List data-testid="ul"><ListItem>Disc</ListItem></List>
        <List as="ol" data-testid="ol"><ListItem>Decimal</ListItem></List>
        <List as-child marker="decimal" data-testid="child">
          <ol><ListItem>Decimal</ListItem></ol>
        </List>
        <List gap="lg" size="sm" tone="muted" marker="none" data-testid="custom">
          <ListItem>Muted</ListItem>
        </List>
      </div>
    `,
  });

  const ul = screen.getByTestId('ul');
  const ol = screen.getByTestId('ol');
  const child = screen.getByTestId('child');
  const custom = screen.getByTestId('custom');

  expect(ul.dataset.marker).toBe('disc');
  expect(getComputedStyle(ul)).toMatchObject({
    listStyleType: 'disc',
    paddingInlineStart: '20px',
    rowGap: '8px',
    fontSize: '16px',
  });
  expect(ol.dataset.marker).toBe('decimal');
  expect(getComputedStyle(ol).listStyleType).toBe('decimal');
  expect(child.tagName).toBe('OL');
  expect(getComputedStyle(child).listStyleType).toBe('decimal');
  expect(getComputedStyle(custom)).toMatchObject({
    listStyleType: 'none',
    paddingInlineStart: '0px',
    rowGap: '16px',
    fontSize: '14px',
  });
  expect(getComputedStyle(custom).color).not.toBe(getComputedStyle(ul).color);
});
test('spaces nested lists and lays out indicators', () => {
  render({
    components: { List, ListIndicator, ListItem },
    template: `
      <div>
      <List gap="lg">
        <ListItem>
          Parent
          <List gap="lg" data-testid="nested">
            <ListItem>Child</ListItem>
          </List>
        </ListItem>
      </List>
      <List marker="none">
        <ListItem data-testid="indicator-item">
          <ListIndicator data-testid="indicator">
            <svg viewBox="0 0 16 16" aria-hidden="true"></svg>
          </ListIndicator>
          Done
        </ListItem>
      </List>
      </div>
    `,
  });
  const nested = screen.getByTestId('nested');
  const indicatorItem = screen.getByTestId('indicator-item');
  const indicator = screen.getByTestId('indicator');
  const icon = indicator.querySelector('svg')!;
  expect(getComputedStyle(nested).marginBlockStart).toBe('16px');
  expect(getComputedStyle(indicatorItem)).toMatchObject({
    display: 'flex',
    alignItems: 'flex-start',
  });
  expect(indicator.dataset).toMatchObject({
    scope: 'list',
    part: 'indicator',
    slot: 'list-indicator',
  });
  expect(getComputedStyle(indicator)).toMatchObject({ marginInlineEnd: '8px', minHeight: '24px' });
  expect(icon.getBoundingClientRect().width).toBe(16);
});