import { createListCollection } from '@ark-ui/vue/collection';
import {
  SplitterRoot as ArkSplitterRoot,
  SplitterPanel as ArkSplitterPanel,
} from '@ark-ui/vue/splitter';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, defineComponent, mergeProps, ref } from 'vue';
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
import TestSidebar from './fixtures/TestSidebar.vue';

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

test('keeps the default panel, inset, and resize ids aligned', async () => {
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

  const panel = document.querySelector<HTMLElement>('[data-testid="panel"]')!;
  const inset = document.querySelector<HTMLElement>('[data-testid="inset"]')!;
  const resize = document.querySelector<HTMLElement>('[data-testid="resize"]')!;

  await expect.element(page.getByTestId('sidebar')).toHaveAttribute('data-side', 'left');
  expect(panel.id).toMatch(/:panel:navigation$/);
  await expect.element(page.getByTestId('constraints')).toContainText('3rem:3rem');
  expect(inset.id).toMatch(/:panel:content$/);
  expect(resize.id).toMatch(/:splitter:navigation:content$/);
  expect(resize?.getAttribute('aria-controls')).toBe(panel.id + ' ' + inset.id);
  expect(resize?.getAttribute('aria-label')).toBe('Resize sidebar');
  await expect
    .element(page.getByRole('button', { name: 'Toggle sidebar' }))
    .toHaveAttribute('aria-expanded', 'true');
});

test('reverses the resize pair for a right sidebar', async () => {
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
  const resize = document.querySelector<HTMLElement>('[data-testid="resize"]')!;

  expect(resize.id).toMatch(/:splitter:content:inspector$/);
  expect(resize?.getAttribute('data-side')).toBe('right');
});

test('lets consumer click handlers cancel the default toggle', async () => {
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
  const trigger = page.getByRole('button', { name: 'Toggle sidebar' });

  await trigger.click();

  await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
});

test.each([false, true])(
  'composes trigger listeners and honors cancellation before toggling (cancel=%s)',
  async (cancel) => {
    const calls: string[] = [];
    const listeners = mergeProps(
      {
        onClick: (event: MouseEvent) => {
          calls.push('first');
          if (cancel) event.preventDefault();
        },
      },
      { onClick: () => calls.push('second') },
    );
    render({
      components,
      setup: () => ({ listeners }),
      template: `
      <Sidebar :default-size="[25, 75]" style="width: 800px; height: 400px">
        <SidebarPanel />
        <SidebarResizeTrigger />
        <SidebarTrigger v-bind="listeners" />
        <SidebarInset />
      </Sidebar>
    `,
    });

    const host = page.getByRole('button', { name: 'Toggle sidebar' });
    await expect
      .element(page.getByRole('separator', { name: 'Resize sidebar' }))
      .toHaveAttribute('aria-valuenow', '25');
    await host.click();
    expect(calls).toEqual(['first', 'second']);
    await expect.element(host).toHaveAttribute('aria-expanded', cancel ? 'true' : 'false');
  },
);

test('preserves active link composition for primary and nested navigation', async () => {
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

  const overview = page.getByRole('link', { name: 'Overview' });
  const details = page.getByRole('link', { name: 'Details' });

  await expect.element(overview).toHaveAttribute('aria-current', 'page');
  expect([
    ...document.querySelector('[data-slot="sidebar-navigation-button"][href="#overview"]')!
      .classList,
  ]).toEqual(
    expect.arrayContaining([
      'group-data-[state=expanded]/sidebar-panel:@min-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-10',
    ]),
  );
  expect([
    ...document.querySelector('[data-slot="sidebar-navigation-button"][href="#overview"]')!
      .classList,
  ]).not.toContain('@max-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-2');
  await expect.element(overview).toHaveAttribute('data-slot', 'sidebar-navigation-button');
  await expect.element(overview).toHaveAttribute('data-active');
  await expect.element(overview).toHaveAttribute('data-size', 'sm');
  await expect.element(details).toHaveAttribute('aria-current', 'page');
  await expect.element(details).toHaveAttribute('data-slot', 'sidebar-navigation-sub-button');
  await expect.element(details).toHaveAttribute('data-active');
  await expect
    .element(page.getByTestId('primary-badge'))
    .toHaveAttribute('data-slot', 'sidebar-navigation-badge');
  await expect.element(page.getByTestId('nested-badge')).toContainText('3');
  await expect
    .element(page.getByText('A very long nested navigation item'))
    .toHaveAttribute('data-slot', 'sidebar-navigation-sub-label');
});

test('preserves direct Select indicator composition in a navigation button', async () => {
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
  const indicator = document.querySelector<HTMLElement>('[data-testid="select-indicator"]')!;

  expect(indicator).toBe(container.querySelector('[data-scope="select"][data-part="indicator"]'));
});

test('marks collapsed navigation content as hidden by default', async () => {
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

  await expect
    .element(page.getByTestId('expanded-projects'))
    .toHaveAttribute('data-slot', 'sidebar-expanded-content');
  await expect.element(page.getByTestId('expanded-projects')).not.toHaveAttribute('hidden');
  await expect
    .element(page.getByTestId('collapsed-projects'))
    .toHaveAttribute('data-slot', 'sidebar-collapsed-content');
  await expect.element(page.getByTestId('collapsed-projects')).toHaveAttribute('hidden');
});

test('composes the explicit group, input, separator, and footer anatomy', async () => {
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

  await expect
    .element(page.getByRole('list'))
    .toHaveAttribute('data-slot', 'sidebar-navigation-list');
  await expect
    .element(page.getByRole('button', { name: 'Overview' }))
    .toHaveAttribute('data-slot', 'sidebar-navigation-button');
  expect(inputRef.value?.$el?.getAttribute('data-slot')).toBe('input-root');
  expect(separatorRef.value?.$el?.getAttribute('data-slot')).toBe('separator-root');
});

test('preserves Vue refs, fallthrough attrs, and asChild hosts', async () => {
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
  const panel = document.querySelector<HTMLElement>('[data-testid="panel-host"]')!;
  const resize = document.querySelector<HTMLElement>('[data-slot="sidebar-resize-trigger"]')!;

  expect(root?.getAttribute('data-slot')).toBe('sidebar-root');
  expect(root?.getAttribute('data-probe')).toBe('root');
  expect(panel?.getAttribute('data-slot')).toBe('sidebar-panel');
  expect(resize.tagName).toBe('BUTTON');
  expect(resize?.getAttribute('data-slot')).toBe('sidebar-resize-trigger');
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
  const input = page.getByRole('textbox', { name: 'Search' });
  await expect.element(input).toHaveAttribute('data-size', 'sm');
  await expect.element(input).toHaveAttribute('size', '24');
  await input.fill('updated');
  expect(value.value).toBe('updated');
  const separator = document.querySelector<HTMLElement>('[data-testid="sidebar-separator"]')!;
  expect(separator.tagName).toBe('HR');
  expect(separator?.getAttribute('data-orientation')).toBe('vertical');
  expect(separator?.getAttribute('data-size')).toBe('lg');
  expect(separator?.getAttribute('data-variant')).toBe('dotted');
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

  await expect
    .element(page.getByRole('button', { name: 'Navigation' }))
    .toHaveAttribute('aria-current', 'location');
  await expect
    .element(page.getByRole('link', { name: 'Nested' }))
    .toHaveAttribute('aria-current', 'location');
  await expect.element(page.getByRole('separator', { name: 'Updated label' })).toBeAttached();
  await expect.element(page.getByRole('button', { name: 'Updated label' })).toBeAttached();
  await expect.element(page.getByTestId('root')).toHaveAttribute('data-probe', 'updated');
});

test('controls CSS-length sizes, emits resize details once, and enables collapsed tooltips', async () => {
  const size = ref<(number | string)[]>(['16rem']);
  const resized: number[][] = [];
  const collapsed: string[] = [];
  const Harness = defineComponent({
    components,
    setup: () => ({ size, resized, collapsed }),
    template: `
      <Sidebar style="width: 800px; height: 400px" v-model:size="size" @resize="resized.push($event.size)" @collapse="collapsed.push($event.panelId)">
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

  const { container } = render(Harness);
  expect(container.querySelector('[data-slot="tooltip-content"]')).toBeNull();
  const toggle = page.getByRole('button', { name: 'Toggle sidebar' });
  await expect
    .element(page.getByRole('separator', { name: 'Resize sidebar' }))
    .toHaveAttribute('aria-valuenow', '32');
  await toggle.click();
  await expect.element(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect.element(page.getByTestId('panel')).toHaveAttribute('data-state', 'collapsed');
  await expect.element(page.getByTestId('expanded')).toHaveAttribute('hidden');
  await expect.element(page.getByTestId('collapsed')).not.toHaveAttribute('hidden');
  expect(size.value).toEqual([6, 94]);
  expect(resized).toEqual([[6, 94]]);

  await page.getByRole('button', { name: 'Overview' }).hover();
  await expect.element(page.getByRole('tooltip')).toContainText('Overview');
  await expect.element(page.getByRole('tooltip')).toHaveAttribute('data-slot', 'tooltip-content');
  await expect
    .element(
      page.locator('[data-slot="tooltip-positioner"]').filter({ has: page.getByRole('tooltip') }),
    )
    .toHaveAttribute('data-slot', 'tooltip-positioner');
  await page.getByRole('button', { name: 'Toggle sidebar' }).hover();
  await toggle.click();
  await expect.element(toggle).toHaveAttribute('aria-expanded', 'true');
  await toggle.click();
  expect(collapsed).toEqual(['sidebar']);
  await toggle.click();
  await expect.element(toggle).toHaveAttribute('aria-expanded', 'true');
});

// Zag Splitter omits the first programmatic collapse notification (chakra-ui/zag#3371).
// Keep the direct Ark reproduction until the upstream size-notification map is initialized correctly.
test.skip('emits collapse on the first controlled transition in direct Ark', async () => {
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
      <ArkSplitterRoot style="width: 800px; height: 400px" v-model:size="size" :panels="[{ id: 'sidebar', minSize: 6, collapsedSize: 6, collapsible: true }, { id: 'content' }]" @collapse="events.push($event.panelId)">
        <ArkSplitterPanel id="sidebar"><NativeToggle /></ArkSplitterPanel>
        <ArkSplitterPanel id="content" />
      </ArkSplitterRoot>
    `,
  });

  render(Harness);
  await expect.element(page.getByText('32,68')).toBeAttached();
  await page.getByRole('button', { name: 'Native collapse' }).click();
  expect(size.value).toEqual([6, 94]);
  expect(events).toEqual(['sidebar']);
});

test('hydrates without id drift and preserves refs, styles, and toggling', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestSidebar));
  document.body.append(host);
  const serverRoot = host.querySelector('section');
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(TestSidebar);
  try {
    const instance = app.mount(host) as InstanceType<typeof TestSidebar>;
    expect(instance.rootRef?.$el).toBe(serverRoot);
    expect(host.querySelector('section')).toBe(serverRoot);
    expect(serverRoot?.getAttribute('data-slot')).toBe('sidebar-root');
    expect(serverRoot?.style.color).toBe('red');
    expect(serverRoot?.style.height).toBe('24rem');
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await page.getByRole('button', { name: 'Toggle sidebar' }).click();
    await expect
      .element(page.getByRole('button', { name: 'Toggle sidebar' }))
      .toHaveAttribute('aria-expanded', 'false');
  } finally {
    app.unmount();
    host.remove();
  }
});
test('uses native Tailwind defaults and merges consumer utilities last', async () => {
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
  expect([...document.querySelector('[data-slot="sidebar-navigation-button"]')!.classList]).toEqual(
    expect.arrayContaining([
      'group-data-[state=expanded]/sidebar-panel:@min-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-10',
    ]),
  );
  expect([
    ...document.querySelector('[data-slot="sidebar-navigation-button"]')!.classList,
  ]).not.toContain('has-[+_[data-slot=sidebar-navigation-badge]]:pe-10');
  const trigger = page.getByRole('button', { name: 'Toggle sidebar' });

  expect([...root!.classList]).toEqual(expect.arrayContaining(['h-64', 'bg-muted']));
  expect([...root!.classList]).not.toContain('h-dvh');
  expect([...root!.classList]).not.toContain('bg-background');
  expect([...panel!.classList]).toEqual(expect.arrayContaining(['p-6', 'bg-card']));
  expect([...panel!.classList]).not.toContain('p-0');
  expect([...document.querySelector('[data-slot="sidebar-navigation-button"]')!.classList]).toEqual(
    expect.arrayContaining(['p-6', 'min-h-control-md']),
  );
  expect([
    ...document.querySelector('[data-slot="sidebar-navigation-button"]')!.classList,
  ]).not.toContain('px-2');
  expect([
    ...document.querySelector('[data-slot="sidebar-navigation-button"]')!.classList,
  ]).not.toContain('py-1');
  expect([...document.querySelector('[data-slot="sidebar-trigger"]')!.classList]).toEqual(
    expect.arrayContaining(['size-8']),
  );
  expect([...document.querySelector('[data-slot="sidebar-trigger"]')!.classList]).not.toContain(
    'size-7',
  );
  await expect.element(trigger.locator('svg')).toBeVisible();
  await expect.element(trigger).toHaveCSS('width', '32px');
  await expect.element(page.locator('[data-slot="sidebar-panel"]')).toHaveCSS('padding', '24px');
});