import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, defineComponent, nextTick, ref } from 'vue';
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

async function focusAndClick(element: HTMLElement) {
  element.focus();
  await fireEvent.focusIn(element);
  await waitFor(() => expect(element).toHaveAttribute('data-focus'));
  await fireEvent.click(element);
}

test('preserves Ark semantics, Vue refs, anatomy, attrs, and Tailwind hooks', () => {
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
  expect(root).toHaveAttribute('data-slot', 'tabs-root');
  expect(root).toHaveAttribute('data-scope', 'tabs');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(listRef.value?.$el).toBe(list);
  expect(list).toHaveAttribute('data-slot', 'tabs-list');
  expect(triggerRef.value?.$el).toBe(trigger);
  expect(trigger).toHaveAttribute('data-slot', 'tabs-trigger');
  expect(trigger).toHaveAttribute('aria-selected', 'true');
  expect(indicatorRef.value?.$el).toBe(indicator);
  expect(indicator).toHaveAttribute('data-slot', 'tabs-indicator');
  expect(contentRef.value?.$el).toBe(content);
  expect(content).toHaveAttribute('data-slot', 'tabs-content');
});

test('preserves keyboard navigation, disabled triggers, and Ark callback details', async () => {
  const changes: string[] = [];
  render(TestTabs, {
    props: {
      disabled: true,
      onValueChange: (details: { value?: string }) => changes.push(details.value ?? ''),
    },
  });

  const overview = screen.getByRole('tab', { name: 'Overview' });
  const projects = screen.getByRole('tab', { name: 'Projects' });
  const account = screen.getByRole('tab', { name: 'Account' });

  expect(projects).toBeDisabled();
  overview.focus();
  await fireEvent.keyDown(overview, { key: 'ArrowRight' });
  await waitFor(() => expect(account).toHaveFocus());
  await waitFor(() => expect(changes).toEqual(['account']));
});

test('uses vertical keyboard navigation and mounts inactive content lazily', async () => {
  render(TestTabs, { props: { lazyMount: true, orientation: 'vertical' } });

  const overview = screen.getByRole('tab', { name: 'Overview' });
  const projects = screen.getByRole('tab', { name: 'Projects' });
  expect(screen.queryByText('Projects content')).not.toBeInTheDocument();
  expect(overview.closest('[data-slot="tabs-root"]')).toHaveAttribute('data-variant', 'default');

  overview.focus();
  await fireEvent.keyDown(overview, { key: 'ArrowDown' });
  await waitFor(() => expect(projects).toHaveFocus());
  await waitFor(() => expect(screen.getByText('Projects content')).toBeVisible());
});

test('keeps manual activation focused until Enter selects the tab', async () => {
  const changes: string[] = [];
  render(TestTabs, {
    props: {
      activationMode: 'manual',
      onValueChange: (details: { value?: string }) => changes.push(details.value ?? ''),
    },
  });

  const overview = screen.getByRole('tab', { name: 'Overview' });
  const projects = screen.getByRole('tab', { name: 'Projects' });

  overview.focus();
  await fireEvent.keyDown(overview, { key: 'ArrowRight' });
  await waitFor(() => expect(projects).toHaveFocus());
  expect(overview).toHaveAttribute('aria-selected', 'true');
  expect(changes).toEqual([]);

  await fireEvent.keyDown(projects, { key: 'Enter' });
  await fireEvent.click(projects);
  await waitFor(() => expect(projects).toHaveAttribute('aria-selected', 'true'));
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
  await focusAndClick(screen.getByRole('tab', { name: 'Projects' }));

  await waitFor(() => expect(screen.getByText('Selected: projects')).toBeInTheDocument());
  expect(details).toEqual(['projects']);
});

test('preserves semantic hosts and refs with asChild', () => {
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
  expect(root).toHaveAttribute('data-slot', 'tabs-root');
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
  const firstTab = screen.getByRole('tab', { name: 'Overview' });
  const projects = screen.getByRole('tab', { name: 'Projects' });

  expect(firstTab).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByTestId('tabs-context-hook')).toHaveTextContent('overview');
  expect(screen.getByTestId('tabs-context-slot')).toHaveTextContent('overview');

  await fireEvent.click(screen.getByRole('button', { name: 'Select projects' }));
  await waitFor(() => expect(projects).toHaveAttribute('aria-selected', 'true'));
  expect(screen.getByTestId('tabs-context-hook')).toHaveTextContent('projects');
  expect(screen.getByTestId('tabs-context-slot')).toHaveTextContent('projects');
});

test('keeps owned data-variant above consumer overrides on vertical roots', () => {
  const Harness = defineComponent({
    components: tabsComponents,
    setup() {
      return { tabs: useTabs({ defaultValue: 'overview', orientation: 'vertical' }) };
    },
    template: `
      <Tabs data-variant="line" default-value="overview" orientation="vertical">
        <TabsList><TabsTrigger value="overview">Overview</TabsTrigger></TabsList>
      </Tabs>
      <TabsRootProvider data-variant="line" :value="tabs">
        <TabsList><TabsTrigger value="overview">Overview</TabsTrigger></TabsList>
      </TabsRootProvider>
    `,
  });

  render(Harness);
  const [root, provider] = screen.getAllByRole('tablist').map((tablist) => tablist.parentElement);

  expect(root).toHaveAttribute('data-orientation', 'vertical');
  expect(root).toHaveAttribute('data-variant', 'default');
  expect(provider).toHaveAttribute('data-orientation', 'vertical');
  expect(provider).toHaveAttribute('data-variant', 'default');
});

test('merges consumer utilities after Tailwind defaults', () => {
  render(
    defineComponent({
      components: tabsComponents,
      template: `
        <Tabs default-value="overview" class="flex-row">
          <TabsList class="w-full bg-card">
            <TabsTrigger value="overview" class="h-10">Overview</TabsTrigger>
            <TabsIndicator />
          </TabsList>
          <TabsContent value="overview" class="p-6">Overview content</TabsContent>
        </Tabs>
      `,
    }),
  );

  const root = screen.getByRole('tablist').parentElement;
  const list = screen.getByRole('tablist');
  const trigger = screen.getByRole('tab', { name: 'Overview' });
  const content = screen.getByText('Overview content');

  expect(root).toHaveClass('flex-row');
  expect(root).not.toHaveClass('flex-col');
  expect(list).toHaveClass('w-full', 'bg-card');
  expect(list).not.toHaveClass('w-fit');
  expect(trigger).toHaveClass('h-10');
  expect(trigger).not.toHaveClass('h-8');
  expect(content).toHaveClass('p-6');
  expect(content).not.toHaveClass('p-4');
});

test('renders and hydrates the public anatomy without changing generated ids', async () => {
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const App = defineComponent({
    components: tabsComponents,
    template: `
      <Tabs default-value="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsIndicator />
        </TabsList>
        <TabsContent value="overview">Overview content</TabsContent>
      </Tabs>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="tabs-root"');
  expect(html).toContain('data-slot="tabs-trigger"');
  expect(html).toContain('aria-selected="true"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const serverNodes = [...host.querySelectorAll('[data-slot]')];
  const app = createSSRApp(App);
  app.mount(host);
  await nextTick();

  expect(host.querySelectorAll('[data-slot="tabs-root"]')).toHaveLength(1);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  const hydratedNodes = [...host.querySelectorAll('[data-slot]')];
  expect(hydratedNodes).toHaveLength(serverNodes.length);
  hydratedNodes.forEach((node, index) => expect(node).toBe(serverNodes[index]));
  expect(warn).not.toHaveBeenCalled();
  expect(error).not.toHaveBeenCalled();
  app.unmount();
  host.remove();
  warn.mockRestore();
  error.mockRestore();
});

test('keeps omitted loopFocus enabled and removes lazy panels on exit', async () => {
  render(TestTabs, { props: { lazyMount: true } });
  const overview = screen.getByRole('tab', { name: 'Overview' });
  const account = screen.getByRole('tab', { name: 'Account' });

  await focusAndClick(account);
  await waitFor(() => expect(screen.getByText('Account content')).toBeVisible());
  await waitFor(() => expect(screen.queryByText('Overview content')).not.toBeInTheDocument());

  await fireEvent.keyDown(account, { key: 'ArrowRight' });
  await waitFor(() => expect(overview).toHaveFocus());
  await waitFor(() => expect(overview).toHaveAttribute('aria-selected', 'true'));
  await waitFor(() => expect(screen.queryByText('Account content')).not.toBeInTheDocument());
  expect(screen.getByText('Overview content')).toBeVisible();
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
  expect(list).toHaveAttribute('aria-label', 'Project views');
  expect(content).toHaveAttribute('aria-labelledby', screen.getByRole('tab').id);
  expect(root).toHaveAttribute('data-variant', 'line');

  orientation.value = 'vertical';
  await waitFor(() => expect(root).toHaveAttribute('data-orientation', 'vertical'));
  expect(root).toHaveAttribute('data-variant', 'default');
  expect(list).toHaveAttribute('aria-orientation', 'vertical');

  orientation.value = 'horizontal';
  await waitFor(() => expect(root).toHaveAttribute('data-variant', 'line'));
});