import { createListCollection } from '@ark-ui/vue/collection';
import {
  SplitterRoot as ArkSplitterRoot,
  SplitterPanel as ArkSplitterPanel,
} from '@ark-ui/vue/splitter';
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Select,
  SelectIndicator,
  SelectTrigger,
  SelectValueText,
  Sidebar,
  SidebarCollapsedContent,
  SidebarContent,
  SidebarExpandedContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupHeader,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarLabel,
  SidebarNavigationBadge,
  SidebarNavigationButton,
  SidebarNavigationItem,
  SidebarNavigationList,
  SidebarNavigationSubButton,
  SidebarNavigationSubItem,
  SidebarNavigationSubList,
  SidebarPanel,
  SidebarResizeTrigger,
  SidebarSeparator,
  SidebarTooltip,
  SidebarTrigger,
  useSplitterContext,
} from '../src';

const workspaces = createListCollection({
  items: [{ label: 'Acme Inc.', value: 'acme' }],
});

const components = {
  Select,
  SelectIndicator,
  SelectTrigger,
  SelectValueText,
  Sidebar,
  SidebarCollapsedContent,
  SidebarContent,
  SidebarExpandedContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupHeader,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarLabel,
  SidebarNavigationBadge,
  SidebarNavigationButton,
  SidebarNavigationItem,
  SidebarNavigationList,
  SidebarNavigationSubButton,
  SidebarNavigationSubItem,
  SidebarNavigationSubList,
  SidebarPanel,
  SidebarResizeTrigger,
  SidebarSeparator,
  SidebarTooltip,
  SidebarTrigger,
} as unknown as Record<string, Component>;

const DefaultSidebarConstraints = defineComponent({
  setup() {
    const splitter = useSplitterContext();
    const panel = computed(() => splitter.value.getPanelById('navigation'));
    return { panel };
  },
  template:
    '<output data-testid="constraints">{{ panel.minSize }}:{{ panel.collapsedSize }}</output>',
});

test('keeps the default panel, inset, and resize ids aligned', () => {
  const Harness = defineComponent({
    components: { ...components, DefaultSidebarConstraints },
    template: `
      <Sidebar panel-id="navigation" data-testid="sidebar">
        <SidebarPanel data-testid="panel">
          <DefaultSidebarConstraints />
        </SidebarPanel>
        <SidebarResizeTrigger data-testid="resize" />
        <SidebarTrigger />
        <SidebarInset data-testid="inset">Content</SidebarInset>
      </Sidebar>
    `,
  });

  render(Harness);

  const panel = screen.getByTestId('panel');
  const inset = screen.getByTestId('inset');
  const resize = screen.getByTestId('resize');

  expect(screen.getByTestId('sidebar')).toHaveAttribute('data-side', 'left');
  expect(panel.id).toMatch(/:panel:navigation$/);
  expect(screen.getByTestId('constraints')).toHaveTextContent('3rem:3rem');
  expect(inset.id).toMatch(/:panel:content$/);
  expect(resize.id).toMatch(/:splitter:navigation:content$/);
  expect(resize).toHaveAttribute('aria-controls', panel.id + ' ' + inset.id);
  expect(resize).toHaveAttribute('aria-label', 'Resize sidebar');
  expect(screen.getByRole('button', { name: 'Toggle sidebar' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
});

test('reverses the resize pair for a right sidebar', () => {
  const Harness = defineComponent({
    components,
    template: `
      <Sidebar side="right" panel-id="inspector">
        <SidebarInset />
        <SidebarTrigger />
        <SidebarResizeTrigger data-testid="resize" />
        <SidebarPanel />
      </Sidebar>
    `,
  });

  render(Harness);
  const resize = screen.getByTestId('resize');

  expect(resize.id).toMatch(/:splitter:content:inspector$/);
  expect(resize).toHaveAttribute('data-side', 'right');
});

test('lets consumer click handlers cancel the default toggle', () => {
  const Harness = defineComponent({
    components,
    setup() {
      const cancel = (event: MouseEvent) => event.preventDefault();
      return { cancel };
    },
    template: `
      <Sidebar>
        <SidebarPanel />
        <SidebarResizeTrigger />
        <SidebarTrigger @click="cancel" />
        <SidebarInset />
      </Sidebar>
    `,
  });

  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Toggle sidebar' });

  fireEvent.click(trigger);

  expect(trigger).toHaveAttribute('aria-expanded', 'true');
});

test('preserves active link composition for primary and nested navigation', () => {
  const Harness = defineComponent({
    components,
    template: `
      <Sidebar>
        <SidebarPanel>
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <SidebarNavigationButton as-child active size="sm">
                <a href="#overview">Overview</a>
              </SidebarNavigationButton>
              <SidebarNavigationBadge data-testid="primary-badge">12</SidebarNavigationBadge>
              <SidebarNavigationSubList>
                <SidebarNavigationSubItem>
                  <SidebarNavigationSubButton as-child active>
                    <a href="#details">Details</a>
                  </SidebarNavigationSubButton>
                  <SidebarNavigationBadge data-testid="nested-badge">3</SidebarNavigationBadge>
                </SidebarNavigationSubItem>
                <SidebarNavigationSubItem>
                  <SidebarNavigationSubButton href="#very-long-item">
                    A very long nested navigation item
                  </SidebarNavigationSubButton>
                </SidebarNavigationSubItem>
              </SidebarNavigationSubList>
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarPanel>
        <SidebarResizeTrigger />
        <SidebarTrigger />
        <SidebarInset />
      </Sidebar>
    `,
  });

  render(Harness);

  const overview = screen.getByRole('link', { name: 'Overview' });
  const details = screen.getByRole('link', { name: 'Details' });

  expect(overview).toHaveAttribute('aria-current', 'page');
  expect(overview).toHaveAttribute('data-slot', 'sidebar-navigation-button');
  expect(overview).toHaveAttribute('data-active');
  expect(overview).toHaveAttribute('data-size', 'sm');
  expect(details).toHaveAttribute('aria-current', 'page');
  expect(details).toHaveAttribute('data-slot', 'sidebar-navigation-sub-button');
  expect(details).toHaveAttribute('data-active');
  expect(screen.getByTestId('primary-badge')).toHaveAttribute(
    'data-slot',
    'sidebar-navigation-badge',
  );
  expect(screen.getByTestId('nested-badge')).toHaveTextContent('3');
  expect(screen.getByText('A very long nested navigation item')).toHaveAttribute(
    'data-slot',
    'sidebar-navigation-sub-label',
  );
});

test('preserves direct Select indicator composition in a navigation button', () => {
  const Harness = defineComponent({
    components,
    setup() {
      return { workspaces };
    },
    template: `
      <Sidebar>
        <SidebarPanel>
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <Select :collection="workspaces" :default-value="['acme']">
                <SelectTrigger as-child>
                  <SidebarNavigationButton aria-label="Select workspace">
                    <span data-sidebar-icon>AC</span>
                    <SidebarLabel><SelectValueText placeholder="Select workspace" /></SidebarLabel>
                    <SelectIndicator data-testid="select-indicator" />
                  </SidebarNavigationButton>
                </SelectTrigger>
              </Select>
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarPanel>
        <SidebarResizeTrigger />
        <SidebarTrigger />
        <SidebarInset />
      </Sidebar>
    `,
  });

  const { container } = render(Harness);
  const indicator = screen.getByTestId('select-indicator');

  expect(indicator).toBe(container.querySelector('[data-scope="select"][data-part="indicator"]'));
});

test('marks collapsed navigation content as hidden by default', () => {
  const Harness = defineComponent({
    components,
    template: `
      <Sidebar>
        <SidebarPanel>
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <SidebarExpandedContent data-testid="expanded-projects">
                <button type="button">Expanded projects</button>
              </SidebarExpandedContent>
              <SidebarCollapsedContent data-testid="collapsed-projects">
                <button type="button">Collapsed projects</button>
              </SidebarCollapsedContent>
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarPanel>
        <SidebarResizeTrigger />
        <SidebarTrigger />
        <SidebarInset />
      </Sidebar>
    `,
  });

  render(Harness);

  expect(screen.getByTestId('expanded-projects')).toHaveAttribute(
    'data-slot',
    'sidebar-expanded-content',
  );
  expect(screen.getByTestId('expanded-projects')).not.toHaveAttribute('hidden');
  expect(screen.getByTestId('collapsed-projects')).toHaveAttribute(
    'data-slot',
    'sidebar-collapsed-content',
  );
  expect(screen.getByTestId('collapsed-projects')).toHaveAttribute('hidden');
});

test('composes the explicit group, input, separator, and footer anatomy', () => {
  const inputRef = ref<ComponentPublicInstance>();
  const separatorRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components,
    setup() {
      return { inputRef, separatorRef };
    },
    template: `
      <Sidebar>
        <SidebarPanel>
          <SidebarHeader>
            <SidebarInput ref="inputRef" placeholder="Search" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupHeader>
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                <SidebarGroupAction aria-label="Create workspace item">+</SidebarGroupAction>
              </SidebarGroupHeader>
              <SidebarNavigationList>
                <SidebarNavigationItem>
                  <SidebarNavigationButton>Overview</SidebarNavigationButton>
                </SidebarNavigationItem>
              </SidebarNavigationList>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter><SidebarSeparator ref="separatorRef" /></SidebarFooter>
        </SidebarPanel>
        <SidebarResizeTrigger />
        <SidebarTrigger />
        <SidebarInset />
      </Sidebar>
    `,
  });

  render(Harness);

  expect(screen.getByRole('list')).toHaveAttribute('data-slot', 'sidebar-navigation-list');
  expect(screen.getByRole('button', { name: 'Overview' })).toHaveAttribute(
    'data-slot',
    'sidebar-navigation-button',
  );
  expect(inputRef.value?.$el).toHaveAttribute('data-slot', 'input-root');
  expect(separatorRef.value?.$el).toHaveAttribute('data-slot', 'separator-root');
});

test('preserves Vue refs, fallthrough attrs, and asChild hosts', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const panelRef = ref<ComponentPublicInstance>();
  const resizeRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components,
    setup() {
      return { panelRef, resizeRef, rootRef };
    },
    template: `
      <Sidebar ref="rootRef" data-probe="root">
        <SidebarPanel ref="panelRef" as-child>
          <section data-testid="panel-host">Navigation</section>
        </SidebarPanel>
        <SidebarResizeTrigger ref="resizeRef" as-child>
          <button type="button">Resize sidebar</button>
        </SidebarResizeTrigger>
        <SidebarInset />
      </Sidebar>
    `,
  });

  render(Harness);

  const root = rootRef.value?.$el as HTMLElement;
  const panel = screen.getByTestId('panel-host');
  const resize = screen.getByRole('separator', { name: 'Resize sidebar' });

  expect(root).toHaveAttribute('data-slot', 'sidebar-root');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(panel).toHaveAttribute('data-slot', 'sidebar-panel');
  expect(resize.tagName).toBe('BUTTON');
  expect(resize).toHaveAttribute('data-slot', 'sidebar-resize-trigger');
  expect(panelRef.value?.$el).toBe(panel);
  expect(resizeRef.value?.$el).toBe(resize);
  expect(rootRef.value?.$el).toBe(root);
});

test('forwards input sizing, models, separator variants, and slots', async () => {
  const value = ref('search');
  const Harness = defineComponent({
    components,
    setup: () => ({ value }),
    template: `
      <Sidebar>
        <SidebarPanel>
          <SidebarInput v-model="value" size="sm" :html-size="24" aria-label="Search" />
          <SidebarSeparator orientation="vertical" size="lg" variant="dotted" as-child>
            <hr data-testid="sidebar-separator" />
          </SidebarSeparator>
        </SidebarPanel>
        <SidebarResizeTrigger />
        <SidebarInset />
      </Sidebar>
    `,
  });

  render(Harness);
  const input = screen.getByRole('textbox', { name: 'Search' });
  expect(input).toHaveAttribute('data-size', 'sm');
  expect(input).toHaveAttribute('size', '24');
  await fireEvent.update(input, 'updated');
  expect(value.value).toBe('updated');
  const separator = screen.getByTestId('sidebar-separator');
  expect(separator.tagName).toBe('HR');
  expect(separator).toHaveAttribute('data-orientation', 'vertical');
  expect(separator).toHaveAttribute('data-size', 'lg');
  expect(separator).toHaveAttribute('data-variant', 'dotted');
});

test('updates consumer attrs on every public composition path', async () => {
  const current = ref('step');
  const label = ref('Initial label');
  const probe = ref('initial');
  const Harness = defineComponent({
    components,
    setup: () => ({ current, label, probe }),
    template: `
      <Sidebar :data-probe="probe" data-testid="root">
        <SidebarPanel>
          <SidebarNavigationButton :aria-current="current">Navigation</SidebarNavigationButton>
          <SidebarNavigationSubButton :aria-current="current" href="#nested">Nested</SidebarNavigationSubButton>
        </SidebarPanel>
        <SidebarResizeTrigger :aria-label="label" />
        <SidebarTrigger :aria-label="label" />
        <SidebarInset />
      </Sidebar>
    `,
  });
  render(Harness);
  current.value = 'location';
  label.value = 'Updated label';
  probe.value = 'updated';
  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Navigation' })).toHaveAttribute(
      'aria-current',
      'location',
    );
    expect(screen.getByRole('link', { name: 'Nested' })).toHaveAttribute(
      'aria-current',
      'location',
    );
    expect(screen.getByRole('separator', { name: 'Updated label' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Updated label' })).toBeInTheDocument();
    expect(screen.getByTestId('root')).toHaveAttribute('data-probe', 'updated');
  });
});

test('controls CSS-length sizes, emits resize details once, and enables collapsed tooltips', async () => {
  const rect = rs
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue(new DOMRect(0, 0, 800, 400));
  const previousFontSize = document.documentElement.style.fontSize;
  document.documentElement.style.fontSize = '16px';
  const size = ref<(number | string)[]>(['16rem']);
  const resized: number[][] = [];
  const collapsed: string[] = [];
  const Harness = defineComponent({
    components,
    setup: () => ({ size, resized, collapsed }),
    template: `
      <Sidebar v-model:size="size" @resize="resized.push($event.size)" @collapse="collapsed.push($event.panelId)">
        <SidebarPanel data-testid="panel">
          <SidebarExpandedContent data-testid="expanded">Expanded</SidebarExpandedContent>
          <SidebarCollapsedContent data-testid="collapsed">Collapsed</SidebarCollapsedContent>
          <SidebarTooltip content="Overview">
            <SidebarNavigationButton aria-label="Overview">Overview</SidebarNavigationButton>
          </SidebarTooltip>
        </SidebarPanel>
        <SidebarResizeTrigger />
        <SidebarTrigger />
        <SidebarInset />
      </Sidebar>
    `,
  });
  try {
    const { container } = render(Harness);
    expect(container.querySelector('[data-slot="tooltip-content"]')).toBeNull();
    const toggle = screen.getByRole('button', { name: 'Toggle sidebar' });
    await waitFor(() =>
      expect(screen.getByRole('separator', { name: 'Resize sidebar' })).toHaveAttribute(
        'aria-valuenow',
        '32',
      ),
    );
    await fireEvent.click(toggle);
    await waitFor(() => expect(toggle).toHaveAttribute('aria-expanded', 'false'));
    expect(screen.getByTestId('panel')).toHaveAttribute('data-state', 'collapsed');
    expect(screen.getByTestId('expanded')).toHaveAttribute('hidden');
    expect(screen.getByTestId('collapsed')).not.toHaveAttribute('hidden');
    expect(size.value).toEqual([6, 94]);
    expect(resized).toEqual([[6, 94]]);

    await fireEvent.pointerOver(screen.getByRole('button', { name: 'Overview' }), {
      pointerType: 'mouse',
    });
    await waitFor(() => expect(screen.getByRole('tooltip')).toHaveTextContent('Overview'));
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-slot', 'tooltip-content');
    expect(screen.getByRole('tooltip').closest('[data-part="positioner"]')).toHaveAttribute(
      'data-slot',
      'tooltip-positioner',
    );
    await fireEvent.pointerLeave(screen.getByRole('button', { name: 'Overview' }), {
      pointerType: 'mouse',
    });
    await fireEvent.click(toggle);
    await waitFor(() => expect(toggle).toHaveAttribute('aria-expanded', 'true'));
    await fireEvent.click(toggle);
    await waitFor(() => expect(collapsed).toEqual(['sidebar']));
    await fireEvent.click(toggle);
    await waitFor(() => expect(toggle).toHaveAttribute('aria-expanded', 'true'));
  } finally {
    rect.mockRestore();
    document.documentElement.style.fontSize = previousFontSize;
  }
});

// Ark Vue 5.39.2 / Zag Splitter 1.43.3 omit the first programmatic collapse notification.
// Keep the direct Ark reproduction until the upstream size-notification map is initialized correctly.
test.skip('emits collapse on the first controlled transition in direct Ark', async () => {
  const rect = rs
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue(new DOMRect(0, 0, 800, 400));
  const NativeToggle = defineComponent({
    setup() {
      const splitter = useSplitterContext();
      return {
        collapse: () => splitter.value.collapsePanel('sidebar'),
        sizes: computed(() => splitter.value.getSizes().join(',')),
      };
    },
    template:
      '<button type="button" @click="collapse">Native collapse</button><output>{{ sizes }}</output>',
  });
  const size = ref([32, 68]);
  const events: string[] = [];
  const Harness = defineComponent({
    components: { ArkSplitterRoot, ArkSplitterPanel, NativeToggle },
    setup: () => ({ size, events }),
    template: `
      <ArkSplitterRoot v-model:size="size" :panels="[{ id: 'sidebar', minSize: 6, collapsedSize: 6, collapsible: true }, { id: 'content' }]" @collapse="events.push($event.panelId)">
        <ArkSplitterPanel id="sidebar"><NativeToggle /></ArkSplitterPanel>
        <ArkSplitterPanel id="content" />
      </ArkSplitterRoot>
    `,
  });
  try {
    render(Harness);
    await waitFor(() => expect(screen.getByText('32,68')).toBeInTheDocument());
    await fireEvent.click(screen.getByRole('button', { name: 'Native collapse' }));
    await waitFor(() => expect(size.value).toEqual([6, 94]));
    expect(events).toEqual(['sidebar']);
  } finally {
    rect.mockRestore();
  }
});

test('renders and hydrates the public anatomy on the server', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const App = defineComponent({
    components,
    setup: () => ({ rootRef }),
    template: `
      <Sidebar ref="rootRef" as-child :style="['color: red', { height: '24rem' }]">
        <section aria-label="Application shell">
        <SidebarPanel>Navigation</SidebarPanel>
        <SidebarResizeTrigger />
        <SidebarTrigger />
        <SidebarInset>Content</SidebarInset>
        </section>
      </Sidebar>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="sidebar-root"');
  expect(html).toContain('data-slot="sidebar-panel"');
  expect(html).toContain('data-slot="sidebar-resize-trigger"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  try {
    app.mount(host);
    const root = host.querySelector('section');
    expect(rootRef.value?.$el).toBe(root);
    expect(root).toHaveAttribute('data-slot', 'sidebar-root');
    expect(root?.style.color).toBe('red');
    expect(root?.style.height).toBe('24rem');
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  } finally {
    app.unmount();
    host.remove();
  }
});

test('uses native Tailwind defaults and merges consumer utilities last', () => {
  const Harness = defineComponent({
    components,
    template: `
      <Sidebar class="h-64 bg-muted">
        <SidebarPanel class="p-6">
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <SidebarNavigationButton class="p-6">Overview</SidebarNavigationButton>
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarPanel>
        <SidebarResizeTrigger class="w-2 min-w-2" />
        <SidebarTrigger class="size-8" />
        <SidebarInset />
      </Sidebar>
    `,
  });

  const { container } = render(Harness);
  const root = container.querySelector('[data-slot="sidebar-root"]');
  const panel = container.querySelector('[data-slot="sidebar-panel"]');
  const navigationButton = screen.getByRole('button', { name: 'Overview' });
  const trigger = screen.getByRole('button', { name: 'Toggle sidebar' });

  expect(root).toHaveClass('h-64', 'bg-muted');
  expect(root).not.toHaveClass('h-dvh', 'bg-background');
  expect(panel).toHaveClass('p-6', 'bg-card');
  expect(panel).not.toHaveClass('p-0');
  expect(navigationButton).toHaveClass('p-6', 'min-h-control-md');
  expect(navigationButton).not.toHaveClass('px-2', 'py-1');
  expect(trigger).toHaveClass('size-8');
  expect(trigger).not.toHaveClass('size-7');
  expect(trigger.querySelector('svg')).toBeVisible();
});