import { LocaleProvider } from '@ark-ui/vue/locale';
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, nextTick, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Tabs,
  TabsContext,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRootProvider,
  TabsTrigger,
  useTabs,
  useTabsContext,
} from '../src';
import SsrTabs from './fixtures/SsrTabs.vue';

const tabsComponents = {
  Tabs,
  TabsContext,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRootProvider,
  TabsTrigger,
};

const items = [
  { value: 'overview', label: 'Overview', content: 'Overview content' },
  { value: 'projects', label: 'Projects', content: 'Projects content' },
  { value: 'account', label: 'Account', content: 'Account content' },
];

const TestTabs = defineComponent({
  components: tabsComponents,
  props: {
    activationMode: { type: String, default: 'automatic' },
    disabled: Boolean,
    lazyMount: Boolean,
    modelValue: { type: String, default: undefined },
    orientation: { type: String, default: 'horizontal' },
  },
  emits: ['update:modelValue', 'valueChange'],
  setup() {
    return { items };
  },
  template: `
    <Tabs
      :activation-mode="activationMode"
      :default-value="modelValue === undefined ? 'overview' : undefined"
      :lazy-mount="lazyMount"
      :model-value="modelValue"
      :orientation="orientation"
      unmount-on-exit
      @update:model-value="$emit('update:modelValue', $event)"
      @value-change="$emit('valueChange', $event)"
    >
      <TabsList>
        <TabsTrigger
          v-for="item in items"
          :key="item.value"
          :disabled="disabled && item.value === 'projects'"
          :value="item.value"
        >
          {{ item.label }}
        </TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent v-for="item in items" :key="item.value" :value="item.value">
        {{ item.content }}
      </TabsContent>
    </Tabs>
  `,
});

test('preserves Ark semantics, Vue refs, anatomy, attrs, and moduix hooks', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const listRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: tabsComponents,
    setup() {
      return { contentRef, indicatorRef, listRef, rootRef, triggerRef };
    },
    template: `
      <Tabs ref="rootRef" default-value="overview" data-probe="root">
        <TabsList ref="listRef">
          <TabsTrigger ref="triggerRef" value="overview">Overview</TabsTrigger>
          <TabsIndicator ref="indicatorRef" />
        </TabsList>
        <TabsContent ref="contentRef" value="overview">Overview content</TabsContent>
      </Tabs>
    `,
  });

  render(Harness);

  const root = screen.getByRole('tablist').parentElement;
  const list = screen.getByRole('tablist');
  const trigger = screen.getByRole('tab', { name: 'Overview' });
  const indicator = list.querySelector('[data-slot="tabs-indicator"]');
  const content = screen.getByText('Overview content');

  expect(rootRef.value?.$el).toBe(root);
  expect(root!.getAttribute('data-slot')).toBe('tabs-root');
  expect(root!.getAttribute('data-scope')).toBe('tabs');
  expect(root!.getAttribute('data-probe')).toBe('root');
  expect(listRef.value?.$el).toBe(list);
  await expect.element(page.getByRole('tablist')).toHaveAttribute('data-slot', 'tabs-list');
  expect(triggerRef.value?.$el).toBe(trigger);
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveAttribute('data-slot', 'tabs-trigger');
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
  expect(indicatorRef.value?.$el).toBe(indicator);
  expect(indicator!.getAttribute('data-slot')).toBe('tabs-indicator');
  expect(contentRef.value?.$el).toBe(content);
  await expect
    .element(page.getByText('Overview content'))
    .toHaveAttribute('data-slot', 'tabs-content');
});

test('preserves keyboard navigation, disabled triggers, and Ark callback details', async () => {
  const changes: string[] = [];
  render(TestTabs, {
    props: {
      disabled: true,
      onValueChange: (details: { value?: string }) => changes.push(details.value ?? ''),
    },
  });

  await expect.element(page.getByRole('tab', { name: 'Projects', exact: true })).toBeDisabled();
  await page.getByRole('tab', { name: 'Overview', exact: true }).click();
  await page.getByRole('tab', { name: 'Overview', exact: true }).press('ArrowRight');
  await expect.element(page.getByRole('tab', { name: 'Account', exact: true })).toBeFocused();
  await expect.poll(() => changes).toEqual(['account']);
});

test('uses vertical keyboard navigation and mounts inactive content lazily', async () => {
  render(TestTabs, { props: { lazyMount: true, orientation: 'vertical' } });

  const overview = screen.getByRole('tab', { name: 'Overview' });

  await expect.element(page.getByText('Projects content')).toHaveCount(0);
  expect(overview.closest('[data-slot="tabs-root"]')!.getAttribute('data-variant')).toBe('default');

  await page.getByRole('tab', { name: 'Overview', exact: true }).click();
  await page.getByRole('tab', { name: 'Overview', exact: true }).press('ArrowDown');
  await expect.element(page.getByRole('tab', { name: 'Projects', exact: true })).toBeFocused();
  await expect.element(page.getByText('Projects content')).toBeVisible();
});

test('keeps manual activation focused until Enter selects the tab', async () => {
  const changes: string[] = [];
  render(TestTabs, {
    props: {
      activationMode: 'manual',
      onValueChange: (details: { value?: string }) => changes.push(details.value ?? ''),
    },
  });

  const overviewLocator = page.getByRole('tab', { name: 'Overview', exact: true });
  await overviewLocator.click();
  await overviewLocator.press('ArrowRight');
  const projectsLocator = page.getByRole('tab', { name: 'Projects', exact: true });
  await expect.element(projectsLocator).toBeFocused();
  await expect.element(overviewLocator).toHaveAttribute('aria-selected', 'true');
  expect(changes).toEqual([]);

  await projectsLocator.press('Enter');
  await expect.element(projectsLocator).toHaveAttribute('aria-selected', 'true');
  expect(changes).toEqual(['projects']);
});

test('supports v-model and notifies each Vue listener once', async () => {
  const details: string[] = [];
  const Harness = defineComponent({
    components: { TestTabs },
    setup() {
      const value = ref('overview');
      return { details, value };
    },
    template: `
      <TestTabs v-model="value" @value-change="details.push($event.value)" />
      <output>Selected: {{ value }}</output>
    `,
  });

  render(Harness);
  await page.getByRole('tab', { name: 'Projects', exact: true }).click();

  await expect.element(page.getByText('Selected: projects')).toBeAttached();
  expect(details).toEqual(['projects']);
});

test('preserves semantic hosts and refs with asChild', async () => {
  const triggerRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: tabsComponents,
    setup() {
      return { triggerRef };
    },
    template: `
      <Tabs default-value="overview" as-child>
        <section aria-label="Account sections">
          <TabsList>
            <TabsTrigger ref="triggerRef" value="overview" as-child>
              <a href="#overview">Overview</a>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Overview content</TabsContent>
        </section>
      </Tabs>
    `,
  });

  render(Harness);
  const root = screen.getByRole('region', { name: 'Account sections' });
  const trigger = screen.getByRole('tab', { name: 'Overview' });

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Account sections', exact: true }))
    .toHaveAttribute('data-slot', 'tabs-root');
  expect(trigger.tagName).toBe('A');
  expect(triggerRef.value?.$el).toBe(trigger);
});

test('keeps provider and context composition connected', async () => {
  const RootState = defineComponent({
    setup() {
      const tabs = useTabsContext();
      const selectProjects = () => tabs.value.setValue('projects');
      return { selectProjects };
    },
    template: '<button type="button" @click="selectProjects">Select projects</button>',
  });
  const Harness = defineComponent({
    components: { ...tabsComponents, RootState },
    setup() {
      return { tabs: useTabs({ defaultValue: 'overview' }) };
    },
    template: `
      <TabsRootProvider :value="tabs">
        <RootState />
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="projects">Projects content</TabsContent>
        <output data-testid="tabs-context-hook">{{ tabs.value }}</output>
        <TabsContext v-slot="context">
          <output data-testid="tabs-context-slot">{{ context.value }}</output>
        </TabsContext>
      </TabsRootProvider>
    `,
  });

  render(Harness);

  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
  await expect.element(page.getByTestId('tabs-context-hook')).toContainText('overview');
  await expect.element(page.getByTestId('tabs-context-slot')).toContainText('overview');

  await page.getByRole('button', { name: 'Select projects', exact: true }).click();
  await expect
    .element(page.getByRole('tab', { name: 'Projects', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
  await expect.element(page.getByTestId('tabs-context-hook')).toContainText('projects');
  await expect.element(page.getByTestId('tabs-context-slot')).toContainText('projects');
});

test('hydrates stable hosts and ids and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrTabs));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="tabs-root"]');
  const serverNodes = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(serverRoot).not.toBeNull();
  expect(serverIds.length).toBeGreaterThan(0);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrTabs);
  try {
    app.mount(host);
    await nextTick();
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    expect(host.querySelector('[data-slot="tabs-root"]')).toBe(serverRoot);
    expect([...host.querySelectorAll('[data-slot]')]).toEqual(serverNodes);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await page.getByRole('tab', { name: 'Projects', exact: true }).click();
    await expect.element(page.getByText('Projects content', { exact: true })).toBeVisible();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});

test('keeps omitted loopFocus enabled and removes lazy panels on exit', async () => {
  render(TestTabs, { props: { lazyMount: true } });

  await page.getByRole('tab', { name: 'Account', exact: true }).click();
  await expect.element(page.getByText('Account content')).toBeVisible();
  await expect.element(page.getByText('Overview content')).toHaveCount(0);

  await page.getByRole('tab', { name: 'Account', exact: true }).press('ArrowRight');
  await expect.element(page.getByRole('tab', { name: 'Overview', exact: true })).toBeFocused();
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
  await expect.element(page.getByText('Account content')).toHaveCount(0);
  await expect.element(page.getByText('Overview content')).toBeVisible();
});

test('updates provider orientation and preserves every asChild host ref', async () => {
  const orientation = ref<'horizontal' | 'vertical'>('horizontal');
  const rootRef = ref<ComponentPublicInstance>();
  const listRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: tabsComponents,
    setup() {
      const tabs = useTabs(
        computed(() => ({ defaultValue: 'overview', orientation: orientation.value })),
      );
      return { contentRef, indicatorRef, listRef, rootRef, tabs };
    },
    template: `
      <TabsRootProvider ref="rootRef" :value="tabs" variant="line" as-child>
        <section aria-label="Project sections">
          <TabsList ref="listRef" as-child>
            <nav aria-label="Project views">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsIndicator ref="indicatorRef" as-child><span /></TabsIndicator>
            </nav>
          </TabsList>
          <TabsContent ref="contentRef" value="overview" as-child>
            <article>Overview content</article>
          </TabsContent>
        </section>
      </TabsRootProvider>
    `,
  });

  render(Harness);
  const root = screen.getByRole('region', { name: 'Project sections' });
  const list = screen.getByRole('tablist');
  const indicator = root.querySelector('[data-slot="tabs-indicator"]');
  const content = screen.getByRole('tabpanel');

  expect(rootRef.value?.$el).toBe(root);
  expect(listRef.value?.$el).toBe(list);
  expect(list.tagName).toBe('NAV');
  expect(indicatorRef.value?.$el).toBe(indicator);
  expect(indicator?.tagName).toBe('SPAN');
  expect(contentRef.value?.$el).toBe(content);
  expect(content.tagName).toBe('ARTICLE');
  await expect.element(page.getByRole('tablist')).toHaveAttribute('aria-label', 'Project views');
  await expect
    .element(page.getByRole('tabpanel'))
    .toHaveAttribute('aria-labelledby', screen.getByRole('tab').id);
  const rootLocator = page.getByRole('region', { name: 'Project sections', exact: true });
  await expect.element(rootLocator).toHaveAttribute('data-variant', 'line');

  orientation.value = 'vertical';
  await expect.element(rootLocator).toHaveAttribute('data-orientation', 'vertical');
  await expect.element(page.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');

  orientation.value = 'horizontal';
  await expect.element(rootLocator).toHaveAttribute('data-orientation', 'horizontal');
});

function expectSameBox(actual: Element, expected: Element) {
  const a = actual.getBoundingClientRect();
  const e = expected.getBoundingClientRect();
  expect(Math.abs(a.left - e.left)).toBeLessThanOrEqual(1);
  expect(Math.abs(a.top - e.top)).toBeLessThanOrEqual(1);
  expect(Math.abs(a.width - e.width)).toBeLessThanOrEqual(1);
  expect(Math.abs(a.height - e.height)).toBeLessThanOrEqual(1);
}

const IndicatorTabs = defineComponent({
  components: tabsComponents,
  inheritAttrs: false,
  template: `
    <Tabs default-value="projects" v-bind="$attrs">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects" style="height: 48px">Projects</TabsTrigger>
        <TabsIndicator />
      </TabsList>
    </Tabs>
  `,
});

function getIndicatorParts(root: Element) {
  return {
    indicator: root.querySelector('[data-slot="tabs-indicator"]')!,
    list: root.querySelector('[data-slot="tabs-list"]')!,
    trigger: root.querySelector('[data-slot="tabs-trigger"][data-selected]')!,
  };
}

test('covers the selected trigger box with the indicator in both orientations', async () => {
  const { container } = render({
    components: { IndicatorTabs },
    template: `
      <IndicatorTabs />
      <IndicatorTabs orientation="vertical" />
    `,
  });

  for (const root of container.querySelectorAll('[data-slot="tabs-root"]')) {
    const { indicator, trigger } = getIndicatorParts(root);
    await expect.poll(() => indicator.getBoundingClientRect().height).toBe(48);
    expectSameBox(indicator, trigger);
  }
});

test('draws the line indicator on the list edge in both orientations and RTL', async () => {
  const { container } = render({
    components: { IndicatorTabs, LocaleProvider },
    template: `
      <IndicatorTabs variant="line" />
      <IndicatorTabs orientation="vertical" variant="line" />
      <LocaleProvider locale="ar">
        <IndicatorTabs orientation="vertical" variant="line" />
      </LocaleProvider>
    `,
  });

  const [horizontal, vertical, rtl] = [
    ...container.querySelectorAll('[data-slot="tabs-root"]'),
  ].map(getIndicatorParts);

  await expect.poll(() => horizontal!.indicator.getBoundingClientRect().width).toBeGreaterThan(0);
  const h = horizontal!.indicator.getBoundingClientRect();
  expect(h.height).toBe(2);
  expect(h.left).toBeCloseTo(horizontal!.trigger.getBoundingClientRect().left, 0);
  expect(h.bottom).toBeCloseTo(horizontal!.list.getBoundingClientRect().bottom - 1, 0);

  for (const [parts, edge] of [
    [vertical!, 'right'],
    [rtl!, 'left'],
  ] as const) {
    await expect.poll(() => parts.indicator.getBoundingClientRect().height).toBe(48);
    const rect = parts.indicator.getBoundingClientRect();
    const list = parts.list.getBoundingClientRect();
    expect(rect.width).toBe(2);
    expect(rect.top).toBeCloseTo(parts.trigger.getBoundingClientRect().top, 0);
    expect(rect[edge]).toBeCloseTo(edge === 'right' ? list.right - 1 : list.left + 1, 0);
  }
});

test('keeps the content radius while the panel shows its focus ring', async () => {
  render(TestTabs);

  const content = document.querySelector('[data-slot="tabs-content"]:not([hidden])')!;
  const radius = getComputedStyle(content).borderTopLeftRadius;
  const trigger = page.getByRole('tab', { name: 'Overview', exact: true });
  await trigger.click();
  await trigger.press('Tab');

  await expect.element(page.getByRole('tabpanel')).toBeFocused();
  expect(getComputedStyle(content).outlineStyle).toBe('solid');
  expect(getComputedStyle(content).borderTopLeftRadius).toBe(radius);
  expect(radius).not.toBe('0px');
});

test('sizes the tab list to the matching control height', () => {
  const { container } = render({
    components: tabsComponents,
    setup() {
      return { items };
    },
    template: `
      <Tabs v-for="size in ['sm', 'md', 'lg']" :key="size" default-value="overview" :size="size">
        <TabsList>
          <TabsTrigger v-for="item in items" :key="item.value" :value="item.value">
            {{ item.label }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    `,
  });

  const heights = [...container.querySelectorAll<HTMLElement>('[data-slot="tabs-list"]')].map(
    (list) => list.offsetHeight,
  );
  expect(heights).toEqual([32, 36, 40]);
});

test('stretches horizontal triggers across the root when fitted', () => {
  const { container } = render({
    components: tabsComponents,
    setup() {
      return { items };
    },
    template: `
      <Tabs
        v-for="orientation in ['horizontal', 'vertical']"
        :key="orientation"
        default-value="overview"
        fitted
        :orientation="orientation"
        style="width: 480px"
      >
        <TabsList>
          <TabsTrigger v-for="item in items" :key="item.value" :value="item.value">
            {{ item.label }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    `,
  });

  const [horizontal, vertical] = container.querySelectorAll<HTMLElement>('[data-slot="tabs-root"]');
  const list = horizontal!.querySelector<HTMLElement>('[data-slot="tabs-list"]')!;
  const widths = [...list.querySelectorAll<HTMLElement>('[data-slot="tabs-trigger"]')].map(
    (trigger) => trigger.offsetWidth,
  );

  expect(horizontal!.hasAttribute('data-fitted')).toBe(true);
  expect(list.offsetWidth).toBe(480);
  expect(Math.max(...widths) - Math.min(...widths)).toBeLessThanOrEqual(1);
  for (const trigger of vertical!.querySelectorAll<HTMLElement>('[data-slot="tabs-trigger"]')) {
    expect(trigger.offsetHeight).toBe(26);
  }
});